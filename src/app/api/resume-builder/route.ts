import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json(
    { ok: false, error: message, ...(extra ? { debug: extra } : {}) },
    { status }
  );
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

function cleanText(s: string) {
  return (s || "")
    .replace(/\u0000/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

function ensureStringArray(v: any) {
  return isStringArray(v) ? v : [];
}

function ensureExperience(v: any) {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x) => x && typeof x === "object")
    .map((job) => ({
      company: typeof job.company === "string" ? job.company : "",
      role: typeof job.role === "string" ? job.role : "",
      location: typeof job.location === "string" ? job.location : undefined,
      dates: typeof job.dates === "string" ? job.dates : "",
      bullets: ensureStringArray(job.bullets),
    }))
    .filter((j) => j.company || j.role || j.dates || j.bullets.length > 0);
}

function ensureEducation(v: any) {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x) => x && typeof x === "object")
    .map((e) => ({
      degree: typeof e.degree === "string" ? e.degree : "",
      institution: typeof e.institution === "string" ? e.institution : "",
      year: typeof e.year === "string" ? e.year : undefined,
    }))
    .filter((e) => e.degree || e.institution);
}

function ensureProjects(v: any) {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x) => x && typeof x === "object")
    .map((p) => ({
      title: typeof p.title === "string" ? p.title : "",
      bullets: ensureStringArray(p.bullets),
    }))
    .filter((p) => p.title || p.bullets.length > 0);
}

/**
 * Strict-ish validation + normalization:
 * - Never fail for missing headline: we auto-fill.
 * - Ensure arrays exist.
 */
function normalizeResumeJSON(obj: any, input: BuilderInput): ResumeJSON {
  const safeHeadline =
    (typeof obj?.headline === "string" && obj.headline.trim())
      ? obj.headline.trim()
      : `${input.targetRole} — CareerMindAI Resume`;

  return {
    headline: safeHeadline,

    professionalSummary: ensureStringArray(obj?.professionalSummary),
    coreSkills: ensureStringArray(obj?.coreSkills),
    toolsAndTech: ensureStringArray(obj?.toolsAndTech),

    experience: ensureExperience(obj?.experience),
    education: ensureEducation(obj?.education),

    certifications: ensureStringArray(obj?.certifications),
    projects: ensureProjects(obj?.projects),
    achievements: ensureStringArray(obj?.achievements),
    keywordPack: ensureStringArray(obj?.keywordPack),
  };
}

async function generateResumeJSON(payload: {
  resumeText: string;
  auditResult: any;
  input: BuilderInput;
}) {
  const { resumeText, auditResult, input } = payload;

  const system = `
You are a world-class ATS resume writer.
Return ONLY valid JSON (no markdown, no commentary).

Hard rules:
- Do NOT invent employers, titles, education, tools, certifications, or metrics.
- If something is unknown, omit it or keep it generic without making facts up.
- Always include "headline" as a short one-line title.
`;

  const user = `
RESUME TEXT:
${clampLen(cleanText(resumeText), 16000)}

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
${clampLen(cleanText(input.jobDescription || ""), 8000) || "N/A"}

Return JSON with this shape:
{
  "headline": "string",
  "professionalSummary": ["..."],
  "coreSkills": ["..."],
  "toolsAndTech": ["..."],
  "experience": [{"company":"...","role":"...","location":"...","dates":"...","bullets":["..."]}],
  "education": [{"degree":"...","institution":"...","year":"..."}],
  "certifications": ["..."],
  "projects": [{"title":"...","bullets":["..."]}],
  "achievements": ["..."],
  "keywordPack": ["..."]
}
`.trim();

  const completion = await openai.chat.completions.create({
    model: DEFAULT_MODEL,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty AI response");

  const parsed = JSON.parse(raw);
  const normalized = normalizeResumeJSON(parsed, input);

  // Minimal sanity checks (avoid empty result)
  if (!normalized.experience.length && !normalized.coreSkills.length && !normalized.professionalSummary.length) {
    throw new Error("Resume output is too empty. Please retry.");
  }

  return normalized;
}

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);
    const body = (await req.json()) as Partial<BuilderInput>;

    const auditId = String(body.auditId || "").trim();
    const targetRole = String(body.targetRole || "").trim();

    const companyName = String(body.companyName || "").trim() || undefined;
    const jobDescription = String(body.jobDescription || "").trim() || undefined;

    const region = String(body.region || "india");
    const tone = String(body.tone || "premium");

    if (!auditId || !targetRole) return jsonError("auditId and targetRole are required.", 400);

    const db = getFirestore();

    const auditSnap = await db.collection("audits").doc(auditId).get();
    if (!auditSnap.exists) return jsonError("Audit not found.", 404);

    const audit = auditSnap.data() as any;

    // Authorization (guest flow)
    if (audit?.ownerType === "guest") {
      if (!guestSessionId || audit?.ownerId !== guestSessionId) {
        return jsonError("Unauthorized audit access.", 403);
      }
    }

    const resumeText = audit?.resumeText;
    if (!resumeText || String(resumeText).length < 200) {
      return jsonError("Resume text missing from audit.", 422);
    }

    const builderId = crypto.randomUUID();

    const input: BuilderInput = {
      auditId,
      targetRole,
      companyName,
      jobDescription,
      region,
      tone,
    };

    const result = await generateResumeJSON({
      resumeText: String(resumeText),
      auditResult: audit?.auditResult,
      input,
    });

    await db.collection("builders").doc(builderId).set({
      builderId,
      auditId,
      ownerType: audit?.ownerType || "guest",
      ownerId: audit?.ownerId || guestSessionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      selectedTemplate: "atsClassic",
      inputs: {
        targetRole,
        ...(companyName ? { companyName } : {}),
        ...(jobDescription ? { jobDescription } : {}),
        region,
        tone,
      },
      result,
    });

    return NextResponse.json(
      { ok: true, auditId, builderId, selectedTemplate: "atsClassic", result },
      { status: 200 }
    );
  } catch (e: any) {
    return jsonError(e?.message || "Resume build failed.", 500);
  }
}
