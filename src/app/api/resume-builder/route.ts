import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json(
    { error: message, ...(extra ? { debug: extra } : {}) },
    { status }
  );
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

function clampLen(s: string, max = 12000) {
  const t = (s || "").trim();
  return t.length > max ? t.slice(0, max) : t;
}

type BuilderInput = {
  auditId: string;
  targetRole: string;
  jobDescription?: string;
  region?: string;
  tone?: string;
};

type ResumeJSON = {
  headline: string;
  professionalSummary: string[];
  coreSkills: string[];
  toolsAndTech: string[];
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{ degree: string; institution: string; year?: string }>;
  certifications: string[];
  projects: Array<{ title: string; bullets: string[] }>;
  achievements: string[];
  keywordPack: string[];
};

function isStringArray(v: any) {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function validateResumeJSON(obj: any): { ok: true; value: ResumeJSON } | { ok: false; reason: string } {
  if (!obj || typeof obj !== "object") return { ok: false, reason: "Not an object" };

  const requiredString = ["headline"] as const;
  for (const k of requiredString) {
    if (typeof obj[k] !== "string" || !obj[k].trim()) return { ok: false, reason: `Missing/invalid ${k}` };
  }

  const requiredArr = ["professionalSummary", "coreSkills", "toolsAndTech", "certifications", "achievements", "keywordPack"] as const;
  for (const k of requiredArr) {
    if (!isStringArray(obj[k])) return { ok: false, reason: `Missing/invalid ${k}` };
  }

  if (!Array.isArray(obj.experience)) return { ok: false, reason: "Missing/invalid experience" };
  for (const e of obj.experience) {
    if (!e || typeof e !== "object") return { ok: false, reason: "Invalid experience item" };
    if (typeof e.company !== "string" || typeof e.role !== "string" || typeof e.dates !== "string") {
      return { ok: false, reason: "Experience item missing company/role/dates" };
    }
    if (!isStringArray(e.bullets)) return { ok: false, reason: "Experience bullets invalid" };
  }

  if (!Array.isArray(obj.education)) return { ok: false, reason: "Missing/invalid education" };
  for (const ed of obj.education) {
    if (!ed || typeof ed !== "object") return { ok: false, reason: "Invalid education item" };
    if (typeof ed.degree !== "string" || typeof ed.institution !== "string") {
      return { ok: false, reason: "Education item missing degree/institution" };
    }
  }

  if (!Array.isArray(obj.projects)) return { ok: false, reason: "Missing/invalid projects" };
  for (const p of obj.projects) {
    if (!p || typeof p !== "object") return { ok: false, reason: "Invalid project item" };
    if (typeof p.title !== "string") return { ok: false, reason: "Project missing title" };
    if (!isStringArray(p.bullets)) return { ok: false, reason: "Project bullets invalid" };
  }

  return { ok: true, value: obj as ResumeJSON };
}

async function generateResumeJSON(payload: {
  resumeText: string;
  auditResult: any;
  input: BuilderInput;
}) {
  const { resumeText, auditResult, input } = payload;

  const system =
    `You are a world-class ATS resume writer. Return ONLY valid JSON (single object). No markdown.\n` +
    `Rules:\n` +
    `- Do NOT invent employers, job titles, education, certifications, or tools.\n` +
    `- Do NOT invent numbers/metrics. If not present in source, avoid numeric claims.\n` +
    `- It’s okay to say “improved efficiency” without quantifying.\n` +
    `- Bullets must be crisp, achievement-led, and aligned to the target role.\n`;

  const user = `
RESUME TEXT (source):
${resumeText}

AUDIT RESULT (for guidance):
${auditResult ? JSON.stringify(auditResult).slice(0, 4000) : "N/A"}

TARGET ROLE:
${input.targetRole}

REGION:
${input.region || "india"}

TONE:
${input.tone || "premium"}

JOB DESCRIPTION (optional):
${clampLen(input.jobDescription || "", 8000) || "N/A"}

Return EXACT JSON schema:
{
  "headline": "string",
  "professionalSummary": ["bullet", "..."],
  "coreSkills": ["...", "..."],
  "toolsAndTech": ["...", "..."],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "location": "string (optional)",
      "dates": "string",
      "bullets": ["...", "..."]
    }
  ],
  "education": [
    {"degree":"string","institution":"string","year":"string (optional)"}
  ],
  "certifications": ["...", "..."],
  "projects": [{"title":"string","bullets":["...","..."]}],
  "achievements": ["...", "..."],
  "keywordPack": ["top keywords used"]
}
`.trim();

  const completion = await openai.chat.completions.create({
    model: DEFAULT_MODEL,
    temperature: 0.25,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content;
  if (!raw) throw new Error("No response from AI. Try again.");

  let obj: any;
  try {
    obj = JSON.parse(raw);
  } catch {
    throw new Error("AI returned invalid JSON. Try again.");
  }

  const v = validateResumeJSON(obj);
  if (!v.ok) {
    // One repair attempt
    const repair = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You repair JSON to match required schema. Return ONLY JSON." },
        {
          role: "user",
          content:
            `Fix this JSON to match schema exactly. Do not add fake info.\n` +
            `Schema is same as earlier.\n\nJSON:\n${raw}\n\nReason it failed: ${v.reason}`,
        },
      ],
    });

    const repairedRaw = repair.choices?.[0]?.message?.content;
    if (!repairedRaw) throw new Error("AI returned empty repair JSON.");

    let repaired: any;
    try {
      repaired = JSON.parse(repairedRaw);
    } catch {
      throw new Error("AI repair returned invalid JSON.");
    }

    const v2 = validateResumeJSON(repaired);
    if (!v2.ok) throw new Error(`AI JSON invalid after repair: ${v2.reason}`);
    return v2.value;
  }

  return v.value;
}

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);

    const body = (await req.json().catch(() => null)) as BuilderInput | null;
    if (!body) return jsonError("Invalid JSON body.", 400);

    const auditId = String(body.auditId || "").trim();
    const targetRole = String(body.targetRole || "").trim();
    const jobDescription = String(body.jobDescription || "").trim();
    const region = String(body.region || "india").trim();
    const tone = String(body.tone || "premium").trim();

    if (!auditId) return jsonError("auditId is required.", 400);
    if (!targetRole) return jsonError("targetRole is required.", 400);

    const db = getFirestore();
    const auditRef = db.collection("audits").doc(auditId);
    const auditSnap = await auditRef.get();
    if (!auditSnap.exists) return jsonError("Audit not found.", 404);

    const audit = auditSnap.data() as any;

    // ✅ Ownership check (guest mode)
    if (audit?.ownerType === "guest") {
      if (!guestSessionId) return jsonError("Missing guest session.", 401);
      if (audit?.ownerId !== guestSessionId) return jsonError("Unauthorized auditId.", 403);
    }

    const resumeText = String(audit?.resumeText || "");
    if (!resumeText || resumeText.trim().length < 200) {
      return jsonError("Resume text missing from audit. Re-run Resume Audit.", 400);
    }

    const builderId = crypto.randomUUID();

    const result = await generateResumeJSON({
      resumeText,
      auditResult: audit?.auditResult || null,
      input: { auditId, targetRole, jobDescription, region, tone },
    });

    await db.collection("builders").doc(builderId).set({
      builderId,
      auditId,
      ownerType: audit.ownerType || "guest",
      ownerId: audit.ownerId || guestSessionId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      inputs: { targetRole, region, tone, jobDescription: jobDescription || null },
      result,
    });

    return NextResponse.json({ ok: true, auditId, builderId, result }, { status: 200 });
  } catch (e: any) {
    return jsonError(typeof e?.message === "string" ? e.message : "Resume build failed.", 500);
  }
}
