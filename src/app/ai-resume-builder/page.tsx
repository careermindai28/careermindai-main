import { Suspense } from 'react';
import AIResumeBuilderClient from './AIResumeBuilderClient';
import RequireAuth from '@/components/auth/RequireAuth';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <RequireAuth>
      <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10">Loading...</div>}>
        <AIResumeBuilderClient />
      </Suspense>
    </RequireAuth>
  );
}
