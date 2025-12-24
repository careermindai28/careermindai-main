import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import { getFirestore, getStorageBucket } from "@/lib/firebaseAdmin";
import crypto from "crypto";

export const runtime = "nodejs";

type Fields = {
  jobDescription?: string;
  targetRole?: string;
  companyName?: string;
  region?: string;
  experienceLevel?: string;
};

interface OpenAIResumeAuditResponse {
  overallScore: number;
  subscores: {
    atsScore: number;
    contentScore: number;
    formattingScore: number;
    impactScore: number;
  };
  summary: string;
  strengths: string[];
  improvements: string[];
  sectionFeedback: { section: string; comments: string[] }[];
  recommendedKeywords: string[];
  riskFlags: string[];
  regionNotes: string;
  roleFitNotes: string;
}

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json(
    { error: message, ...(extra ? { debug: extra } : {}) },
    { status }
  );
}

function sanitizeText(input: string) {
  return (input || "")
    .replace(/\u0000/g, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function looksBinary(text: string) {
  if (!text) return true;
  if (text.startsWith("PK") || text.includes("PK\u0003\u0004")) return true;
  const nonPrintable =
    (text.match(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g) || []).length;
  return nonPrintable > 10;
}

function assertReadable(text: string) {
  const cleaned = sanitizeText(text);
  if (looksBinary(cleaned)) {
    throw new Error(
      "We couldn't read the resume text (garbled/binary). Upload a text-based PDF or DOCX (not scanned)."
    );
  }
  if (cleaned.replace(/\s/g, "").length < 300) {
    throw new Error(
      "We couldn't extract enough readable text. Upload a text-based PDF or DOCX (not scanned)."
    );
  }
  return cleaned;
}

async function extractFromDocx(buffer: Buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result?.value ?? "";
}

async function extractFromPdf(buffer: Buffer) {
  // Force CommonJS build — stable on Vercel
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pdfParse = require("pdf-parse/lib/pdf-parse");
  const data = await pdfParse(buffer);
  return data?.text ?? "";
}


function clamp(n: any) {
  const x = Number(n);
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(100, Math.round(x)));
}

function toUI(parsed: OpenAIResumeAuditResponse) {
  const strengths = Array.isArray(parsed?.strengths) ? parsed.strengths : [];
  const improvements = Array.isArray(parsed?.improvements)
    ? parsed.improvements
    : [];
  const sectionFeedback = Array.isArray(parsed?.sectionFeedback)
    ? parsed.sectionFeedback
    : [];

  return {
    resumeMindScore: clamp(parsed?.overallScore),
    atsCompatibility: clamp(parsed?.subscores?.atsScore),
    summary: String(parsed?.summary ?? ""),
    strengths: strengths.slice(0, 5).map((d, i) => ({
      title: `Strength ${i + 1}`,
      description: String(d),
    })),
    improvements: improvements.slice(0, 5).map((d, i) => ({
      title: `Improvement ${i + 1}`,
      description: String(d),
      priority: (i < 2 ? "high" : i < 4 ? "medium" : "low") as
        | "high"
        | "medium"
        | "low",
    })),
    atsRecommendations: sectionFeedback.slice(0, 5).map((s, i) => ({
      title: String(s?.section ?? `Section ${i + 1}`),
      description: Array.isArray(s?.comments) ? s.comments.join(" ") : "",
      impact: (i < 2 ? "high" : i < 4 ? "medium" : "low") as
        | "high"
        | "medium"
        | "low",
    })),
    recommendedKeywords: Array.isArray(parsed?.recommendedKeywords)
      ? parsed.recommendedKeywords
      : [],
    riskFlags: Array.isArray(parsed?.riskFlags) ? parsed.riskFlags : [],
    regionNotes: String(parsed?.regionNotes ?? ""),
    roleFitNotes: String(parsed?.roleFitNotes ?? ""),
  };
}

function getOrCreateGuestSessionId(req: NextRequest) {
  const existing = req.cookies.get("guestSessionId")?.value;
  if (existing && existing.length > 10) return existing;
  return crypto.randomUUID();
}

/**
 * Firestore cannot store undefined values.
 * Also helpful to normalize empty strings to undefined (optional fields).
 */
function stripUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const entries = Object.entries(obj).filter(([, v]) => v !== undefined);
  return Object.fromEntries(entries) as Partial<T>;
}

function emptyToUndefined(v: FormDataEntryValue | null): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export async function POST(req: NextRequest) {
  const guestSessionId = getOrCreateGuestSessionId(req);

  try {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("multipart/form-data")) {
      return jsonError("Expected multipart/form-data (file upload).", 415, {
        receivedContentType: ct,
      });
    }

    const form = await req.formData();
    const file = form.get("resumeFile") as File | null;
    if (!file) return jsonError("resumeFile is missing in FormData.", 400);

    const fields: Fields = {
      jobDescription: emptyToUndefined(form.get("jobDescription")),
      targetRole: emptyToUndefined(form.get("targetRole")),
      companyName: emptyToUndefined(form.get("companyName")),
      region: emptyToUndefined(form.get("region")),
      experienceLevel: emptyToUndefined(form.get("experienceLevel")),
    };

    const buf = Buffer.from(await file.arrayBuffer());
    const name = (file.name || "").toLowerCase();
    const type = (file.type || "").toLowerCase();

    let extracted = "";
    if (type.includes("pdf") || name.endsWith(".pdf")) {
      extracted = await extractFromPdf(buf);
    } else if (
      type.includes("word") ||
      type.includes("officedocument") ||
      name.endsWith(".docx")
    ) {
      extracted = await extractFromDocx(buf);
    } else {
      return jsonError("Unsupported file type. Upload PDF or DOCX.", 400);
    }

    const resumeText = assertReadable(extracted);

    const systemPrompt = `You are an expert resume analyzer. Return ONLY valid JSON (single object).`;
    let userPrompt = `RESUME TEXT:\n${resumeText}`;

    if (fields.jobDescription) userPrompt += `\n\nJOB DESCRIPTION:\n${fields.jobDescription}`;
    if (fields.targetRole) userPrompt += `\n\nTARGET ROLE:\n${fields.targetRole}`;
    if (fields.companyName) userPrompt += `\n\nCOMPANY:\n${fields.companyName}`;
    if (fields.region) userPrompt += `\n\nREGION:\n${fields.region}`;
    if (fields.experienceLevel) userPrompt += `\n\nEXPERIENCE LEVEL:\n${fields.experienceLevel}`;

    userPrompt += `
Return ONLY JSON:
{
 "overallScore": 0-100,
 "subscores": {"atsScore":0-100,"contentScore":0-100,"formattingScore":0-100,"impactScore":0-100},
 "summary":"...",
 "strengths":["..."],
 "improvements":["..."],
 "sectionFeedback":[{"section":"...","comments":["..."]}],
 "recommendedKeywords":["..."],
 "riskFlags":["..."],
 "regionNotes":"...",
 "roleFitNotes":"..."
}`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) return jsonError("No response from AI. Please try again.", 500);

    let parsed: OpenAIResumeAuditResponse;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return jsonError("AI returned invalid JSON. Please try again.", 500);
    }

    parsed.overallScore = clamp(parsed.overallScore);
    parsed.subscores = parsed.subscores || {
      atsScore: 0,
      contentScore: 0,
      formattingScore: 0,
      impactScore: 0,
    };
    parsed.subscores.atsScore = clamp(parsed.subscores.atsScore);
    parsed.subscores.contentScore = clamp(parsed.subscores.contentScore);
    parsed.subscores.formattingScore = clamp(parsed.subscores.formattingScore);
    parsed.subscores.impactScore = clamp(parsed.subscores.impactScore);

    const ui = toUI(parsed);

    // ✅ Save to Firestore (+ optional Storage)
    const db = getFirestore();
    const auditId = crypto.randomUUID();

    let storagePath: string | null = null;
    try {
      const bucket = getStorageBucket();
      storagePath = `audits/${guestSessionId}/${auditId}/${file.name}`;
      await bucket.file(storagePath).save(buf, {
        contentType: file.type || "application/octet-stream",
        resumable: false,
        metadata: { cacheControl: "private, max-age=0, no-transform" },
      });
    } catch {
      storagePath = null; // storage is optional; audit still completes
    }

    const safeInputs = stripUndefined(fields);

    await db.collection("audits").doc(auditId).set({
      auditId,
      ownerType: "guest",
      ownerId: guestSessionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      fileMeta: {
        name: file.name,
        type: file.type,
        size: file.size,
        storagePath,
      },
      inputs: safeInputs, // ✅ never contains undefined
      resumeText,
      auditResult: ui,
    });

    const res = NextResponse.json({ auditId, ...ui }, { status: 200 });

    res.cookies.set("guestSessionId", guestSessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (e: any) {
    const msg =
      typeof e?.message === "string" ? e.message : "Resume audit failed.";
    return jsonError(msg, 500);
  }
}
