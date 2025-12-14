import { NextRequest, NextResponse } from "next/server";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

type ResumeAuditRequest = {
  jobDescription?: string;
  targetRole?: string;
  companyName?: string;
  region?: string;
  experienceLevel?: string;
};

interface SectionFeedback {
  section: string;
  comments: string[];
}

interface Subscores {
  atsScore: number;
  contentScore: number;
  formattingScore: number;
  impactScore: number;
}

interface OpenAIResumeAuditResponse {
  overallScore: number;
  subscores: Subscores;
  summary: string;
  strengths: string[];
  improvements: string[];
  sectionFeedback: SectionFeedback[];
  recommendedKeywords: string[];
  riskFlags: string[];
  regionNotes: string;
  roleFitNotes: string;
}

function clampScore(score: any): number {
  const n = Number(score);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function sanitizeText(input: string): string {
  return (input || "")
    .replace(/\u0000/g, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function looksBinary(text: string): boolean {
  if (!text) return true;
  if (text.startsWith("PK") || text.includes("PK\u0003\u0004")) return true; // docx zip signature
  const nonPrintable =
    (text.match(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g) || []).length;
  return nonPrintable > 10;
}

function assertReadable(text: string): string {
  const cleaned = sanitizeText(text);

  if (looksBinary(cleaned)) {
    throw new Error(
      "We couldn't read the resume text (it looks garbled/binary). Please upload a text-based PDF or DOCX (not scanned)."
    );
  }

  const nonSpace = cleaned.replace(/\s/g, "");
  if (nonSpace.length < 300) {
    throw new Error(
      "We couldn't extract enough readable text from the resume. Please upload a text-based PDF or DOCX (not scanned)."
    );
  }

  return cleaned;
}

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result?.value ?? "";
}

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data?.text ?? "";
}

function toUI(parsed: OpenAIResumeAuditResponse) {
  const strengthsArr = Array.isArray(parsed?.strengths) ? parsed.strengths : [];
  const improvementsArr = Array.isArray(parsed?.improvements) ? parsed.improvements : [];
  const sectionFeedbackArr = Array.isArray(parsed?.sectionFeedback)
    ? parsed.sectionFeedback
    : [];

  return {
    resumeMindScore: clampScore(parsed?.overallScore),
    atsCompatibility: clampScore(parsed?.subscores?.atsScore),
    summary: String(parsed?.summary ?? ""),

    strengths: strengthsArr.slice(0, 5).map((d, i) => ({
      title: `Strength ${i + 1}`,
      description: String(d),
    })),

    improvements: improvementsArr.slice(0, 5).map((d, i) => ({
      title: `Improvement ${i + 1}`,
      description: String(d),
      priority: (i < 2 ? "high" : i < 4 ? "medium" : "low") as
        | "high"
        | "medium"
        | "low",
    })),

    atsRecommendations: sectionFeedbackArr.slice(0, 5).map((s, i) => ({
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

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";

    // Your UI now sends multipart/form-data — enforce it for reliability.
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          error:
            "Resume audit expects a file upload (multipart/form-data). Please re-upload your resume and try again.",
        },
        { status: 415 }
      );
    }

    const form = await req.formData();
    const file = form.get("resumeFile") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Resume file missing. Please upload a PDF or DOCX." },
        { status: 400 }
      );
    }

    const body: ResumeAuditRequest = {
      jobDescription: (form.get("jobDescription") as string) || undefined,
      targetRole: (form.get("targetRole") as string) || undefined,
      companyName: (form.get("companyName") as string) || undefined,
      region: (form.get("region") as string) || undefined,
      experienceLevel: (form.get("experienceLevel") as string) || undefined,
    };

    const buf = Buffer.from(await file.arrayBuffer());
    const name = (file.name || "").toLowerCase();
    const type = (file.type || "").toLowerCase();

    let extracted = "";

    if (type.includes("pdf") || name.endsWith(".pdf")) {
      extracted = await extractTextFromPdf(buf);
    } else if (
      type.includes("word") ||
      type.includes("officedocument") ||
      name.endsWith(".docx")
    ) {
      extracted = await extractTextFromDocx(buf);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX." },
        { status: 400 }
      );
    }

    const resumeText = assertReadable(extracted);

    const systemPrompt = `You are an expert resume analyzer specializing in the ResumeMind Score™ methodology.

CRITICAL:
- Return ONLY valid JSON (single object)
- No markdown, no commentary, no extra text.`;

    let userPrompt = `Analyze this resume and provide a comprehensive audit:\n\nRESUME TEXT:\n${resumeText}`;

    if (body.jobDescription) userPrompt += `\n\nJOB DESCRIPTION:\n${body.jobDescription}`;
    if (body.targetRole) userPrompt += `\n\nTARGET ROLE: ${body.targetRole}`;
    if (body.companyName) userPrompt += `\n\nCOMPANY: ${body.companyName}`;
    if (body.region) userPrompt += `\n\nREGION: ${body.region}`;
    if (body.experienceLevel)
      userPrompt += `\n\nEXPERIENCE LEVEL: ${body.experienceLevel}`;

    userPrompt += `
Return ONLY JSON in this schema:
{
  "overallScore": <number 0-100>,
  "subscores": {
    "atsScore": <number 0-100>,
    "contentScore": <number 0-100>,
    "formattingScore": <number 0-100>,
    "impactScore": <number 0-100>
  },
  "summary": "<string>",
  "strengths": ["..."],
  "improvements": ["..."],
  "sectionFeedback": [{"section":"...","comments":["..."]}],
  "recommendedKeywords": ["..."],
  "riskFlags": ["..."],
  "regionNotes": "<string>",
  "roleFitNotes": "<string>"
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

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      );
    }

    let parsed: OpenAIResumeAuditResponse;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "AI returned an invalid response. Please try again." },
        { status: 500 }
      );
    }

    // clamp scores to 0–100 to keep UI stable
    parsed.overallScore = clampScore(parsed.overallScore);
    parsed.subscores = parsed.subscores || {
      atsScore: 0,
      contentScore: 0,
      formattingScore: 0,
      impactScore: 0,
    };
    parsed.subscores.atsScore = clampScore(parsed.subscores.atsScore);
    parsed.subscores.contentScore = clampScore(parsed.subscores.contentScore);
    parsed.subscores.formattingScore = clampScore(parsed.subscores.formattingScore);
    parsed.subscores.impactScore = clampScore(parsed.subscores.impactScore);

    return NextResponse.json(toUI(parsed), { status: 200 });
  } catch (err: any) {
    const msg =
      typeof err?.message === "string"
        ? err.message
        : "Resume audit failed. Please try again.";

    // extraction/validation errors should be user-fixable (400)
    if (
      msg.includes("couldn't extract") ||
      msg.includes("garbled/binary") ||
      msg.includes("Unsupported file type")
    ) {
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // OpenAI SDK may include status codes
    const status = err?.status ?? 500;

    if (status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your configuration." },
        { status: 500 }
      );
    }

    if (status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
