import { Suspense } from 'react';
import AIResumeBuilderClient from './AIResumeBuilderClient';

export const dynamic = 'force-dynamic'; // ensure runtime render (prevents static export issues)

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-10">Loading...</div>}>
      <AIResumeBuilderClient />
    </Suspense>
  );
}
