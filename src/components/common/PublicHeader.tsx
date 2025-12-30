'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/components/providers/AuthProvider';

interface PublicHeaderProps {
  className?: string;
}

function withNext(signInPath: string, nextPath: string) {
  const params = new URLSearchParams();
  params.set('next', nextPath);
  return `${signInPath}?${params.toString()}`;
}

const PublicHeader = ({ className = '' }: PublicHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname() || '/landing-page';

  const ROUTES = useMemo(
    () => ({
      landing: '/landing-page',
      pricing: '/pricing-plans',
      freeTools: '/free-tools-hub',
      signIn: '/sign-in',
      dashboard: '/user-dashboard',
      audit: '/resume-audit-tool',
    }),
    []
  );

  const navigationItems = [
    { label: 'Home', path: ROUTES.landing },
    { label: 'Pricing', path: ROUTES.pricing },
    { label: 'Free Tools', path: ROUTES.freeTools },
  ];

  // Primary CTA:
  // - logged in  -> dashboard
  // - logged out -> sign-in then resume-audit-tool
  const primaryCtaHref = loading
    ? ROUTES.signIn
    : user
    ? ROUTES.dashboard
    : withNext(ROUTES.signIn, ROUTES.audit);

  const primaryCtaLabel = loading ? 'Loading…' : user ? 'Go to Dashboard' : 'Get Started';

  // Secondary CTA:
  // - logged in  -> dashboard
  // - logged out -> sign-in then return to current page
  const secondaryCtaHref = loading
    ? ROUTES.signIn
    : user
    ? ROUTES.dashboard
    : withNext(ROUTES.signIn, pathname);

  const secondaryCtaLabel = loading ? 'Login' : user ? 'Dashboard' : 'Login';

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  return (
    <header className={`bg-surface border-b border-border sticky top-0 z-1000 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={ROUTES.landing} className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <rect width="32" height="32" rx="6" fill="currentColor" />
                <path d="M16 8L8 14V24H12V18H20V24H24V14L16 8Z" fill="white" />
              </svg>
              <span className="text-xl font-semibold text-foreground">CareerMindAI</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-text-secondary hover:text-foreground transition-colors duration-150 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={secondaryCtaHref}
              className="text-text-secondary hover:text-foreground transition-colors duration-150 font-medium"
              aria-disabled={loading}
              onClick={(e) => {
                if (loading) e.preventDefault();
              }}
            >
              {secondaryCtaLabel}
            </Link>

            <Link
              href={primaryCtaHref}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 shadow-card hover:shadow-elevation"
              aria-disabled={loading}
              onClick={(e) => {
                if (loading) e.preventDefault();
              }}
            >
              {primaryCtaLabel}
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-150"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} className="text-foreground" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface z-1100">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block py-2 text-text-secondary hover:text-foreground transition-colors duration-150 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-border space-y-3">
              <Link
                href={secondaryCtaHref}
                className="block py-2 text-text-secondary hover:text-foreground transition-colors duration-150 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-disabled={loading}
              >
                {secondaryCtaLabel}
              </Link>

              <Link
                href={primaryCtaHref}
                className="block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-medium text-center transition-all duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-disabled={loading}
              >
                {primaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
