'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import ToolsHero from './components/ToolsHero';
import ResumeWordCounter from './components/ResumeWordCounter';
import JDKeywordExtractor from './components/JDKeywordExtractor';
import UpgradePrompt from './components/UpgradePrompt';
import SocialShare from './components/SocialShare';

export default function FreeToolsHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumb />
        
        <ToolsHero className="mb-12" />

        <div className="space-y-8 mb-12">
          <JDKeywordExtractor />
          <ResumeWordCounter />
        </div>

        <div className="space-y-8">
          <UpgradePrompt />
          <SocialShare />
        </div>
      </main>

      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <rect width="32" height="32" rx="6" fill="currentColor" />
                <path
                  d="M16 8L8 14V24H12V18H20V24H24V14L16 8Z"
                  fill="white"
                />
              </svg>
              <span className="text-lg font-semibold text-foreground">CareerMindAI</span>
            </div>
            
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} CareerMindAI. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                Home
              </a>
              <a href="/pricing-plans" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                Pricing
              </a>
              <a href="/user-dashboard" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}