'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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

interface ProfileSectionProps {
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}

const ProfileSection = ({ initialData, onSave }: ProfileSectionProps) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});

  const careerLevels = [
    'Student/Fresher',
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Lead/Manager (10+ years)',
    'Executive/Director'
  ];

  const industries = [
    'Technology/IT',
    'Finance/Banking',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail/E-commerce',
    'Consulting',
    'Marketing/Advertising',
    'Real Estate',
    'Hospitality'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (formData.linkedInUrl && !formData.linkedInUrl.includes('linkedin.com')) {
      newErrors.linkedInUrl = 'Invalid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      targetIndustries: prev.targetIndustries.includes(industry)
        ? prev.targetIndustries.filter(i => i !== industry)
        : [...prev.targetIndustries, industry]
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(formData);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg flex items-center space-x-2">
          <Icon name="CheckCircleIcon" size={20} className="flex-shrink-0" />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.fullName ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-destructive' : 'border-border'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? 'border-destructive' : 'border-border'
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Mumbai, Maharashtra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Career Level
          </label>
          <select
            value={formData.careerLevel}
            onChange={(e) => handleInputChange('careerLevel', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select career level</option>
            {careerLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedInUrl}
            onChange={(e) => handleInputChange('linkedInUrl', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.linkedInUrl ? 'border-destructive' : 'border-border'
            }`}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedInUrl && (
            <p className="text-destructive text-sm mt-1">{errors.linkedInUrl}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Portfolio/Website
          </label>
          <input
            type="url"
            value={formData.portfolioUrl}
            onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Target Industries
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => handleIndustryToggle(industry)}
              className={`px-4 py-2 rounded-lg border transition-all duration-150 text-sm font-medium ${
                formData.targetIndustries.includes(industry)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface text-text-secondary border-border hover:border-primary'
              }`}
            >
              {industry}
            </button>
          ))}
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
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;