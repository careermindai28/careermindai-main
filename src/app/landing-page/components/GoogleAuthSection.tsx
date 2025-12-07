'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';


interface GoogleAuthSectionProps {
  className?: string;
}

const GoogleAuthSection = ({ className = '' }: GoogleAuthSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGoogleLogin = () => {
    if (!termsAccepted) {
      alert('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    console.log('Google OAuth login initiated');
    window.location.href = '/user-dashboard';
  };

  if (!isHydrated) {
    return (
      <section id="get-started" className={`bg-gradient-to-br from-primary/5 to-accent/5 py-20 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 shadow-elevation text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of professionals who have already improved their job search success
            </p>
            <button
              className="inline-flex items-center gap-3 bg-surface hover:bg-muted border-2 border-border px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 shadow-card hover:shadow-elevation mb-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <div className="flex items-start gap-3 justify-center text-left max-w-md mx-auto">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="get-started" className={`bg-gradient-to-br from-primary/5 to-accent/5 py-20 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 shadow-elevation text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of professionals who have already improved their job search success
          </p>
          <div className="mb-6">
            {termsAccepted ? (
              <GoogleLoginButton fullWidth />
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-3 bg-gray-100 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg text-gray-400 cursor-not-allowed w-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            )}
          </div>
          <div className="flex items-start gap-3 justify-center text-left max-w-md mx-auto">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-text-secondary cursor-pointer">
              I agree to the{' '}
              <Link href="/legal/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleAuthSection;