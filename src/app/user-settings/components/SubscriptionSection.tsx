'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

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

interface SubscriptionSectionProps {
  currentPlan: string;
  billingCycle: string;
  nextBillingDate: string;
  usageStats: UsageStats;
  billingHistory: BillingHistory[];
  onCancelSubscription: () => void;
}

const SubscriptionSection = ({
  currentPlan,
  billingCycle,
  nextBillingDate,
  usageStats,
  billingHistory,
  onCancelSubscription
}: SubscriptionSectionProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0;
    return (used / limit) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const handleCancelConfirm = () => {
    onCancelSubscription();
    setShowCancelModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{currentPlan} Plan</h3>
            <p className="text-text-secondary mt-1">
              Billed {billingCycle} • Next billing: {nextBillingDate}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing-plans"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium text-center transition-all duration-150"
            >
              Upgrade Plan
            </Link>
            {currentPlan !== 'Free' && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="bg-surface hover:bg-muted text-foreground border border-border px-6 py-2 rounded-lg font-medium transition-all duration-150"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Usage Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Resume Audits</span>
              <span className="text-sm text-text-secondary">
                {usageStats.resumeAudits.used} / {usageStats.resumeAudits.limit === -1 ? '∞' : usageStats.resumeAudits.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getUsagePercentage(usageStats.resumeAudits.used, usageStats.resumeAudits.limit), 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Resume Builds</span>
              <span className="text-sm text-text-secondary">
                {usageStats.resumeBuilds.used} / {usageStats.resumeBuilds.limit === -1 ? '∞' : usageStats.resumeBuilds.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getUsagePercentage(usageStats.resumeBuilds.used, usageStats.resumeBuilds.limit), 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Cover Letters</span>
              <span className="text-sm text-text-secondary">
                {usageStats.coverLetters.used} / {usageStats.coverLetters.limit === -1 ? '∞' : usageStats.coverLetters.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getUsagePercentage(usageStats.coverLetters.used, usageStats.coverLetters.limit), 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Interview Prep Sessions</span>
              <span className="text-sm text-text-secondary">
                {usageStats.interviewPrep.used} / {usageStats.interviewPrep.limit === -1 ? '∞' : usageStats.interviewPrep.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(getUsagePercentage(usageStats.interviewPrep.used, usageStats.interviewPrep.limit), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map(record => (
                <tr key={record.id} className="border-b border-border last:border-0">
                  <td className="py-3 px-4 text-sm text-text-secondary">{record.date}</td>
                  <td className="py-3 px-4 text-sm text-foreground font-medium">{record.plan}</td>
                  <td className="py-3 px-4 text-sm text-foreground font-medium">{record.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1 ml-auto">
                      <Icon name="ArrowDownTrayIcon" size={16} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
          <div className="bg-surface rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="ExclamationTriangleIcon" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cancel Subscription</h3>
            </div>
            <p className="text-text-secondary mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-surface hover:bg-muted text-foreground border border-border px-4 py-2 rounded-lg font-medium transition-all duration-150"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg font-medium transition-all duration-150"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;