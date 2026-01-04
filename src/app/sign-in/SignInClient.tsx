"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextUrl = useMemo(() => {
    const n = sp.get("next");
    // only allow internal redirects
    if (!n || !n.startsWith("/")) return "/user-dashboard";
    return n;
  }, [sp]);

  const [err, setErr] = useState("");

  useEffect(() => {
    // optional: if already logged in, redirect immediately
    // (depends on your auth hook; leaving safe)
  }, []);

  const handleGo = () => {
    // your existing Google sign-in logic probably lives elsewhere.
    // If your sign-in component already does Google popup,
    // call it and on success:
    try {
      router.replace(nextUrl);
    } catch (e: any) {
      setErr(e?.message || "Sign-in failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Continue to CareerMindAI
      </p>

      {err && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {err}
        </div>
      )}

      <button
        onClick={handleGo}
        className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-primary-foreground font-semibold"
      >
        Continue with Google
      </button>
    </div>
  );
}
