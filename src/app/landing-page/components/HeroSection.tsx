'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className={`bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 lg:py-32 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
                <span className="text-accent font-semibold text-sm">AI-Powered Career Tools</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Beat ATS Systems with <span className="text-primary">ResumeMind Score</span><sup>TM</sup>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
                Get instant AI-powered resume audits, build ATS-optimized resumes, and ace your interviews with personalized preparation tools designed for Indian and global job markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/user-dashboard"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 shadow-card hover:shadow-elevation text-center"
                >
                  Start Free Audit
                </Link>
                <Link
                  href="/pricing-plans"
                  className="bg-surface hover:bg-muted text-foreground border-2 border-border px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-surface rounded-2xl shadow-elevation p-6 border border-border">
                <div className="aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 relative">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#2563EB" strokeWidth="12" strokeDasharray="565.48" strokeDashoffset="141.37" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <div className="text-5xl font-bold text-primary">85</div>
                          <div className="text-sm text-text-secondary">
  ResumeMind Score<sup>TM</sup>
</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-foreground">92</div>
                        <div className="text-text-secondary text-xs">ATS Score</div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">78</div>
                        <div className="text-text-secondary text-xs">Content</div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">85</div>
                        <div className="text-text-secondary text-xs">Format</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
              <span className="text-accent font-semibold text-sm">AI-Powered Career Tools</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Beat ATS Systems with <span className="text-primary">ResumeMind Score</span><sup>TM</sup>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              Get instant AI-powered resume audits, build ATS-optimized resumes, and ace your interviews with personalized preparation tools designed for Indian and global job markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/user-dashboard"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 shadow-card hover:shadow-elevation text-center"
              >
                Start Free Audit
              </Link>
              <Link
                href="/pricing-plans"
                className="bg-surface hover:bg-muted text-foreground border-2 border-border px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-surface rounded-2xl shadow-elevation p-6 border border-border">
              <div className="aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#2563EB" strokeWidth="12" strokeDasharray="565.48" strokeDashoffset="141.37" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-5xl font-bold text-primary">85</div>
                        <div className="text-sm text-text-secondary">
  ResumeMind Score<sup>TM</sup>
</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-foreground">92</div>
                      <div className="text-text-secondary text-xs">ATS Score</div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">78</div>
                      <div className="text-text-secondary text-xs">Content</div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">85</div>
                      <div className="text-text-secondary text-xs">Format</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;