import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: NextRequest) {
  try {
    const coverLetterId = req.nextUrl.searchParams.get("coverLetterId") || "";
    if (!coverLetterId) return jsonError("coverLetterId is required.", 400);

    const db = getFirestore();
    const snap = await db.collection("coverLetters").doc(coverLetterId).get();
    if (!snap.exists) return jsonError("Cover letter not found.", 404);

    const data = snap.data() as any;
    return NextResponse.json({ ok: true, content: data.content }, { status: 200 });
  } catch (e: any) {
    return jsonError(e?.message || "Read failed.", 500);
  }
}
