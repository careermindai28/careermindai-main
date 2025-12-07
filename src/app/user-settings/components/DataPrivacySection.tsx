'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DataPrivacySectionProps {
  onExportData: () => void;
  onDeleteAccount: () => void;
}

const DataPrivacySection = ({ onExportData, onDeleteAccount }: DataPrivacySectionProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const privacyControls = [
    {
      title: 'Data Collection',
      description: 'We collect your resume data, job preferences, and usage analytics to improve our services.',
      status: 'Active'
    },
    {
      title: 'Third-Party Sharing',
      description: 'Your data is never shared with third parties without your explicit consent.',
      status: 'Disabled'
    },
    {
      title: 'Analytics Tracking',
      description: 'We use anonymized analytics to understand how you use our platform.',
      status: 'Active'
    },
    {
      title: 'Marketing Communications',
      description: 'Control whether we can send you promotional emails and offers.',
      status: 'Configurable'
    }
  ];

  const handleExportData = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onExportData();
    setIsExporting(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      onDeleteAccount();
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          {privacyControls.map((control, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{control.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{control.description}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ml-4 flex-shrink-0 ${
                  control.status === 'Active' ? 'bg-success/10 text-success' :
                  control.status === 'Disabled'? 'bg-muted text-text-secondary' : 'bg-primary/10 text-primary'
                }`}>
                  {control.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">GDPR Compliance</h3>
            <p className="text-sm text-text-secondary mb-4">
              We are fully compliant with GDPR regulations. You have the right to access, modify, and delete your personal data at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="ArrowDownTrayIcon" size={20} />
                    <span>Export My Data</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-destructive/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ExclamationTriangleIcon" size={24} className="text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Account</h3>
            <p className="text-sm text-text-secondary mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      <div className="bg-muted border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Data Retention Policy</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <span>Resume data is stored securely and encrypted at rest</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <span>Audit results are retained for 90 days after generation</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <span>Account data is permanently deleted within 30 days of account closure</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <span>Payment information is handled by secure third-party processors</span>
          </li>
        </ul>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
          <div className="bg-surface rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="ExclamationTriangleIcon" size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Delete Account</h3>
            </div>
            <p className="text-text-secondary mb-4">
              This action is permanent and cannot be undone. All your data, including resumes, audits, and account information will be permanently deleted.
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground mb-2">
                Type <span className="font-mono font-bold">DELETE</span> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive"
                placeholder="Type DELETE"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 bg-surface hover:bg-muted text-foreground border border-border px-4 py-2 rounded-lg font-medium transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPrivacySection;