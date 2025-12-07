'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface AdminNavigationProps {
  isCollapsed?: boolean;
  className?: string;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  tooltip?: string;
}

const AdminNavigation = ({ isCollapsed = false, className = '' }: AdminNavigationProps) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'ChartBarIcon',
      tooltip: 'Platform overview and analytics',
    },
    {
      label: 'User Management',
      path: '/admin-dashboard/users',
      icon: 'UsersIcon',
      tooltip: 'Manage user accounts',
    },
    {
      label: 'Content Management',
      path: '/admin-dashboard/content',
      icon: 'DocumentTextIcon',
      tooltip: 'Manage platform content',
    },
    {
      label: 'Analytics',
      path: '/admin-dashboard/analytics',
      icon: 'ChartPieIcon',
      tooltip: 'View detailed analytics',
    },
    {
      label: 'Settings',
      path: '/admin-dashboard/settings',
      icon: 'Cog6ToothIcon',
      tooltip: 'Platform settings',
    },
  ];

  const isActiveRoute = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/admin-dashboard" className="flex items-center space-x-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary flex-shrink-0"
          >
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path
              d="M16 8L8 14V24H12V18H20V24H24V14L16 8Z"
              fill="white"
            />
          </svg>
          {!collapsed && (
            <div>
              <span className="text-lg font-semibold text-foreground block">
                CareerMindAI
              </span>
              <span className="text-xs text-text-secondary">Admin Panel</span>
            </div>
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

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground shadow-card'
                    : 'text-text-secondary hover:bg-muted hover:text-foreground'
                }`}
                title={collapsed ? item.tooltip : undefined}
              >
                <Icon
                  name={item.icon as any}
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive ? 'text-secondary-foreground' : 'text-text-secondary group-hover:text-foreground'
                  }`}
                />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/user-dashboard"
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg text-text-secondary hover:bg-muted hover:text-foreground transition-all duration-150`}
        >
          <Icon name="ArrowLeftIcon" size={20} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Back to User View</span>}
        </Link>
      </div>

      <div className="p-4 border-t border-border">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-secondary-foreground font-semibold">A</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-text-secondary truncate">Administrator</p>
            </div>
          )}
        </div>
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

export default AdminNavigation;