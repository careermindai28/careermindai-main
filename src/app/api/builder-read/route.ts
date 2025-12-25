import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

export async function GET(req: NextRequest) {
  try {
    const builderId = req.nextUrl.searchParams.get("builderId") || "";
    if (!builderId) return jsonError("builderId is required.", 400);

    const db = getFirestore();
    const snap = await db.collection("builders").doc(builderId).get();
    if (!snap.exists) return jsonError("Builder not found.", 404);

    const data = snap.data() as any;

    // ownership check (guest)
    if (data?.ownerType === "guest") {
      const guestSessionId = getGuestSessionId(req);
      if (!guestSessionId) return jsonError("Missing guest session.", 401);
      if (data?.ownerId !== guestSessionId) return jsonError("Unauthorized builderId.", 403);
    }

    return NextResponse.json(
      {
        ok: true,
        builderId: data.builderId,
        auditId: data.auditId,
        inputs: data.inputs || {},
        result: data.result,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return jsonError(e?.message || "Builder read failed.", 500);
  }
}
