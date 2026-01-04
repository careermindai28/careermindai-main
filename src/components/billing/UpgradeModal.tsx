"use client";

import { useState } from "react";
import { startRazorpayCheckout } from "@/lib/razorpay";

type PlanChoice = "PASS_30D_99" | "PASS_30D_199";

export default function UpgradeModal({
  open,
  message,
  onClose,
  onUpgraded,
}: {
  open: boolean;
  message?: string;
  onClose: () => void;
  onUpgraded?: () => void;
}) {
  const [paying, setPaying] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [choice, setChoice] = useState<PlanChoice>("PASS_30D_99");

  if (!open) return null;

  const start = async () => {
    setErr(null);
    setPaying(true);

    await startRazorpayCheckout({
      plan: choice,
      onSuccess: () => {
        setPaying(false);
        onClose();
        onUpgraded?.();
      },
      onError: (m: string) => {
        setPaying(false);
        setErr(m);
      },
    });
  };

  const priceLabel = choice === "PASS_30D_99" ? "₹99" : "₹199";
  const planLabel = choice === "PASS_30D_99" ? "Starter Pass (30 days)" : "Pro Pass (30 days)";

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-card">
        <div className="text-xl font-semibold text-foreground">Upgrade to Pro</div>
        <div className="mt-2 text-sm text-text-secondary">
          {message || "You’ve reached today’s free export limit. Upgrade to unlock more exports."}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-background p-4 space-y-3">
          <div className="text-sm font-medium text-foreground">Choose your plan</div>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer">
            <input
              type="radio"
              name="plan"
              checked={choice === "PASS_30D_99"}
              onChange={() => setChoice("PASS_30D_99")}
              className="mt-1"
            />
            <div>
              <div className="font-semibold text-foreground">₹99 — Starter Pass (30 days)</div>
              <div className="text-sm text-text-secondary">
                More exports + basic unlocks (best for trial conversion)
              </div>
              <ul className="mt-2 text-sm text-text-secondary list-disc pl-5 space-y-1">
                <li>Up to 10 PDF exports/day</li>
                <li>Watermark ON</li>
                <li>Priority support: No</li>
              </ul>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer">
            <input
              type="radio"
              name="plan"
              checked={choice === "PASS_30D_199"}
              onChange={() => setChoice("PASS_30D_199")}
              className="mt-1"
            />
            <div>
              <div className="font-semibold text-foreground">₹199 — Pro Pass (30 days)</div>
              <div className="text-sm text-text-secondary">
                Unlimited exports + watermark OFF (best value)
              </div>
              <ul className="mt-2 text-sm text-text-secondary list-disc pl-5 space-y-1">
                <li>Unlimited PDF exports</li>
                <li>Watermark OFF</li>
                <li>Faster export queue</li>
              </ul>
            </div>
          </label>
        </div>

        {err ? (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {err}
          </div>
        ) : null}

        <div className="mt-6 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            disabled={paying}
          >
            Not now
          </button>
          <button
            onClick={start}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-60"
            disabled={paying}
          >
            {paying ? "Opening Razorpay..." : `Pay ${priceLabel} • ${planLabel}`}
          </button>
        </div>
      </div>
    </div>
  );
}
