import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

/* ---------------- utils ---------------- */

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

/**
 * Resolve candidate name in priority order:
 * 1) Explicit name saved in builder inputs
 * 2) Parsed resume name (if available)
 * 3) Fallback
 */
function resolveCandidateName(builder: any): string {
  const fromInputs = builder?.inputs?.name;
  if (typeof fromInputs === "string" && fromInputs.trim()) {
    return fromInputs.trim();
  }

  const fromResume =
    builder?.result?.name ||
    builder?.result?.personalInfo?.name ||
    builder?.result?.header?.name;

  if (typeof fromResume === "string" && fromResume.trim()) {
    return fromResume.trim();
  }

  return "Candidate";
}

/**
 * Replace common name placeholders safely
 */
function injectCandidateName(text: string, name: string): string {
  if (!text) return text;

  return text
    .replace(/\[your name\]/gi, name)
    .replace(/\{\{\s*name\s*\}\}/gi, name)
    .replace(/\{\s*name\s*\}/gi, name)
    .replace(/<<\s*name\s*>>/gi, name)
    .replace(/\(your name\)/gi, name)
    .replace(/your name/gi, name);
}

/* ---------------- handler ---------------- */

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);
    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON body.", 400);

    const builderId = String(body.builderId || "").trim();
    const tone = String(body.tone || "premium").trim();
    const jobDescription = String(body.jobDescription || "").trim();

    if (!builderId) return jsonError("builderId is required.", 400);

    const db = getFirestore();
    const builderSnap = await db.collection("builders").doc(builderId).get();
    if (!builderSnap.exists) return jsonError("Builder not found.", 404);

    const builder = builderSnap.data() as any;

    // ownership check (guest)
    if (builder?.ownerType === "guest") {
      if (!guestSessionId) return jsonError("Missing guest session.", 401);
      if (builder?.ownerId !== guestSessionId)
        return jsonError("Unauthorized builderId.", 403);
    }

    const resume = builder?.result;
    if (!resume) return jsonError("Resume result missing in builder.", 400);

    const candidateName = resolveCandidateName(builder);

    /* --------- AI prompt --------- */

    const system =
      "You are a world-class cover letter writer. Output ONLY JSON (single object), no markdown. " +
      "Do not invent facts, numbers, employers, or skills not present in the resume JSON. " +
      "Tone must match requested style.";

    const user = `
RESUME JSON:
${JSON.stringify(resume).slice(0, 12000)}

CANDIDATE NAME:
${candidateName}

TONE:
${tone}

JOB DESCRIPTION (optional):
${jobDescription || "N/A"}

Return JSON:
{
  "subjectLine": "string",
  "letter": "string (multi-paragraph with \\n\\n, do NOT use placeholders)",
  "highlights": ["3-5 bullets of strongest matching points"]
}
`.trim();

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) return jsonError("No response from AI.", 500);

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return jsonError("AI returned invalid JSON.", 500);
    }

    /* --------- sanitize output --------- */

    const cleanContent = {
      subjectLine: injectCandidateName(
        String(parsed.subjectLine || "").trim(),
        candidateName
      ),
      letter: injectCandidateName(
        String(parsed.letter || "").trim(),
        candidateName
      ),
      highlights: Array.isArray(parsed.highlights)
        ? parsed.highlights.map((x: any) => String(x))
        : [],
    };

    /* --------- persist --------- */

    const coverLetterId = crypto.randomUUID();

    await db.collection("coverLetters").doc(coverLetterId).set({
      coverLetterId,
      builderId,
      ownerType: builder.ownerType || "guest",
      ownerId: builder.ownerId || guestSessionId || null,
      createdAt: new Date(),
      tone,
      jobDescription: jobDescription || null,

      // what UI + PDF use
      content: cleanContent,

      // backend-only debug (never show in UI)
      debug: {
        rawModelOutput: parsed,
        model: DEFAULT_MODEL,
      },
    });

    return NextResponse.json(
      { ok: true, builderId, coverLetterId, content: cleanContent },
      { status: 200 }
    );
  } catch (e: any) {
    return jsonError(
      typeof e?.message === "string" ? e.message : "Cover letter failed.",
      500
    );
  }
}
