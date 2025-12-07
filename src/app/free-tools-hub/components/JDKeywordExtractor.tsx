'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Keyword {
  text: string;
  frequency: number;
  relevance: 'high' | 'medium' | 'low';
  context: string;
}

interface JDKeywordExtractorProps {
  className?: string;
}

const JDKeywordExtractor = ({ className = '' }: JDKeywordExtractorProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);

  const mockKeywords: Keyword[] = [
    { text: 'React', frequency: 12, relevance: 'high', context: 'Core frontend framework requirement for building user interfaces' },
    { text: 'TypeScript', frequency: 10, relevance: 'high', context: 'Essential for type-safe development and code quality' },
    { text: 'Next.js', frequency: 8, relevance: 'high', context: 'Primary framework for server-side rendering and routing' },
    { text: 'API Integration', frequency: 7, relevance: 'high', context: 'Critical skill for connecting frontend with backend services' },
    { text: 'Team Collaboration', frequency: 6, relevance: 'medium', context: 'Important soft skill for working in agile environments' },
    { text: 'Problem Solving', frequency: 5, relevance: 'medium', context: 'Key competency for debugging and optimization tasks' },
    { text: 'Git', frequency: 5, relevance: 'medium', context: 'Version control system for code management' },
    { text: 'Agile', frequency: 4, relevance: 'medium', context: 'Development methodology preference' },
    { text: 'Testing', frequency: 4, relevance: 'medium', context: 'Quality assurance and unit testing practices' },
    { text: 'Communication', frequency: 3, relevance: 'low', context: 'General workplace skill for stakeholder interaction' },
    { text: 'Documentation', frequency: 3, relevance: 'low', context: 'Ability to write clear technical documentation' },
    { text: 'CSS', frequency: 3, relevance: 'low', context: 'Styling and layout implementation' },
  ];

  const handleExtract = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setSelectedKeyword(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setKeywords(mockKeywords);
    setIsAnalyzing(false);
    setHasAnalyzed(true);
  };

  const handleClear = () => {
    setJobDescription('');
    setKeywords([]);
    setHasAnalyzed(false);
    setSelectedKeyword(null);
  };

  const handleExport = () => {
    const exportData = keywords.map(k => `${k.text} (${k.frequency}x, ${k.relevance} relevance)`).join('\n');
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jd-keywords.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-muted text-text-secondary border-border';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getFontSize = (frequency: number) => {
    if (frequency >= 10) return 'text-2xl';
    if (frequency >= 7) return 'text-xl';
    if (frequency >= 5) return 'text-lg';
    return 'text-base';
  };

  return (
    <div className={`bg-surface rounded-xl border border-border shadow-card p-6 ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">JD Keyword Extractor</h2>
          <p className="text-text-secondary">Analyze job descriptions to identify key skills and requirements</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="UsersIcon" size={16} />
          <span>2,847 analyses today</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="jd-input" className="block text-sm font-medium text-foreground mb-2">
            Paste Job Description
          </label>
          <textarea
            id="jd-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here. Include responsibilities, requirements, and qualifications for best results..."
            className="w-full h-48 px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            disabled={isAnalyzing}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-text-secondary">
              {jobDescription.length} characters
            </p>
            {jobDescription.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs text-text-secondary hover:text-foreground transition-colors duration-150"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleExtract}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-150 shadow-card hover:shadow-elevation disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Icon name="MagnifyingGlassIcon" size={20} />
              <span>Extract Keywords</span>
            </>
          )}
        </button>
      </div>

      {hasAnalyzed && keywords.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Extracted Keywords</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedKeyword(keyword)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-150 hover:scale-105 ${getFontSize(keyword.frequency)} ${getRelevanceColor(keyword.relevance)} ${
                    selectedKeyword?.text === keyword.text ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {keyword.text}
                  <span className="ml-2 text-xs opacity-70">×{keyword.frequency}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedKeyword && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{selectedKeyword.text}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${getRelevanceColor(selectedKeyword.relevance)}`}>
                    {selectedKeyword.relevance} relevance
                  </span>
                </div>
                <button
                  onClick={() => setSelectedKeyword(null)}
                  className="text-text-secondary hover:text-foreground transition-colors duration-150"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              </div>
              <p className="text-sm text-text-secondary">{selectedKeyword.context}</p>
              <p className="text-xs text-text-secondary mt-2">Appears {selectedKeyword.frequency} times in the job description</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="CheckCircleIcon" size={20} className="text-success" />
                <span className="text-sm font-medium text-foreground">High Priority</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{keywords.filter(k => k.relevance === 'high').length}</p>
            </div>
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Medium Priority</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{keywords.filter(k => k.relevance === 'medium').length}</p>
            </div>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="InformationCircleIcon" size={20} className="text-text-secondary" />
                <span className="text-sm font-medium text-foreground">Low Priority</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{keywords.filter(k => k.relevance === 'low').length}</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="LightBulbIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
                <p className="text-sm text-text-secondary">
                  Include these high-priority keywords naturally in your resume to improve ATS compatibility. Our Premium Resume Builder can help you optimize keyword placement automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JDKeywordExtractor;