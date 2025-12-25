import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function getGuestSessionId(req: NextRequest) {
  return req.cookies.get("guestSessionId")?.value || "";
}

const ALLOWED = new Set(["atsClassic", "modernProfessional", "executive"]);

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = getGuestSessionId(req);
    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON body.", 400);

    const builderId = String(body.builderId || "").trim();
    const selectedTemplate = String(body.selectedTemplate || "").trim();

    if (!builderId) return jsonError("builderId is required.", 400);
    if (!ALLOWED.has(selectedTemplate)) return jsonError("Invalid template.", 400);

    const db = getFirestore();
    const ref = db.collection("builders").doc(builderId);
    const snap = await ref.get();
    if (!snap.exists) return jsonError("Builder not found.", 404);

    const data = snap.data() as any;

    if (data?.ownerType === "guest") {
      if (!guestSessionId) return jsonError("Missing guest session.", 401);
      if (data?.ownerId !== guestSessionId) return jsonError("Unauthorized builderId.", 403);
    }

    await ref.set(
      { selectedTemplate, updatedAt: new Date() },
      { merge: true }
    );

    return NextResponse.json({ ok: true, builderId, selectedTemplate }, { status: 200 });
  } catch (e: any) {
    return jsonError(e?.message || "Template update failed.", 500);
  }
}
