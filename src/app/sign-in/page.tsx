'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { getFirebaseAuth, isFirebaseReady } from '@/lib/firebaseClient';

function safeNext(next: string | null) {
  // prevent open redirects
  if (!next) return null;
  if (!next.startsWith('/')) return null;
  if (next.startsWith('//')) return null;
  return next;
}

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();

  const { user, loading, firebaseReady } = useAuth();

  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [accepted, setAccepted] = useState(true);

  const nextParam = safeNext(params.get('next'));
  const targetAfterLogin = nextParam || '/user-dashboard';

  // If already logged in, go to next (or dashboard)
  useEffect(() => {
    if (!loading && user) router.replace(targetAfterLogin);
  }, [loading, user, router, targetAfterLogin]);

  const handleGoogleSignIn = async () => {
    setErr(null);

    const ready = firebaseReady ?? isFirebaseReady();
    if (!ready) {
      setErr('Firebase is not configured. Please check your environment variables.');
      return;
    }

    if (!accepted) {
      setErr('Please accept the Terms and Privacy Policy to continue.');
      return;
    }

    setBusy(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      await signInWithPopup(auth, provider);

      // Redirect immediately for UX
      router.replace(targetAfterLogin);
    } catch (e: any) {
      console.error('Google sign-in error:', e);
      setErr(e?.message || 'Sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-text-secondary">Loading…</div>
      </main>
    );
  }

  if (user) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-foreground">Sign in to CareerMindAI</h1>
        <p className="mt-2 text-text-secondary">Continue with Google to access your dashboard and tools.</p>

        <button
          onClick={handleGoogleSignIn}
          disabled={busy}
          className="mt-6 w-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Continue with Google'}
        </button>

        <label className="mt-4 flex items-start gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <span>
            I agree to the{' '}
            <a className="underline" href="/legal/terms">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="underline" href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {err ? (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {err}
          </div>
        ) : null}

        <button
          onClick={() => router.push('/landing-page')}
          className="mt-6 w-full text-text-secondary hover:text-foreground transition-colors text-sm"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
