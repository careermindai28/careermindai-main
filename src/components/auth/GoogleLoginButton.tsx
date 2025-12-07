'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { isFirebaseReady, getFirebaseAuth, getGoogleProvider } from '@/lib/firebaseClient';

interface GoogleLoginButtonProps {
  fullWidth?: boolean;
}

export default function GoogleLoginButton({ fullWidth }: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    // Check if Firebase is configured
    if (!isFirebaseReady()) {
      setError(
        'Firebase authentication is not configured. Please contact support or check your environment configuration.'
      );
      console.error(
        '❌ Firebase not ready. Please configure environment variables in Rocket panel.'
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const auth = getFirebaseAuth();
      const googleProvider = getGoogleProvider();

      await signInWithPopup(auth, googleProvider);
      router.push('/user-dashboard');
    } catch (err: any) {
      console.error('Google login error:', err);
      
      // Provide user-friendly error messages
      if (err?.code === 'auth/unauthorized-domain') {
        setError(
          'This domain is not authorized for Google Sign-In. Please add this domain to Firebase Console: Authentication → Settings → Authorized domains.'
        );
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (err?.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else if (err?.message?.includes('not initialized')) {
        setError('Authentication service is not available. Please contact support.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
}