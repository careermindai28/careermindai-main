'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface HeadlineOption {
  id: string;
  headline: string;
  characterCount: number;
  rationale: string;
  keywords: string[];
}

interface HeadlineGeneratorProps {
  headlines: HeadlineOption[];
  onCopy: (headline: string) => void;
  onRegenerate: () => void;
}

const HeadlineGenerator = ({ headlines, onCopy, onRegenerate }: HeadlineGeneratorProps) => {
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (headline: HeadlineOption) => {
    onCopy(headline.headline);
    setCopiedId(headline.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Generated Headlines</h3>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
        >
          <Icon name="ArrowPathIcon" size={16} />
          Regenerate
        </button>
      </div>

      <div className="space-y-4">
        {headlines.map((headline) => (
          <div
            key={headline.id}
            className={`p-4 border rounded-lg transition-all duration-150 cursor-pointer ${
              selectedHeadline === headline.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedHeadline(headline.id)}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="flex-1 text-foreground font-medium">{headline.headline}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(headline);
                }}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors duration-150"
                title="Copy headline"
              >
                <Icon
                  name={copiedId === headline.id ? 'CheckIcon' : 'ClipboardDocumentIcon'}
                  size={20}
                  className={copiedId === headline.id ? 'text-success' : 'text-text-secondary'}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className={`text-xs font-medium ${
                headline.characterCount <= 220 ? 'text-success' : 'text-warning'
              }`}>
                {headline.characterCount}/220 characters
              </span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    headline.characterCount <= 220 ? 'bg-success' : 'bg-warning'
                  }`}
                  style={{ width: `${Math.min((headline.characterCount / 220) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-text-secondary">{headline.rationale}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {headline.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadlineGenerator;