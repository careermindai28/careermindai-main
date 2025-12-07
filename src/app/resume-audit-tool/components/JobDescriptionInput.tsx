'use client';

import { ChangeEvent } from 'react';
import Icon from '@/components/ui/AppIcon';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string;
}

const JobDescriptionInput = ({ value, onChange, onFileSelect, selectedFile, error }: JobDescriptionInputProps) => {
  const maxLength = 5000;
  const currentLength = value.length;
  const percentage = (currentLength / maxLength) * 100;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (validTypes.includes(file.type)) {
        onFileSelect(file);
      } else {
        alert('Please upload a PDF, DOC, DOCX, or TXT file');
        e.target.value = '';
      }
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground">
          Job Description <span className="text-sm text-text-secondary font-normal">(optional)</span>
        </label>
        
        <textarea
          id="jobDescription"
          value={value}
          onChange={handleChange}
          placeholder="Paste the complete job description here including responsibilities, requirements, and qualifications..."
          className={`w-full h-48 px-4 py-3 rounded-lg border ${
            error ? 'border-destructive' : 'border-border'
          } bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-150`}
          aria-describedby={error ? 'jd-error' : 'jd-counter'}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-full max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  percentage > 90 ? 'bg-warning' : percentage > 70 ? 'bg-accent' : 'bg-primary'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <span
              id="jd-counter"
              className={`text-xs ${
                percentage > 90 ? 'text-warning' : 'text-text-secondary'
              }`}
            >
              {currentLength} / {maxLength}
            </span>
          </div>

          {error && (
            <p id="jd-error" className="text-sm text-destructive flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{error}</span>
            </p>
          )}
        </div>

        <p className="text-xs text-text-secondary flex items-start space-x-1">
          <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0 mt-0.5" />
          <span>
            Job description is optional but recommended for more tailored feedback
          </span>
        </p>
      </div>

      {/* File Upload Section */}
      <div className="space-y-2">
        <label htmlFor="jobDescriptionFile" className="block text-sm font-medium text-foreground">
          Upload Job Description (optional)
        </label>
        
        {!selectedFile ? (
          <div className="relative">
            <input
              type="file"
              id="jobDescriptionFile"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="jobDescriptionFile"
              className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer bg-surface hover:bg-muted transition-colors duration-150"
            >
              <Icon name="DocumentArrowUpIcon" size={32} className="text-text-secondary mb-2" />
              <span className="text-sm text-foreground font-medium mb-1">
                Click to upload job description
              </span>
              <span className="text-xs text-text-secondary">
                PDF, DOC, DOCX, or TXT (Max 10MB)
              </span>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="DocumentTextIcon" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-xs text-text-secondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-2 text-text-secondary hover:text-destructive transition-colors duration-150"
              aria-label="Remove file"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
        )}

        <p className="text-xs text-text-secondary flex items-start space-x-1">
          <Icon name="InformationCircleIcon" size={16} className="flex-shrink-0 mt-0.5" />
          <span>
            Upload a job description file as an alternative to pasting text. If both are provided, pasted text takes priority.
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescriptionInput;