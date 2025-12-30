'use client';

import PublicHeader from '@/components/common/PublicHeader';
import Breadcrumb from '@/components/common/Breadcrumb';
import ToolsHero from './components/ToolsHero';
import ResumeWordCounter from './components/ResumeWordCounter';
import JDKeywordExtractor from './components/JDKeywordExtractor';
import UpgradePrompt from './components/UpgradePrompt';
import SocialShare from './components/SocialShare';

export default function FreeToolsHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

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
          <p className="text-sm text-text-secondary text-center">
            © {new Date().getFullYear()} CareerMindAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
