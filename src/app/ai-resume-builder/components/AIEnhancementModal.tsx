'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AIEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (suggestion: string) => void;
  originalText: string;
  fieldType: string;
}

const AIEnhancementModal = ({
  isOpen,
  onClose,
  onApply,
  originalText,
  fieldType,
}: AIEnhancementModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      generateSuggestions();
    }
  }, [isOpen]);

  const generateSuggestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockSuggestions = [
        `Enhanced version: ${originalText} with quantified achievements and action verbs for better ATS optimization`,
        `Improved clarity: ${originalText} restructured for maximum impact and keyword density`,
        `Professional tone: ${originalText} refined with industry-standard terminology and measurable results`,
      ];
      setSuggestions(mockSuggestions);
      setSelectedSuggestion(mockSuggestions[0]);
      setIsLoading(false);
    }, 1500);
  };

  const handleApply = () => {
    if (selectedSuggestion) {
      onApply(selectedSuggestion);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="SparklesIcon" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">AI Enhancement</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="XMarkIcon" size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Original Text</h3>
            <div className="p-4 bg-muted rounded-lg text-sm text-foreground">
              {originalText || 'No text provided'}
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <Icon
                  name="SparklesIcon"
                  size={24}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary"
                />
              </div>
              <p className="text-text-secondary">Generating AI suggestions...</p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">AI Suggestions</h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <label
                    key={index}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSuggestion === suggestion
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="suggestion"
                        checked={selectedSuggestion === suggestion}
                        onChange={() => setSelectedSuggestion(suggestion)}
                        className="mt-1 w-4 h-4 text-primary border-input focus:ring-2 focus:ring-ring"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{suggestion}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={isLoading || !selectedSuggestion}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Icon name="CheckIcon" size={16} />
            <span>Apply Suggestion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIEnhancementModal;