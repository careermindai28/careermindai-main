// src/app/api/razorpay/verify/route.ts
import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const ADMIN_EMAILS = ["careermindai28@gmail.com"];

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return NextResponse.json({ ok: false, error: "Unauthorized (missing token)." }, { status: 401 });
    }

    const decoded = await getAdminAuth().verifyIdToken(token);
    const uid = decoded.uid;

    const body = await req.json();
    const plan = String(body?.plan || "");
    const orderId = String(body?.orderId || "");
    const paymentId = String(body?.paymentId || "");
    const signature = String(body?.signature || "");

    if (!plan || !orderId || !paymentId || !signature) {
      return NextResponse.json({ ok: false, error: "Missing verification fields." }, { status: 400 });
    }

    const valid = verifyRazorpaySignature({ orderId, paymentId, signature });
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid payment signature." }, { status: 400 });
    }

    // 30 day pass
    const paidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const isAdmin = ADMIN_EMAILS.includes(decoded.email || "");

    const db = getAdminDb();
    const userRef = db.collection("users").doc(uid);

    await userRef.set(
      {
        plan: "PAID",
        paidUntil,
        isAdmin,
        razorpay: { plan, orderId, paymentId },
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, plan: "PAID", paidUntil, isAdmin });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Verify failed." },
      { status: 500 }
    );
  }
}
