"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore } from "@/lib/firebaseAdmin";
import { getFirebaseAuth } from "@/lib/firebaseClient";

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    if (!user) router.replace("/sign-in");
  }, [router]);

  const togglePlan = async (plan: "FREE" | "PAID") => {
    try {
      setStatus("Updating...");
      const res = await fetch("/api/admin/set-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus(`User set to ${plan}`);
    } catch (e: any) {
      setStatus(e.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Admin – User Plan Control</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User email"
        className="w-full p-3 border rounded"
      />

      <div className="flex gap-4">
        <button
          onClick={() => togglePlan("FREE")}
          className="px-4 py-2 border rounded"
        >
          Set FREE
        </button>
        <button
          onClick={() => togglePlan("PAID")}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Set PAID
        </button>
      </div>

      {status && <div className="text-sm">{status}</div>}
    </div>
  );
}
