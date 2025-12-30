import { Suspense } from 'react';
import SignInClient from './SignInClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-text-secondary">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
