'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface EditModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  onSave: (content: string) => void;
}

const EditModal = ({ isOpen, content, onClose, onSave }: EditModalProps) => {
  const [editedContent, setEditedContent] = useState(content);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const suggestions = [
    'Consider adding specific metrics to quantify your achievements',
    'Emphasize how your skills align with the company\'s mission',
    'Include a call-to-action in your closing paragraph',
  ];

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      <div className="relative bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Edit Cover Letter</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} className="text-text-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-96 p-4 bg-muted border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Edit your cover letter content..."
          />

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-150"
            >
              <Icon name="LightBulbIcon" size={20} />
              <span>AI Suggestions</span>
              <Icon
                name={showSuggestions ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                size={16}
              />
            </button>

            {showSuggestions && (
              <div className="mt-3 space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-3 bg-accent/10 border border-accent/20 rounded-lg"
                  >
                    <Icon name="SparklesIcon" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-border text-text-secondary hover:bg-muted transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 shadow-card"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;