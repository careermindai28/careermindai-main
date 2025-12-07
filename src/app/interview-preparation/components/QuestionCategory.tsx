'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Question {
  id: number;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  framework?: string;
}

interface QuestionCategoryProps {
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  categoryType: 'hr' | 'technical' | 'star';
}

const QuestionCategory = ({ title, description, icon, questions, categoryType }: QuestionCategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors duration-150"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name={icon as any} size={24} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-text-secondary">
            {questions.length} Questions
          </span>
          <Icon
            name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={20}
            className="text-text-secondary"
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-6 space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-150"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">{question.question}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      {question.framework && (
                        <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                          {question.framework}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedQuestion(selectedQuestion?.id === question.id ? null : question)}
                    className="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150 text-sm font-medium"
                  >
                    {selectedQuestion?.id === question.id ? 'Hide' : 'Practice'}
                  </button>
                </div>

                {selectedQuestion?.id === question.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Answer Framework:</h4>
                      {categoryType === 'star' ? (
                        <div className="space-y-2 text-sm text-text-secondary">
                          <p><strong className="text-foreground">Situation:</strong> Describe the context and background</p>
                          <p><strong className="text-foreground">Task:</strong> Explain your responsibility or challenge</p>
                          <p><strong className="text-foreground">Action:</strong> Detail the steps you took</p>
                          <p><strong className="text-foreground">Result:</strong> Share the outcome and impact</p>
                        </div>
                      ) : (
                        <ul className="space-y-1 text-sm text-text-secondary list-disc list-inside">
                          <li>Start with a brief overview of your experience</li>
                          <li>Provide specific examples with measurable results</li>
                          <li>Connect your answer to the role requirements</li>
                          <li>Keep response concise (2-3 minutes)</li>
                        </ul>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-150 text-sm font-medium">
                        <Icon name="MicrophoneIcon" size={16} />
                        <span>Record Answer</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-150 text-sm font-medium text-foreground">
                        <Icon name="BookmarkIcon" size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCategory;