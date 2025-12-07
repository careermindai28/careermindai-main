'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface BreadcrumbProps {
  className?: string;
  customSegments?: { label: string; path: string }[];
}

const Breadcrumb = ({ className = '', customSegments }: BreadcrumbProps) => {
  const pathname = usePathname();

  const pathSegmentLabels: Record<string, string> = {
    'user-dashboard': 'Dashboard',
    'resume-audit-tool': 'Resume Audit',
    'ai-resume-builder': 'AI Resume Builder',
    'cover-letter-generator': 'Cover Letter Generator',
    'interview-preparation': 'Interview Preparation',
    'linked-in-optimization': 'LinkedIn Optimization',
    'free-tools-hub': 'Free Tools Hub',
    'pricing-plans': 'Pricing',
    'user-settings': 'Settings',
    'admin-dashboard': 'Admin Dashboard',
    'landing-page': 'Home',
  };

  const generateBreadcrumbs = () => {
    if (customSegments) {
      return customSegments;
    }

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = pathSegmentLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      return { label, path };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <Link
        href="/user-dashboard"
        className="text-text-secondary hover:text-foreground transition-colors duration-150 flex items-center"
      >
        <Icon name="HomeIcon" size={16} className="mr-1" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <div key={crumb.path} className="flex items-center space-x-2">
            <Icon
              name="ChevronRightIcon"
              size={16}
              className="text-text-secondary"
            />
            {isLast ? (
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="text-text-secondary hover:text-foreground transition-colors duration-150 truncate max-w-[150px] sm:max-w-none"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;