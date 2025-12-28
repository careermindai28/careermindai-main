'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { logoutUser } from '@/lib/logout';

interface DashboardSidebarProps {
  isCollapsed?: boolean;
  className?: string;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  tooltip?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const DashboardSidebar = ({ isCollapsed = false, className = '' }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigationSections: NavigationSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/user-dashboard', icon: 'HomeIcon', tooltip: 'Your career development hub' },
      ],
    },
    {
      title: 'Career Tools',
      items: [
        { label: 'Resume Audit', path: '/resume-audit-tool', icon: 'DocumentMagnifyingGlassIcon', tooltip: 'Analyze and improve your resume' },
        { label: 'AI Resume Builder', path: '/ai-resume-builder', icon: 'DocumentTextIcon', tooltip: 'Create optimized resumes' },
        { label: 'Cover Letter', path: '/cover-letter-generator', icon: 'DocumentIcon', tooltip: 'Generate tailored cover letters' },
        { label: 'Interview Prep', path: '/interview-preparation', icon: 'ChatBubbleLeftRightIcon', tooltip: 'Practice interview questions' },
        { label: 'LinkedIn Optimizer', path: '/linked-in-optimization', icon: 'UserCircleIcon', tooltip: 'Enhance your LinkedIn profile' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Free Tools', path: '/free-tools-hub', icon: 'WrenchScrewdriverIcon', tooltip: 'Access free career utilities' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Settings', path: '/user-settings', icon: 'Cog6ToothIcon', tooltip: 'Manage your account' },
      ],
    },
  ];

  const isActiveRoute = (path: string) => pathname === path;

  const toggleMobileSidebar = () => setIsMobileOpen((v) => !v);
  const toggleCollapse = () => setCollapsed((v) => !v);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsMobileOpen(false); // prevent accidental clicks during transition
    try {
      await logoutUser(); // hard redirect to /sign-in (as you created)
    } finally {
      // If redirect is blocked for some reason, re-enable UI.
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/user-dashboard" className="flex items-center space-x-2" onClick={() => setIsMobileOpen(false)}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary flex-shrink-0"
          >
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path d="M16 8L8 14V24H12V18H20V24H24V14L16 8Z" fill="white" />
          </svg>
          {!collapsed && (
            <span className="text-lg font-semibold text-foreground">CareerMindAI</span>
          )}
        </Link>

        <button
          onClick={toggleCollapse}
          className="hidden lg:block p-1 rounded hover:bg-muted transition-colors duration-150"
          aria-label="Toggle sidebar"
        >
          <Icon
            name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'}
            size={20}
            className="text-text-secondary"
          />
        </button>
      </div>

      <nav className={`flex-1 overflow-y-auto py-4 px-2 ${isLoggingOut ? 'pointer-events-none opacity-60' : ''}`}>
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = isActiveRoute(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-card'
                        : 'text-text-secondary hover:bg-muted hover:text-foreground'
                    }`}
                    title={collapsed ? item.tooltip : undefined}
                  >
                    <Icon
                      name={item.icon as any}
                      size={20}
                      className={`flex-shrink-0 ${
                        isActive ? 'text-primary-foreground' : 'text-text-secondary group-hover:text-foreground'
                      }`}
                    />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mb-3`}>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-semibold">U</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">User</p>
              <p className="text-xs text-text-secondary truncate">Free Plan</p>
            </div>
          )}
        </div>

        {/* ✅ Logout available even when collapsed (icon-only) */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-center'} gap-2 px-4 py-2 rounded-lg
            border border-border hover:bg-muted transition-colors duration-150 disabled:opacity-60`}
          aria-label="Logout"
          title={collapsed ? 'Logout' : undefined}
        >
          <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-text-secondary" />
          {!collapsed && <span className="text-sm font-medium text-text-secondary">{isLoggingOut ? 'Logging out…' : 'Logout'}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-1200 p-2 bg-surface rounded-lg shadow-modal border border-border"
        aria-label="Toggle mobile sidebar"
      >
        <Icon name="Bars3Icon" size={24} className="text-foreground" />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-1100"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`
          ${collapsed ? 'w-20' : 'w-72'}
          lg:fixed fixed top-0 left-0 h-screen bg-surface border-r border-border z-1100
          transition-all duration-300 ease-smooth
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSidebar;
