'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { user, loading, firebaseReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If Firebase is not configured, show error state
    if (!firebaseReady && !loading) {
      return;
    }

    // Redirect to landing page if not authenticated
    if (!loading && !user) {
      router.replace('/landing-page');
    }
  }, [loading, user, router, firebaseReady]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-sm text-gray-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Show Firebase configuration error
  if (!firebaseReady) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="mb-4 text-5xl">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Authentication Not Configured
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Firebase authentication is not properly configured. Please contact the site administrator.
          </p>
          <button
            onClick={() => router.push('/landing-page')}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!user) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}