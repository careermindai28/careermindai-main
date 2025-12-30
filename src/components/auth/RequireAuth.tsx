'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

function withNext(nextPath: string) {
  const params = new URLSearchParams();
  params.set('next', nextPath);
  return `/sign-in?${params.toString()}`;
}

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname) {
      router.replace(withNext(pathname));
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-text-secondary">
        Loading…
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
