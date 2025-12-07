'use client';

import { useEffect, useState } from 'react';

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  color: string;
}

interface ResumeMindScoreProps {
  overallScore: number;
  breakdown: ScoreBreakdown[];
}

export default function ResumeMindScore({ overallScore, breakdown }: ResumeMindScoreProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let currentScore = 0;
    const increment = overallScore / 50;
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= overallScore) {
        setAnimatedScore(overallScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isHydrated, overallScore]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 90;
  const displayScore = isHydrated ? animatedScore : overallScore;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        ResumeMind Score<sup>TM</sup>
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${getScoreColor(overallScore)} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
              {displayScore}
            </span>
            <span className="text-sm text-text-secondary mt-1">out of 100</span>
            <span className={`text-xs font-medium mt-2 ${getScoreColor(overallScore)}`}>
              {getScoreLabel(overallScore)}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          {breakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.category}</span>
                <span className="text-sm font-semibold text-text-secondary">
                  {item.score}/{item.maxScore}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
                  style={{ width: isHydrated ? `${(item.score / item.maxScore) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-text-secondary">
          Your ResumeMind Score<sup>TM</sup> reflects how well your resume performs against ATS systems and hiring standards. 
          Scores above 80 indicate excellent optimization for job applications.
        </p>
      </div>
    </div>
  );
}