import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: NextRequest) {
  try {
    const guideId = req.nextUrl.searchParams.get("guideId") || "";
    if (!guideId) return jsonError("guideId is required.", 400);

    const db = getFirestore();
    const snap = await db.collection("interviewGuides").doc(guideId).get();
    if (!snap.exists) return jsonError("Interview guide not found.", 404);

    const data = snap.data() as any;
    return NextResponse.json({ ok: true, content: data.content }, { status: 200 });
  } catch (e: any) {
    return jsonError(e?.message || "Read failed.", 500);
  }
}
