'use client';

import { useState, useEffect } from 'react';
import QuestionCategory from './QuestionCategory';
import InterviewInputForm from './InterviewInputForm';
import ProgressTracker from './ProgressTracker';
import PracticeTimer from './PracticeTimer';
import SavedQuestions from './SavedQuestions';
import Icon from '@/components/ui/AppIcon';

interface Question {
  id: number;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  framework?: string;
}

interface FormData {
  targetRole: string;
  company: string;
  experienceLevel: string;
  industry: string;
}

interface SavedQuestion {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  savedDate: string;
}

interface CategoryProgress {
  category: string;
  completed: number;
  total: number;
  icon: string;
}

const InterviewPreparationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'questions' | 'practice' | 'saved'>('questions');
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([
    {
      id: 1,
      question: "Tell me about a time when you had to handle a difficult stakeholder",
      category: "HR/Behavioral",
      difficulty: "Medium",
      savedDate: "2 days ago"
    },
    {
      id: 2,
      question: "Explain the difference between REST and GraphQL APIs",
      category: "Technical",
      difficulty: "Hard",
      savedDate: "1 week ago"
    }
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const hrQuestions: Question[] = [
    {
      id: 1,
      question: "Tell me about yourself and your career journey so far",
      difficulty: "Easy",
      category: "HR/Behavioral"
    },
    {
      id: 2,
      question: "Why do you want to work for our company?",
      difficulty: "Easy",
      category: "HR/Behavioral"
    },
    {
      id: 3,
      question: "Describe a time when you faced a significant challenge at work and how you overcame it",
      difficulty: "Medium",
      category: "HR/Behavioral"
    },
    {
      id: 4,
      question: "How do you handle conflicts with team members?",
      difficulty: "Medium",
      category: "HR/Behavioral"
    },
    {
      id: 5,
      question: "What are your salary expectations and how did you arrive at this figure?",
      difficulty: "Hard",
      category: "HR/Behavioral"
    }
  ];

  const technicalQuestions: Question[] = [
    {
      id: 6,
      question: "Explain the concept of microservices architecture and its advantages",
      difficulty: "Medium",
      category: "Technical"
    },
    {
      id: 7,
      question: "How would you optimize a slow-performing database query?",
      difficulty: "Hard",
      category: "Technical"
    },
    {
      id: 8,
      question: "What is your approach to writing unit tests and ensuring code quality?",
      difficulty: "Medium",
      category: "Technical"
    },
    {
      id: 9,
      question: "Describe the differences between SQL and NoSQL databases with use cases",
      difficulty: "Medium",
      category: "Technical"
    },
    {
      id: 10,
      question: "How do you ensure security in web applications?",
      difficulty: "Hard",
      category: "Technical"
    }
  ];

  const starQuestions: Question[] = [
    {
      id: 11,
      question: "Describe a situation where you had to lead a team through a critical project deadline",
      difficulty: "Medium",
      category: "STAR Method",
      framework: "Leadership"
    },
    {
      id: 12,
      question: "Tell me about a time when you had to learn a new technology quickly to complete a project",
      difficulty: "Medium",
      category: "STAR Method",
      framework: "Adaptability"
    },
    {
      id: 13,
      question: "Share an example of when you identified and solved a major problem that others overlooked",
      difficulty: "Hard",
      category: "STAR Method",
      framework: "Problem Solving"
    },
    {
      id: 14,
      question: "Describe a situation where you had to influence stakeholders without direct authority",
      difficulty: "Hard",
      category: "STAR Method",
      framework: "Influence"
    },
    {
      id: 15,
      question: "Tell me about a time when you received critical feedback and how you responded",
      difficulty: "Medium",
      category: "STAR Method",
      framework: "Growth Mindset"
    }
  ];

  const progressData: CategoryProgress[] = [
    {
      category: "HR/Behavioral",
      completed: 3,
      total: hrQuestions.length,
      icon: "UserGroupIcon"
    },
    {
      category: "Technical",
      completed: 2,
      total: technicalQuestions.length,
      icon: "CodeBracketIcon"
    },
    {
      category: "STAR Method",
      completed: 1,
      total: starQuestions.length,
      icon: "StarIcon"
    }
  ];

  const handleGenerate = (formData: FormData) => {
    setIsGenerating(true);
    console.log('Generating questions for:', formData);
    
    setTimeout(() => {
      setIsGenerating(false);
      setQuestionsGenerated(true);
    }, 2000);
  };

  const handleRemoveSaved = (id: number) => {
    setSavedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleExport = () => {
    console.log('Exporting interview questions...');
    alert('Questions exported successfully! Check your downloads folder.');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Interview Preparation</h1>
          <p className="text-text-secondary">Practice with AI-generated questions tailored to your target role</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-150 text-sm font-medium text-foreground"
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
          <span>Export Questions</span>
        </button>
      </div>

      <div className="lg:hidden flex space-x-2 border-b border-border">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
            activeTab === 'questions' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Questions
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
            activeTab === 'practice' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
            activeTab === 'saved' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Saved
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 space-y-6 ${activeTab !== 'questions' ? 'hidden lg:block' : ''}`}>
          {!questionsGenerated ? (
            <InterviewInputForm onGenerate={handleGenerate} />
          ) : (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start space-x-3">
              <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Questions Generated Successfully</p>
                <p className="text-xs text-text-secondary mt-1">
                  Practice with the questions below. Click on any question to see answer frameworks and start practicing.
                </p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-foreground font-medium">Generating personalized questions...</p>
              <p className="text-sm text-text-secondary mt-2">This may take a few seconds</p>
            </div>
          )}

          {!isGenerating && (
            <div className="space-y-4">
              <QuestionCategory
                title="HR & Behavioral Questions"
                description="Common questions about your background, motivation, and soft skills"
                icon="UserGroupIcon"
                questions={hrQuestions}
                categoryType="hr"
              />

              <QuestionCategory
                title="Role-Specific Technical Questions"
                description="Technical questions tailored to your target role and industry"
                icon="CodeBracketIcon"
                questions={technicalQuestions}
                categoryType="technical"
              />

              <QuestionCategory
                title="STAR Method Scenarios"
                description="Behavioral questions requiring structured Situation-Task-Action-Result responses"
                icon="StarIcon"
                questions={starQuestions}
                categoryType="star"
              />
            </div>
          )}
        </div>

        <div className={`space-y-6 ${activeTab === 'questions' ? 'hidden lg:block' : activeTab === 'practice' ? 'block lg:block' : 'hidden'}`}>
          <PracticeTimer />
          <ProgressTracker progress={progressData} />
        </div>

        <div className={`lg:col-span-3 ${activeTab !== 'saved' ? 'hidden lg:block' : ''}`}>
          <SavedQuestions questions={savedQuestions} onRemove={handleRemoveSaved} />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Interview Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Research the Company</p>
                <p className="text-xs text-text-secondary">Understand their products, culture, and recent news</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Prepare Specific Examples</p>
                <p className="text-xs text-text-secondary">Have 5-7 stories ready that demonstrate key skills</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Practice Out Loud</p>
                <p className="text-xs text-text-secondary">Rehearse answers verbally to build confidence</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="XCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Avoid Generic Answers</p>
                <p className="text-xs text-text-secondary">Don't use clichés or memorized responses</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="XCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Don't Ramble</p>
                <p className="text-xs text-text-secondary">Keep answers concise and focused (2-3 minutes max)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="XCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Never Badmouth Previous Employers</p>
                <p className="text-xs text-text-secondary">Frame challenges positively and focus on learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparationInteractive;