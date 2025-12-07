'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface InterviewInputFormProps {
  onGenerate: (data: FormData) => void;
}

interface FormData {
  targetRole: string;
  company: string;
  experienceLevel: string;
  industry: string;
}

const InterviewInputForm = ({ onGenerate }: InterviewInputFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    targetRole: '',
    company: '',
    experienceLevel: '',
    industry: '',
  });

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Lead/Manager (10+ years)',
  ];

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'E-commerce',
    'Consulting',
    'Manufacturing',
    'Education',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.targetRole && formData.experienceLevel) {
      onGenerate(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Interview Configuration</h2>
          <p className="text-sm text-text-secondary">Customize questions based on your target role</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetRole" className="block text-sm font-medium text-foreground mb-2">
            Target Role <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="targetRole"
            value={formData.targetRole}
            onChange={(e) => handleChange('targetRole', e.target.value)}
            placeholder="e.g., Senior Software Engineer, Product Manager"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Target Company (Optional)
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="e.g., Google, Amazon, Startup"
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-foreground mb-2">
              Experience Level <span className="text-error">*</span>
            </label>
            <select
              id="experienceLevel"
              value={formData.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
              required
            >
              <option value="">Select level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
              Industry
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-surface text-foreground"
            >
              <option value="">Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-150 font-medium flex items-center justify-center space-x-2"
        >
          <Icon name="SparklesIcon" size={20} />
          <span>Generate Interview Questions</span>
        </button>
      </form>
    </div>
  );
};

export default InterviewInputForm;