'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProfileSection from './ProfileSection';
import SecuritySection from './SecuritySection';
import SubscriptionSection from './SubscriptionSection';
import NotificationsSection from './NotificationsSection';
import DataPrivacySection from './DataPrivacySection';

type TabType = 'profile' | 'security' | 'subscription' | 'notifications' | 'privacy';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  careerLevel: string;
  targetIndustries: string[];
  linkedInUrl: string;
  portfolioUrl: string;
}

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

interface UsageStats {
  resumeAudits: { used: number; limit: number };
  resumeBuilds: { used: number; limit: number };
  coverLetters: { used: number; limit: number };
  interviewPrep: { used: number; limit: number };
}

interface BillingHistory {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
}

interface NotificationPreferences {
  emailNotifications: {
    resumeAuditComplete: boolean;
    weeklyTips: boolean;
    productUpdates: boolean;
    marketingEmails: boolean;
  };
  frequency: 'instant' | 'daily' | 'weekly';
  pushNotifications: boolean;
}

const SettingsInteractive = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProfileData: ProfileData = {
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    careerLevel: 'Mid Level (3-5 years)',
    targetIndustries: ['Technology/IT', 'Finance/Banking'],
    linkedInUrl: 'https://linkedin.com/in/rajeshkumar',
    portfolioUrl: 'https://rajeshkumar.dev'
  };

  const mockUsageStats: UsageStats = {
    resumeAudits: { used: 3, limit: 5 },
    resumeBuilds: { used: 1, limit: 3 },
    coverLetters: { used: 2, limit: 5 },
    interviewPrep: { used: 4, limit: 10 }
  };

  const mockBillingHistory: BillingHistory[] = [
    {
      id: '1',
      date: '01/11/2025',
      amount: '₹499',
      plan: 'Starter Plan',
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: '2',
      date: '01/10/2025',
      amount: '₹499',
      plan: 'Starter Plan',
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: '3',
      date: '01/09/2025',
      amount: '₹499',
      plan: 'Starter Plan',
      status: 'paid',
      invoiceUrl: '#'
    }
  ];

  const mockNotificationPreferences: NotificationPreferences = {
    emailNotifications: {
      resumeAuditComplete: true,
      weeklyTips: true,
      productUpdates: true,
      marketingEmails: false
    },
    frequency: 'instant',
    pushNotifications: true
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: 'UserCircleIcon' },
    { id: 'security' as TabType, label: 'Security', icon: 'LockClosedIcon' },
    { id: 'subscription' as TabType, label: 'Subscription', icon: 'CreditCardIcon' },
    { id: 'notifications' as TabType, label: 'Notifications', icon: 'BellIcon' },
    { id: 'privacy' as TabType, label: 'Privacy', icon: 'ShieldCheckIcon' }
  ];

  const handleProfileSave = (data: ProfileData) => {
    console.log('Profile saved:', data);
  };

  const handlePasswordChange = (data: SecurityData) => {
    console.log('Password changed:', data);
  };

  const handleToggle2FA = (enabled: boolean) => {
    console.log('2FA toggled:', enabled);
  };

  const handleRevokeSession = (sessionId: string) => {
    console.log('Session revoked:', sessionId);
  };

  const handleCancelSubscription = () => {
    console.log('Subscription cancelled');
  };

  const handleNotificationsSave = (preferences: NotificationPreferences) => {
    console.log('Notifications saved:', preferences);
  };

  const handleExportData = () => {
    console.log('Data export initiated');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion initiated');
  };

  if (!isHydrated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface border border-border rounded-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account preferences and settings</p>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border overflow-x-auto">
          <div className="flex space-x-1 p-2 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <ProfileSection
              initialData={mockProfileData}
              onSave={handleProfileSave}
            />
          )}
          {activeTab === 'security' && (
            <SecuritySection
              onPasswordChange={handlePasswordChange}
              onToggle2FA={handleToggle2FA}
              onRevokeSession={handleRevokeSession}
            />
          )}
          {activeTab === 'subscription' && (
            <SubscriptionSection
              currentPlan="Starter"
              billingCycle="monthly"
              nextBillingDate="01/12/2025"
              usageStats={mockUsageStats}
              billingHistory={mockBillingHistory}
              onCancelSubscription={handleCancelSubscription}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsSection
              initialPreferences={mockNotificationPreferences}
              onSave={handleNotificationsSave}
            />
          )}
          {activeTab === 'privacy' && (
            <DataPrivacySection
              onExportData={handleExportData}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsInteractive;