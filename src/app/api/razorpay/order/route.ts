import { NextResponse } from "next/server";
import { getRazorpayKeys } from "@/lib/razorpay";

export const runtime = "nodejs";

const PRICES: Record<string, number> = {
  PASS_30D_99: 9900,
  PASS_30D_199: 19900,
};

export async function POST(req: Request) {
  try {
    const { keyId, keySecret } = getRazorpayKeys();
    const body = await req.json().catch(() => ({}));
    const plan = String(body?.plan || "");

    const amount = PRICES[plan];
    if (!amount) {
      return NextResponse.json({ ok: false, error: "Invalid plan." }, { status: 400 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `cm_${plan}_${Date.now()}`,
      }),
    });

    const data = await rpRes.json();

    if (!rpRes.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error?.description || "Failed to create order", detail: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, order: data, keyId });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Order creation failed." }, { status: 500 });
  }
}
