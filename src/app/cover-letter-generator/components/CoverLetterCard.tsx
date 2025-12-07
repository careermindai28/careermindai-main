'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CoverLetter {
  id: string;
  variant: string;
  content: string;
  approach: string;
}

interface CoverLetterCardProps {
  letter: CoverLetter;
  isSelected: boolean;
  onSelect: (letterId: string) => void;
  onEdit: (letterId: string) => void;
}

const CoverLetterCard = ({ letter, isSelected, onSelect, onEdit }: CoverLetterCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedContent = letter.content.substring(0, 300) + '...';

  return (
    <div
      className={`bg-surface border-2 rounded-lg p-6 transition-all duration-150 ${
        isSelected ? 'border-primary shadow-card' : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{letter.variant}</h3>
          <p className="text-sm text-text-secondary">{letter.approach}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(letter.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
            isSelected
              ? 'border-primary bg-primary' :'border-border hover:border-primary'
          }`}
        >
          {isSelected && <Icon name="CheckIcon" size={16} className="text-primary-foreground" />}
        </button>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-4">
        <p className="text-sm text-foreground whitespace-pre-line">
          {isExpanded ? letter.content : truncatedContent}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-150 flex items-center space-x-1"
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <Icon
            name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={16}
          />
        </button>

        <button
          type="button"
          onClick={() => onEdit(letter.id)}
          className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
        >
          <Icon name="PencilSquareIcon" size={16} />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default CoverLetterCard;