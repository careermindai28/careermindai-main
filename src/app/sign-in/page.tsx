// src/app/sign-in/page.tsx
import { Suspense } from "react";
import SignInClient from "./SignInClient";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
