'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PracticeTimerProps {
  onComplete?: () => void;
}

const PracticeTimer = ({ onComplete }: PracticeTimerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsRecording(true);
  };

  const handlePause = () => {
    setIsActive(false);
    setIsRecording(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsRecording(false);
    setSeconds(0);
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsRecording(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Practice Mode</h3>
        {isRecording && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
            <span className="text-sm text-error font-medium">Recording</span>
          </div>
        )}
      </div>

      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-foreground mb-2">{formatTime(seconds)}</div>
        <p className="text-sm text-text-secondary">
          {seconds < 120 ? 'Aim for 2-3 minutes' : seconds > 180 ? 'Consider wrapping up' : 'Good length!'}
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3">
        {!isActive && seconds === 0 && (
          <button
            onClick={handleStart}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150 font-medium"
          >
            <Icon name="PlayIcon" size={20} />
            <span>Start Practice</span>
          </button>
        )}

        {isActive && (
          <button
            onClick={handlePause}
            className="flex items-center space-x-2 px-6 py-3 bg-warning text-warning-foreground rounded-lg hover:bg-warning/90 transition-colors duration-150 font-medium"
          >
            <Icon name="PauseIcon" size={20} />
            <span>Pause</span>
          </button>
        )}

        {!isActive && seconds > 0 && (
          <>
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150 font-medium"
            >
              <Icon name="PlayIcon" size={20} />
              <span>Resume</span>
            </button>
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 px-6 py-3 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors duration-150 font-medium"
            >
              <Icon name="CheckIcon" size={20} />
              <span>Complete</span>
            </button>
          </>
        )}

        {seconds > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-150 font-medium text-foreground"
          >
            <Icon name="ArrowPathIcon" size={20} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Quick Tips:</h4>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Speak clearly and maintain a steady pace</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Use specific examples with measurable results</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Practice multiple times to build confidence</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PracticeTimer;