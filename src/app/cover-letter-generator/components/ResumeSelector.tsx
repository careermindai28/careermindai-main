'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Resume {
  id: string;
  name: string;
  lastModified: string;
  role: string;
}

interface ResumeSelectorProps {
  selectedResume: string;
  onResumeSelect: (resumeId: string) => void;
}

const ResumeSelector = ({ selectedResume, onResumeSelect }: ResumeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const mockResumes: Resume[] = [
    {
      id: 'resume-1',
      name: 'Software Engineer Resume',
      lastModified: '2025-11-28',
      role: 'Software Engineer',
    },
    {
      id: 'resume-2',
      name: 'Product Manager Resume',
      lastModified: '2025-11-25',
      role: 'Product Manager',
    },
    {
      id: 'resume-3',
      name: 'Data Analyst Resume',
      lastModified: '2025-11-20',
      role: 'Data Analyst',
    },
  ];

  const selectedResumeData = mockResumes.find((r) => r.id === selectedResume);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">
        Select Resume <span className="text-error">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-input rounded-lg hover:border-ring transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <div className="flex items-center space-x-3">
          <Icon name="DocumentTextIcon" size={20} className="text-text-secondary" />
          <div className="text-left">
            {selectedResumeData ? (
              <>
                <p className="text-sm font-medium text-foreground">{selectedResumeData.name}</p>
                <p className="text-xs text-text-secondary">{selectedResumeData.role}</p>
              </>
            ) : (
              <p className="text-sm text-text-secondary">Choose a resume to use</p>
            )}
          </div>
        </div>
        <Icon
          name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={20}
          className="text-text-secondary"
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-surface border border-border rounded-lg shadow-modal max-h-64 overflow-y-auto">
          {mockResumes.map((resume) => (
            <button
              key={resume.id}
              type="button"
              onClick={() => {
                onResumeSelect(resume.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-colors duration-150 ${
                selectedResume === resume.id ? 'bg-muted' : ''
              }`}
            >
              <Icon
                name="DocumentTextIcon"
                size={20}
                className={selectedResume === resume.id ? 'text-primary' : 'text-text-secondary'}
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{resume.name}</p>
                <p className="text-xs text-text-secondary">
                  {resume.role} • Updated {resume.lastModified}
                </p>
              </div>
              {selectedResume === resume.id && (
                <Icon name="CheckIcon" size={20} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeSelector;