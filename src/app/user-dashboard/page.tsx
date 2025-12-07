'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import DashboardInteractive from './components/DashboardInteractive';
import ProtectedPage from '@/components/auth/ProtectedPage';
import { useEffect } from 'react';

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

const mockDashboardData = {
  overallScore: 78,
  scoreBreakdown: [
    {
      category: "ATS Compatibility",
      score: 32,
      maxScore: 40,
      color: "bg-success"
    },
    {
      category: "Content Quality",
      score: 28,
      maxScore: 35,
      color: "bg-warning"
    },
    {
      category: "Formatting & Structure",
      score: 18,
      maxScore: 25,
      color: "bg-primary"
    }
  ] as ScoreBreakdown[],
  summaryCards: [
    {
      title: "Audits Completed",
      value: 12,
      icon: "DocumentMagnifyingGlassIcon",
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+3 this week"
    },
    {
      title: "Resumes Built",
      value: 5,
      icon: "DocumentTextIcon",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      change: "+2 this week"
    },
    {
      title: "Cover Letters",
      value: 8,
      icon: "DocumentIcon",
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+1 this week"
    },
    {
      title: "Interview Preps",
      value: 15,
      icon: "ChatBubbleLeftRightIcon",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+5 this week"
    }
  ] as SummaryCard[],
  quickActions: [
    {
      title: "Start New Audit",
      description: "Analyze your resume against ATS systems and get detailed improvement suggestions",
      icon: "DocumentMagnifyingGlassIcon",
      href: "/resume-audit-tool",
      color: "bg-primary"
    },
    {
      title: "Build Resume",
      description: "Create ATS-optimized resumes with AI-powered content generation and professional templates",
      icon: "DocumentTextIcon",
      href: "/ai-resume-builder",
      color: "bg-secondary"
    },
    {
      title: "Generate Cover Letter",
      description: "Create tailored cover letters that match job descriptions and showcase your strengths",
      icon: "DocumentIcon",
      href: "/cover-letter-generator",
      color: "bg-accent"
    },
    {
      title: "Prep Interview",
      description: "Practice with AI-generated questions for HR, behavioral, and role-specific scenarios",
      icon: "ChatBubbleLeftRightIcon",
      href: "/interview-preparation",
      color: "bg-success"
    }
  ] as QuickAction[],
  recentActivities: [
    {
      id: 1,
      type: "audit",
      title: "Resume Audit Completed",
      description: "Software Engineer resume analyzed with 78/100 ResumeMind Score",
      timestamp: "2 hours ago",
      status: "completed" as const,
      icon: "DocumentMagnifyingGlassIcon"
    },
    {
      id: 2,
      type: "resume",
      title: "Resume Built",
      description: "Created Modern template resume for Product Manager role",
      timestamp: "5 hours ago",
      status: "completed" as const,
      icon: "DocumentTextIcon"
    },
    {
      id: 3,
      type: "cover-letter",
      title: "Cover Letter Generated",
      description: "Professional tone cover letter for Google application",
      timestamp: "1 day ago",
      status: "completed" as const,
      icon: "DocumentIcon"
    },
    {
      id: 4,
      type: "interview",
      title: "Interview Prep Session",
      description: "Practiced 15 behavioral questions with STAR method guidance",
      timestamp: "2 days ago",
      status: "completed" as const,
      icon: "ChatBubbleLeftRightIcon"
    },
    {
      id: 5,
      type: "linkedin",
      title: "LinkedIn Profile Updated",
      description: "Optimized headline and summary for better recruiter visibility",
      timestamp: "3 days ago",
      status: "completed" as const,
      icon: "UserCircleIcon"
    }
  ] as Activity[],
  progressItems: [
    {
      title: "Profile Completion",
      description: "Complete your profile to unlock personalized recommendations",
      percentage: 75,
      icon: "UserCircleIcon",
      color: "bg-primary"
    },
    {
      title: "Tool Utilization",
      description: "Explore all available tools to maximize your job search success",
      percentage: 60,
      icon: "WrenchScrewdriverIcon",
      color: "bg-secondary"
    }
  ] as ProgressItem[]
};

export default function UserDashboardPage() {
  useEffect(() => {
    document.title = 'Dashboard - CareerMindAI';
  }, []);

  return (
    <ProtectedPage>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 lg:ml-72 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <Breadcrumb />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
              <p className="text-text-secondary">
                Track your career development progress and access powerful AI tools to accelerate your job search.
              </p>
            </div>

            <DashboardInteractive data={mockDashboardData} />
          </div>
        </main>
      </div>
    </ProtectedPage>
  );
}