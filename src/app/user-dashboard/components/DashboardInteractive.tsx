'use client';

import ResumeMindScore from './ResumeMindScore';
import SummaryCards from './SummaryCards';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import ProgressTracking from './ProgressTracking';

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  color: string;
}

interface SummaryCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  change?: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: string;
}

interface ProgressItem {
  title: string;
  description: string;
  percentage: number;
  icon: string;
  color: string;
}

interface DashboardData {
  overallScore: number;
  scoreBreakdown: ScoreBreakdown[];
  summaryCards: SummaryCard[];
  quickActions: QuickAction[];
  recentActivities: Activity[];
  progressItems: ProgressItem[];
}

interface DashboardInteractiveProps {
  data: DashboardData;
}

export default function DashboardInteractive({ data }: DashboardInteractiveProps) {
  return (
    <div className="space-y-6">
      <ResumeMindScore
        overallScore={data.overallScore}
        breakdown={data.scoreBreakdown}
      />

      <SummaryCards cards={data.summaryCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions actions={data.quickActions} />
        <ProgressTracking items={data.progressItems} />
      </div>

      <RecentActivity activities={data.recentActivities} />
    </div>
  );
}