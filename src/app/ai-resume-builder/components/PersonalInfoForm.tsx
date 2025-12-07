'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onAIEnhance: (field: string) => void;
}

const PersonalInfoForm = ({ data, onUpdate, onAIEnhance }: PersonalInfoFormProps) => {
  const [localData, setLocalData] = useState<PersonalInfo>(data);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        <Icon name="UserCircleIcon" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={localData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            value={localData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Location <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={localData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Mumbai, Maharashtra"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">LinkedIn Profile</label>
          <input
            type="url"
            value={localData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">Portfolio/Website</label>
          <input
            type="url"
            value={localData.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="https://johndoe.com"
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-foreground">
              Professional Summary <span className="text-destructive">*</span>
            </label>
            <button
              onClick={() => onAIEnhance('summary')}
              className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Icon name="SparklesIcon" size={14} />
              <span>AI Enhance</span>
            </button>
          </div>
          <textarea
            value={localData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Write a compelling professional summary highlighting your key achievements and career goals..."
            rows={4}
            className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground resize-none"
          />
          <p className="text-xs text-text-secondary mt-1">
            {localData.summary.length}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;