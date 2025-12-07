'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

interface SecuritySectionProps {
  onPasswordChange: (data: SecurityData) => void;
  onToggle2FA: (enabled: boolean) => void;
  onRevokeSession: (sessionId: string) => void;
}

const SecuritySection = ({ onPasswordChange, onToggle2FA, onRevokeSession }: SecuritySectionProps) => {
  const [passwordData, setPasswordData] = useState<SecurityData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SecurityData, string>>>({});

  const mockSessions: LoginSession[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Mumbai, Maharashtra',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Mumbai, Maharashtra',
      lastActive: '3 hours ago',
      current: false
    },
    {
      id: '3',
      device: 'Firefox on MacOS',
      location: 'Bangalore, Karnataka',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const validatePassword = (): boolean => {
    const newErrors: Partial<Record<keyof SecurityData, string>> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePassword()) return;

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onPasswordChange(passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: passwordData.twoFactorEnabled
    });
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggle2FA = () => {
    const newValue = !passwordData.twoFactorEnabled;
    setPasswordData(prev => ({ ...prev, twoFactorEnabled: newValue }));
    onToggle2FA(newValue);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-8">
      {showSuccess && (
        <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg flex items-center space-x-2">
          <Icon name="CheckCircleIcon" size={20} className="flex-shrink-0" />
          <span className="font-medium">Password updated successfully!</span>
        </div>
      )}

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.currentPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              >
                <Icon name={showPasswords.current ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-destructive text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.newPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              >
                <Icon name={showPasswords.new ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.confirmPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              >
                <Icon name={showPasswords.confirm ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-text-secondary mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              passwordData.twoFactorEnabled ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                passwordData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {passwordData.twoFactorEnabled && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-foreground">
              Two-factor authentication is enabled. You'll need to enter a verification code from your authenticator app when signing in.
            </p>
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {mockSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="ComputerDesktopIcon" size={24} className="text-text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground flex items-center space-x-2">
                    <span>{session.device}</span>
                    {session.current && (
                      <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded">Current</span>
                    )}
                  </p>
                  <p className="text-sm text-text-secondary">{session.location}</p>
                  <p className="text-xs text-text-secondary mt-1">Last active: {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => onRevokeSession(session.id)}
                  className="text-destructive hover:text-destructive/80 text-sm font-medium"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;