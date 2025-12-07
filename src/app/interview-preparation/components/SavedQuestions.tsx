'use client';

import Icon from '@/components/ui/AppIcon';

interface SavedQuestion {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  savedDate: string;
}

interface SavedQuestionsProps {
  questions: SavedQuestion[];
  onRemove: (id: number) => void;
}

const SavedQuestions = ({ questions, onRemove }: SavedQuestionsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success bg-success/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Hard':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  if (questions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="BookmarkIcon" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Saved Questions</h3>
        <p className="text-sm text-text-secondary">
          Bookmark challenging questions during practice to review them later
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BookmarkIcon" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Saved Questions</h3>
        </div>
        <span className="text-sm text-text-secondary">{questions.length} saved</span>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-foreground font-medium mb-2">{question.question}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                    {question.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                  <span className="text-xs text-text-secondary">
                    Saved {question.savedDate}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemove(question.id)}
                className="ml-4 p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors duration-150"
                aria-label="Remove saved question"
              >
                <Icon name="TrashIcon" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuestions;