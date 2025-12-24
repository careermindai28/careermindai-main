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

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);

    const body = await req.json().catch(() => null);
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
    // (Later: if ownerType === "user", verify Firebase auth uid)

    const resumeText = String(audit?.resumeText || "");
    if (!resumeText || resumeText.trim().length < 200) {
      return jsonError("Resume text missing from audit. Re-run Resume Audit.", 400);
    }

    const auditResult = audit?.auditResult || null;

    const system = `You are a world-class resume writer for ATS. Return ONLY valid JSON (single object). No markdown.`;

    const user = `
RESUME TEXT (source):
${resumeText}

AUDIT SUMMARY (may help):
${auditResult ? JSON.stringify(auditResult).slice(0, 4000) : "N/A"}

TARGET ROLE:
${targetRole}

REGION:
${region}

TONE:
${tone}

JOB DESCRIPTION (optional):
${clampLen(jobDescription, 8000) || "N/A"}

TASK:
Create a rewritten ATS-optimized resume in JSON with NO fake skills.
- Keep only skills supported by source resume or clearly implied by experience.
- Quantify impact where possible but do not invent numbers.
- Make bullets crisp, achievement-led, and role-aligned.
- Ensure strong keyword coverage for target role.
- Output must be consistent and easy to render.

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
    if (!raw) return jsonError("No response from AI. Try again.", 500);

    let result: any = null;
    try {
      result = JSON.parse(raw);
    } catch {
      return jsonError("AI returned invalid JSON. Try again.", 500);
    }

    const builderId = crypto.randomUUID();

    await db.collection("builders").doc(builderId).set({
      builderId,
      auditId,
      ownerType: audit.ownerType || "guest",
      ownerId: audit.ownerId || guestSessionId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      inputs: {
        targetRole,
        region,
        tone,
        jobDescription: jobDescription ? jobDescription : null,
      },
      result,
    });

    return NextResponse.json(
      { ok: true, auditId, builderId, result },
      { status: 200 }
    );
  } catch (e: any) {
    return jsonError(
      typeof e?.message === "string" ? e.message : "Resume build failed.",
      500
    );
  }
}
