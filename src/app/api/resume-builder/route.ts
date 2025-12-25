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
  companyName?: string;
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

  if (typeof obj.headline !== "string" || !obj.headline.trim()) {
    return { ok: false, reason: "Missing headline" };
  }

  const arrKeys = [
    "professionalSummary",
    "coreSkills",
    "toolsAndTech",
    "certifications",
    "achievements",
    "keywordPack",
  ] as const;

  for (const k of arrKeys) {
    if (!isStringArray(obj[k])) return { ok: false, reason: `Invalid ${k}` };
  }

  if (!Array.isArray(obj.experience)) return { ok: false, reason: "Invalid experience" };
  if (!Array.isArray(obj.education)) return { ok: false, reason: "Invalid education" };
  if (!Array.isArray(obj.projects)) return { ok: false, reason: "Invalid projects" };

  return { ok: true, value: obj as ResumeJSON };
}

async function generateResumeJSON(payload: {
  resumeText: string;
  auditResult: any;
  input: BuilderInput;
}) {
  const { resumeText, auditResult, input } = payload;

  const system = `
You are a world-class ATS resume writer.
Return ONLY valid JSON (no markdown).

Rules:
- Do NOT invent employers, titles, education, tools, or certifications
- Do NOT invent metrics
- Tailor language to target role and JD if provided
`;

  const user = `
RESUME TEXT:
${resumeText}

AUDIT RESULT:
${auditResult ? JSON.stringify(auditResult).slice(0, 4000) : "N/A"}

TARGET ROLE:
${input.targetRole}

COMPANY:
${input.companyName || "N/A"}

REGION:
${input.region || "india"}

TONE:
${input.tone || "premium"}

JOB DESCRIPTION:
${clampLen(input.jobDescription || "", 8000) || "N/A"}

Return JSON exactly as specified earlier.
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
  if (!raw) throw new Error("Empty AI response");

  const parsed = JSON.parse(raw);
  const validated = validateResumeJSON(parsed);
  if (!validated.ok) throw new Error(validated.reason);

  return validated.value;
}

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);
    const body = (await req.json()) as BuilderInput;

    const auditId = body.auditId?.trim();
    const targetRole = body.targetRole?.trim();
    const companyName = body.companyName?.trim() || undefined;
    const jobDescription = body.jobDescription?.trim() || undefined;
    const region = body.region || "india";
    const tone = body.tone || "premium";

    if (!auditId || !targetRole) {
      return jsonError("auditId and targetRole are required.");
    }

    const db = getFirestore();
    const auditSnap = await db.collection("audits").doc(auditId).get();
    if (!auditSnap.exists) return jsonError("Audit not found.", 404);

    const audit = auditSnap.data() as any;

    if (audit.ownerType === "guest") {
      if (!guestSessionId || audit.ownerId !== guestSessionId) {
        return jsonError("Unauthorized audit access.", 403);
      }
    }

    const resumeText = audit.resumeText;
    if (!resumeText || resumeText.length < 200) {
      return jsonError("Resume text missing from audit.");
    }

    const builderId = crypto.randomUUID();

    const result = await generateResumeJSON({
      resumeText,
      auditResult: audit.auditResult,
      input: { auditId, targetRole, companyName, jobDescription, region, tone },
    });

    await db.collection("builders").doc(builderId).set({
      builderId,
      auditId,
      ownerType: audit.ownerType,
      ownerId: audit.ownerId || guestSessionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      inputs: {
        targetRole,
        companyName,
        jobDescription,
        region,
        tone,
      },
      result,
    });

    return NextResponse.json({ ok: true, auditId, builderId, result });
  } catch (e: any) {
    return jsonError(e.message || "Resume build failed.", 500);
  }
}
