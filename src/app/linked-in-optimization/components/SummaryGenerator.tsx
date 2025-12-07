'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SummaryOption {
  id: string;
  title: string;
  content: string;
  tone: string;
  wordCount: number;
  approach: string;
}

interface SummaryGeneratorProps {
  summaries: SummaryOption[];
  onCopy: (summary: string) => void;
  onRegenerate: () => void;
}

const SummaryGenerator = ({ summaries, onCopy, onRegenerate }: SummaryGeneratorProps) => {
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(summaries[0]?.id || null);

  const handleCopy = (summary: SummaryOption) => {
    onCopy(summary.content);
    setCopiedId(summary.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Generated Summaries</h3>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
        >
          <Icon name="ArrowPathIcon" size={16} />
          Regenerate
        </button>
      </div>

      <div className="space-y-4">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className={`border rounded-lg transition-all duration-150 ${
              selectedSummary === summary.id
                ? 'border-primary bg-primary/5' :'border-border'
            }`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => setSelectedSummary(summary.id)}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{summary.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Icon name="ChatBubbleLeftIcon" size={14} />
                      {summary.tone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="DocumentTextIcon" size={14} />
                      {summary.wordCount} words
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(summary);
                    }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
                    title="Copy summary"
                  >
                    <Icon
                      name={copiedId === summary.id ? 'CheckIcon' : 'ClipboardDocumentIcon'}
                      size={20}
                      className={copiedId === summary.id ? 'text-success' : 'text-text-secondary'}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(summary.id);
                    }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
                  >
                    <Icon
                      name={expandedId === summary.id ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={20}
                      className="text-text-secondary"
                    />
                  </button>
                </div>
              </div>

              {expandedId === summary.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                      {summary.content}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="LightBulbIcon" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-text-secondary">{summary.approach}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryGenerator;