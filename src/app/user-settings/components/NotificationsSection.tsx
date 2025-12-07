'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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

interface NotificationsSectionProps {
  initialPreferences: NotificationPreferences;
  onSave: (preferences: NotificationPreferences) => void;
}

const NotificationsSection = ({ initialPreferences, onSave }: NotificationsSectionProps) => {
  const [preferences, setPreferences] = useState<NotificationPreferences>(initialPreferences);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = (category: keyof NotificationPreferences['emailNotifications']) => {
    setPreferences(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [category]: !prev.emailNotifications[category]
      }
    }));
  };

  const handleFrequencyChange = (frequency: NotificationPreferences['frequency']) => {
    setPreferences(prev => ({ ...prev, frequency }));
  };

  const handlePushToggle = () => {
    setPreferences(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(preferences);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const notificationOptions = [
    {
      key: 'resumeAuditComplete' as const,
      title: 'Resume Audit Complete',
      description: 'Get notified when your resume audit is ready'
    },
    {
      key: 'weeklyTips' as const,
      title: 'Weekly Career Tips',
      description: 'Receive curated career advice and job search strategies'
    },
    {
      key: 'productUpdates' as const,
      title: 'Product Updates',
      description: 'Stay informed about new features and improvements'
    },
    {
      key: 'marketingEmails' as const,
      title: 'Marketing Communications',
      description: 'Promotional offers and special announcements'
    }
  ];

  return (
    <div className="space-y-8">
      {showSuccess && (
        <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg flex items-center space-x-2">
          <Icon name="CheckCircleIcon" size={20} className="flex-shrink-0" />
          <span className="font-medium">Notification preferences updated successfully!</span>
        </div>
      )}

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {notificationOptions.map(option => (
            <div key={option.key} className="flex items-start justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="font-medium text-foreground">{option.title}</p>
                <p className="text-sm text-text-secondary mt-1">{option.description}</p>
              </div>
              <button
                onClick={() => handleToggle(option.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 flex-shrink-0 ${
                  preferences.emailNotifications[option.key] ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications[option.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Frequency</h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose how often you want to receive email notifications
        </p>
        <div className="space-y-3">
          {[
            { value: 'instant' as const, label: 'Instant', description: 'Receive notifications as they happen' },
            { value: 'daily' as const, label: 'Daily Digest', description: 'Get a summary once per day' },
            { value: 'weekly' as const, label: 'Weekly Digest', description: 'Get a summary once per week' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleFrequencyChange(option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-150 ${
                preferences.frequency === option.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  preferences.frequency === option.value
                    ? 'border-primary' :'border-border'
                }`}>
                  {preferences.frequency === option.value && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Push Notifications</h3>
            <p className="text-sm text-text-secondary mt-1">
              Receive browser notifications for important updates
            </p>
          </div>
          <button
            onClick={handlePushToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 flex-shrink-0 ${
              preferences.pushNotifications ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Icon name="CheckIcon" size={20} />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationsSection;