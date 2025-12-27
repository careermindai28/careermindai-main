'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/sign-in');
    }
  }, [loading, user, router]);

  if (loading) return null; // or a loader
  if (!user) return null;   // while redirecting

  return <>{children}</>;
}
