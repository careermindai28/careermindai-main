'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LoadingStateProps {
  isVisible: boolean;
}

const LoadingState = ({ isVisible }: LoadingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const motivationalMessages = [
    'Analyzing your resume structure...',
    'Checking ATS compatibility...',
    'Evaluating keyword optimization...',
    'Assessing formatting standards...',
    'Comparing with job requirements...',
    'Generating improvement suggestions...',
    'Finalizing your ResumeMind Score™...',
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setMessageIndex(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-modal max-w-md w-full p-8 space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-muted"></div>
            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="DocumentMagnifyingGlassIcon" size={32} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground text-center">
            Analyzing Your Resume
          </h3>
          <p className="text-sm text-text-secondary text-center">
            {motivationalMessages[messageIndex]}
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-secondary text-center">{progress}% Complete</p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
          <Icon name="ShieldCheckIcon" size={16} className="text-success" />
          <span>Your data is processed securely</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;