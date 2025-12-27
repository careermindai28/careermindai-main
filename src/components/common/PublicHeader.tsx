'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/components/providers/AuthProvider';

interface PublicHeaderProps {
  className?: string;
}

const PublicHeader = ({ className = '' }: PublicHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navigationItems = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Pricing', path: '/pricing-plans' },
    { label: 'Free Tools', path: '/free-tools-hub' },
  ];

  const primaryCtaHref = user ? '/dashboard' : '/landing-page#get-started';
  const primaryCtaLabel = user ? 'Go to Dashboard' : 'Get Started';

  const secondaryCtaHref = user ? '/dashboard' : '/landing-page#get-started';
  const secondaryCtaLabel = user ? 'Dashboard' : 'Login';

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  return (
    <header className={`bg-surface border-b border-border sticky top-0 z-1000 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/landing-page" className="flex items-center space-x-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
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
            >
              {secondaryCtaLabel}
            </Link>
            <Link
              href={primaryCtaHref}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              {primaryCtaLabel}
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-150"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              className="text-foreground"
            />
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
              >
                {secondaryCtaLabel}
              </Link>
              <Link
                href={primaryCtaHref}
                className="block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-medium text-center transition-all duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
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
