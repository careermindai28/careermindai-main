'use client';

import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';
import UserManagementTable from './UserManagementTable';
import RevenueChart from './RevenueChart';
import SystemHealth from './SystemHealth';

interface Metrics {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  conversionRate: number;
}

interface Activity {
  id: number;
  type: 'registration' | 'subscription' | 'upgrade' | 'cancellation';
  user: string;
  action: string;
  timestamp: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  plan: 'Free' | 'Starter' | 'Pro';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
}

interface HealthMetric {
  id: number;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  threshold: string;
}

interface AdminDashboardInteractiveProps {
  metrics: Metrics;
  activities: Activity[];
  users: User[];
  revenueData: RevenueData[];
  healthMetrics: HealthMetric[];
}

const AdminDashboardInteractive = ({
  metrics,
  activities,
  users,
  revenueData,
  healthMetrics,
}: AdminDashboardInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleUserSearch = () => {
    console.log('User search initiated');
  };

  const handleManualSubscription = () => {
    console.log('Manual subscription management opened');
  };

  const handleSystemAnnouncement = () => {
    console.log('System announcement created');
  };

  const handleExportData = () => {
    console.log('Data export initiated');
  };

  const quickActions = [
    {
      id: 1,
      label: 'Search Users',
      icon: 'MagnifyingGlassIcon',
      color: 'primary' as const,
      onClick: handleUserSearch,
    },
    {
      id: 2,
      label: 'Manage Subscription',
      icon: 'CreditCardIcon',
      color: 'secondary' as const,
      onClick: handleManualSubscription,
    },
    {
      id: 3,
      label: 'Send Announcement',
      icon: 'MegaphoneIcon',
      color: 'success' as const,
      onClick: handleSystemAnnouncement,
    },
    {
      id: 4,
      label: 'Export Data',
      icon: 'ArrowDownTrayIcon',
      color: 'warning' as const,
      onClick: handleExportData,
    },
  ];

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-6 shadow-card animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers.toLocaleString('en-IN')}
          change={12.5}
          trend="up"
          icon="UsersIcon"
          color="primary"
        />
        <MetricCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions.toLocaleString('en-IN')}
          change={8.3}
          trend="up"
          icon="CheckCircleIcon"
          color="success"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`₹${(metrics.monthlyRevenue / 100000).toFixed(1)}L`}
          change={15.7}
          trend="up"
          icon="CurrencyRupeeIcon"
          color="secondary"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={-2.1}
          trend="down"
          icon="ChartBarIcon"
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div className="space-y-6">
          <ActivityFeed activities={activities} />
          <SystemHealth metrics={healthMetrics} />
        </div>
      </div>

      <QuickActions actions={quickActions} />

      <UserManagementTable users={users} />
    </div>
  );
};

export default AdminDashboardInteractive;