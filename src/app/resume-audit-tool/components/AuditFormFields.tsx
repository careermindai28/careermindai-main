'use client';

import { ChangeEvent } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AuditFormFieldsProps {
  targetRole: string;
  companyName: string;
  region: string;
  jobType: string;
  onTargetRoleChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  errors: {
    targetRole: string;
    companyName: string;
  };
}

const AuditFormFields = ({
  targetRole,
  companyName,
  region,
  jobType,
  onTargetRoleChange,
  onCompanyNameChange,
  onRegionChange,
  onJobTypeChange,
  errors,
}: AuditFormFieldsProps) => {
  const regions = [
    { value: 'india', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'europe', label: 'Europe' },
    { value: 'middle-east', label: 'Middle East' },
    { value: 'asia-pacific', label: 'Asia-Pacific' },
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'internship', label: 'Internship' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="targetRole" className="block text-sm font-medium text-foreground">
          Target Role <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <input
            id="targetRole"
            type="text"
            value={targetRole}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onTargetRoleChange(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className={`w-full px-4 py-3 pl-11 rounded-lg border ${
              errors.targetRole ? 'border-destructive' : 'border-border'
            } bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150`}
          />
          <Icon
            name="BriefcaseIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
        {errors.targetRole && (
          <p className="text-sm text-destructive flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            <span>{errors.targetRole}</span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
          Company Name <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onCompanyNameChange(e.target.value)}
            placeholder="e.g., Google, Microsoft"
            className={`w-full px-4 py-3 pl-11 rounded-lg border ${
              errors.companyName ? 'border-destructive' : 'border-border'
            } bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150`}
          />
          <Icon
            name="BuildingOfficeIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
        {errors.companyName && (
          <p className="text-sm text-destructive flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            <span>{errors.companyName}</span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="region" className="block text-sm font-medium text-foreground">
          Target Region <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <select
            id="region"
            value={region}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onRegionChange(e.target.value)}
            className="w-full px-4 py-3 pl-11 pr-10 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 appearance-none cursor-pointer"
          >
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <Icon
            name="GlobeAltIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          />
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="jobType" className="block text-sm font-medium text-foreground">
          Job Type <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <select
            id="jobType"
            value={jobType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onJobTypeChange(e.target.value)}
            className="w-full px-4 py-3 pl-11 pr-10 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 appearance-none cursor-pointer"
          >
            {jobTypes.map((jt) => (
              <option key={jt.value} value={jt.value}>
                {jt.label}
              </option>
            ))}
          </select>
          <Icon
            name="ClockIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          />
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AuditFormFields;