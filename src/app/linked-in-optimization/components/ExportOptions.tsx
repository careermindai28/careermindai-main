'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ExportOptionsProps {
  headline: string;
  summary: string;
  onExport: (format: 'text' | 'pdf') => void;
}

const ExportOptions = ({ headline, summary, onExport }: ExportOptionsProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopyAll = () => {
    const content = `LinkedIn Headline:\n${headline}\n\nLinkedIn Summary:\n${summary}`;
    navigator.clipboard.writeText(content);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExport = (format: 'text' | 'pdf') => {
    onExport(format);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Export Options</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleCopyAll}
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
        >
          <Icon
            name="ClipboardDocumentIcon"
            size={24}
            className="text-text-secondary group-hover:text-primary transition-colors duration-150"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Copy to Clipboard</p>
            <p className="text-xs text-text-secondary">Copy all content</p>
          </div>
        </button>

        <button
          onClick={() => handleExport('text')}
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
        >
          <Icon
            name="DocumentTextIcon"
            size={24}
            className="text-text-secondary group-hover:text-primary transition-colors duration-150"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Export as Text</p>
            <p className="text-xs text-text-secondary">Download .txt file</p>
          </div>
        </button>

        <button
          onClick={() => handleExport('pdf')}
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
        >
          <Icon
            name="DocumentArrowDownIcon"
            size={24}
            className="text-text-secondary group-hover:text-primary transition-colors duration-150"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Export as PDF</p>
            <p className="text-xs text-text-secondary">Download .pdf file</p>
          </div>
        </button>

        <button
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
        >
          <Icon
            name="ShareIcon"
            size={24}
            className="text-text-secondary group-hover:text-primary transition-colors duration-150"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Share Link</p>
            <p className="text-xs text-text-secondary">Generate share URL</p>
          </div>
        </button>
      </div>

      {showSuccess && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0" />
            <p className="text-sm text-success font-medium">Content exported successfully!</p>
          </div>
        </div>
      )}

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-1">Implementation Guide</p>
            <ol className="space-y-1 text-xs text-text-secondary list-decimal list-inside">
              <li>Copy your optimized headline and summary</li>
              <li>Log in to your LinkedIn profile</li>
              <li>Click &quot;Edit&quot; on your profile section</li>
              <li>Paste the content and save changes</li>
              <li>Review how it appears on your profile</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;