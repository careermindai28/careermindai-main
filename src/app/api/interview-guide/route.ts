import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { openai, DEFAULT_MODEL } from "@/lib/openaiClient";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);
    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON body.", 400);

    const builderId = String(body.builderId || "").trim();
    const focus = String(body.focus || "mixed").trim(); // technical | behavioral | mixed
    const difficulty = String(body.difficulty || "standard").trim(); // standard | advanced

    if (!builderId) return jsonError("builderId is required.", 400);

    const db = getFirestore();
    const builderSnap = await db.collection("builders").doc(builderId).get();
    if (!builderSnap.exists) return jsonError("Builder not found.", 404);

    const builder = builderSnap.data() as any;

    if (builder?.ownerType === "guest") {
      if (!guestSessionId) return jsonError("Missing guest session.", 401);
      if (builder?.ownerId !== guestSessionId) return jsonError("Unauthorized builderId.", 403);
    }

    const resume = builder?.result;
    if (!resume) return jsonError("Resume result missing in builder.", 400);

    const system =
      "You are a world-class interview coach. Output ONLY JSON (single object), no markdown. " +
      "Do not invent facts not present in the resume JSON. Provide crisp, high-quality answers.";

    const user = `
RESUME JSON:
${JSON.stringify(resume).slice(0, 12000)}

FOCUS: ${focus}
DIFFICULTY: ${difficulty}

Return JSON:
{
  "overview": "string",
  "roleSpecificTips": ["...", "..."],
  "technicalQuestions": [{"q":"string","idealAnswer":"string"}],
  "behavioralQuestions": [{"q":"string","starAnswer":"string"}],
  "quickPitch": "string (30-sec pitch)",
  "salaryNegotiation": ["tips..."]
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
    if (!raw) return jsonError("No response from AI.", 500);

    let content: any;
    try {
      content = JSON.parse(raw);
    } catch {
      return jsonError("AI returned invalid JSON.", 500);
    }

    const guideId = crypto.randomUUID();
    await db.collection("interviewGuides").doc(guideId).set({
      guideId,
      builderId,
      ownerType: builder.ownerType || "guest",
      ownerId: builder.ownerId || guestSessionId || null,
      createdAt: new Date(),
      focus,
      difficulty,
      content,
    });

    return NextResponse.json({ ok: true, builderId, guideId, content }, { status: 200 });
  } catch (e: any) {
    return jsonError(typeof e?.message === "string" ? e.message : "Interview guide failed.", 500);
  }
}
