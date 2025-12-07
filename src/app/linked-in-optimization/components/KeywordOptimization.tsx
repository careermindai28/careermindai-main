'use client';

import Icon from '@/components/ui/AppIcon';

interface KeywordSuggestion {
  keyword: string;
  relevance: 'high' | 'medium' | 'low';
  category: string;
}

interface KeywordOptimizationProps {
  suggestions: KeywordSuggestion[];
  currentKeywords: string[];
}

const KeywordOptimization = ({ suggestions, currentKeywords }: KeywordOptimizationProps) => {
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

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, KeywordSuggestion[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Keyword Optimization</h3>
        <p className="text-sm text-text-secondary">
          Enhance your profile discoverability with these industry-relevant keywords
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="MagnifyingGlassIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">Current Keywords Detected</p>
            <div className="flex flex-wrap gap-2">
              {currentKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSuggestions).map(([category, keywords]) => (
          <div key={category} className="border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="TagIcon" size={16} className="text-accent" />
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {keywords.map((suggestion, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-150 hover:scale-105 ${getRelevanceColor(
                    suggestion.relevance
                  )}`}
                >
                  {suggestion.keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">Optimization Tips</p>
            <ul className="space-y-1 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span>Incorporate high-relevance keywords naturally into your headline and summary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span>Use industry-specific terms that recruiters commonly search for</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span>Balance technical skills with soft skills for comprehensive profile optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordOptimization;