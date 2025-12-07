'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterSectionProps {
  className?: string;
}

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Resume Audit", href: "/resume-audit-tool" },
        { label: "AI Resume Builder", href: "/ai-resume-builder" },
        { label: "Cover Letter", href: "/cover-letter-generator" },
        { label: "Interview Prep", href: "/interview-preparation" },
        { label: "LinkedIn Tools", href: "/linked-in-optimization" },
        { label: "Free Tools", href: "/free-tools-hub" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help-center" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Refund Policy", href: "/legal/refund" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "XMarkIcon", href: "#" },
    { name: "LinkedIn", icon: "UserCircleIcon", href: "#" },
    { name: "Facebook", icon: "UserGroupIcon", href: "#" }
  ];

  return (
    <footer className={`bg-surface border-t border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/landing-page" className="flex items-center space-x-2 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <rect width="32" height="32" rx="6" fill="currentColor" />
                <path
                  d="M16 8L8 14V24H12V18H20V24H24V14L16 8Z"
                  fill="white"
                />
              </svg>
              <span className="text-xl font-semibold text-foreground">
                CareerMindAI
              </span>
            </Link>
            <p className="text-text-secondary mb-4">
              AI-powered career development tools to help you land your dream job.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-secondary hover:text-primary transition-colors duration-150"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              &copy; {isHydrated ? currentYear : 2025} CareerMindAI. All rights reserved.
            </p>
            <p className="text-text-secondary text-sm">
              Made with ❤️ in Mumbai, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;