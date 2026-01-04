// src/lib/razorpay.ts
import crypto from "crypto";

// ---------------------------
// Server-side helpers
// ---------------------------
export function getRazorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Missing Razorpay env vars: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET");
  }

  return { keyId, keySecret };
}

export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret } = getRazorpayKeys();
  const body = `${params.orderId}|${params.paymentId}`;
  const expected = crypto.createHmac("sha256", keySecret).update(body).digest("hex");
  return expected === params.signature;
}

// ---------------------------
// Client-side helper
// ---------------------------
type CheckoutPlan = "PASS_30D_99" | "PASS_30D_199";

type StartCheckoutArgs = {
  plan: CheckoutPlan;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

async function loadRazorpayScript() {
  if (typeof window === "undefined") return;
  const src = "https://checkout.razorpay.com/v1/checkout.js";
  const exists = document.querySelector(`script[src="${src}"]`);
  if (exists) return;

  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay checkout script."));
    document.body.appendChild(s);
  });
}

export async function startRazorpayCheckout(args: StartCheckoutArgs) {
  try {
    if (typeof window === "undefined") throw new Error("Checkout can only run in browser.");

    await loadRazorpayScript();

    // Create order on server
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: args.plan }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      throw new Error(json?.error || "Unable to start payment.");
    }

    const { order, keyId } = json;

    // Get Firebase token (for verify route)
    const { getFirebaseAuth } = await import("@/lib/firebaseClient");
    const token = await getFirebaseAuth().currentUser?.getIdToken(true);
    if (!token) throw new Error("Please sign in again to continue.");

    const rzp = new window.Razorpay({
      key: keyId,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      name: "CareerMindAI",
      description: "CareerMindAI Pro Pass (30 days)",
      handler: async (resp: any) => {
        const vr = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan: args.plan,
            orderId: resp?.razorpay_order_id,
            paymentId: resp?.razorpay_payment_id,
            signature: resp?.razorpay_signature,
          }),
        });

        const vj = await vr.json().catch(() => null);
        if (!vr.ok || !vj?.ok) throw new Error(vj?.error || "Payment verification failed.");

        args.onSuccess?.();
      },
      modal: { ondismiss: () => {} },
      theme: { color: "#2563eb" },
    });

    rzp.open();
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Payment failed.";
    args.onError?.(msg);
  }
}
