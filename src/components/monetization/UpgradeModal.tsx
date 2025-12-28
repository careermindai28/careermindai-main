"use client";

export default function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold">Upgrade to CareerMindAI Pro</h2>
        <ul className="text-sm space-y-1">
          <li>✔ Unlimited PDF exports</li>
          <li>✔ No watermark</li>
          <li>✔ Priority AI processing</li>
        </ul>

        <button
          onClick={() => alert("Razorpay hook here")}
          className="w-full py-3 bg-primary text-white rounded-lg"
        >
          Upgrade Now
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
