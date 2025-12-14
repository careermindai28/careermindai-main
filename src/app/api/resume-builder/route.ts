import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebaseAdmin";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";

export const runtime = "nodejs";

function jsonError(message: string, status = 400, extra?: any) {
  return NextResponse.json(
    { error: message, ...(extra ? { debug: extra } : {}) },
    { status }
  );
}

function requireGuestSession(req: NextRequest) {
  const sid = req.cookies.get("guestSessionId")?.value;
  if (!sid) throw new Error("Session expired. Please run Resume Audit again.");
  return sid;
}

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = requireGuestSession(req);
    const body = await req.json();

    const auditId = String(body?.auditId || "");
    const targetRole = String(body?.targetRole || "");
    const jobDescription = String(body?.jobDescription || "");
    const tone = String(body?.tone || "premium");
    const region = String(body?.region || "india");

    if (!auditId) return jsonError("auditId is required.", 400);
    if (!targetRole.trim()) return jsonError("targetRole is required.", 400);

    const db = getFirestore();
    const snap = await db.collection("audits").doc(auditId).get();

    if (!snap.exists) return jsonError("Audit not found. Please run Resume Audit again.", 404);

    const data = snap.data() as any;

    // Ensure owner matches session (guest mode)
    if (data?.ownerType !== "guest" || data?.ownerId !== guestSessionId) {
      return jsonError("Unauthorized audit access.", 403);
    }

    const resumeText = String(data?.resumeText || "");
    const auditResult = data?.auditResult || {};

    if (!resumeText || resumeText.length < 300) {
      return jsonError("Stored resume text is missing. Please run Resume Audit again.", 400);
    }

    const systemPrompt = `You are an elite ATS resume writer.

RULES:
- Never invent skills, employers, dates, degrees, certifications.
- Use only info present in the resumeText.
- Output MUST be valid JSON (single object). No markdown.`;

    const userPrompt = `
You will rewrite the resume into a world-class ATS-optimized resume for the target role.

TARGET ROLE: ${targetRole}
REGION: ${region}
TONE: ${tone}

OPTIONAL JOB DESCRIPTION:
${jobDescription || "(none)"}

RESUME TEXT:
${resumeText}

AUDIT HIGHLIGHTS (use to fix):
${JSON.stringify(auditResult)}

Return ONLY JSON in this schema:
{
  "header": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "" },
  "headline": "",
  "summary": ["bullet", "bullet", "bullet"],
  "coreSkills": ["...", "..."],
  "experience": [
    {
      "company": "",
      "title": "",
      "location": "",
      "start": "",
      "end": "",
      "bullets": ["...", "..."]
    }
  ],
  "education": [{ "degree": "", "institution": "", "year": "" }],
  "certifications": ["...", "..."],
  "projects": [{ "name": "", "bullets": ["..."] }],
  "additional": ["..."],
  "atsKeywordsAdded": ["..."],
  "notes": ["Missing info: ...", "Gap vs JD: ..."]
}
`;

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

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return jsonError("AI returned invalid JSON. Please try again.", 500);
    }

    // Save builder output
    await db.collection("audits").doc(auditId).update({
      updatedAt: new Date(),
      builderLast: {
        targetRole,
        region,
        tone,
        hasJD: !!jobDescription,
        result: parsed,
      },
    });

    return NextResponse.json({ auditId, result: parsed }, { status: 200 });
  } catch (e: any) {
    return jsonError(typeof e?.message === "string" ? e.message : "Resume builder failed.", 500);
  }
}
