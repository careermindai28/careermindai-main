import type { Metadata } from 'next';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import CoverLetterGeneratorInteractive from './components/CoverLetterGeneratorInteractive';

export const metadata: Metadata = {
  title: 'Cover Letter Generator - CareerMindAI',
  description:
    'Create personalized, compelling cover letters using AI-powered content generation tailored to specific job applications with multiple tone options and instant customization.',
};

export default function CoverLetterGeneratorPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Breadcrumb />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Cover Letter Generator
            </h1>
            <p className="text-text-secondary">
              Create personalized cover letters that highlight your strengths and match job requirements
            </p>
          </div>

          <CoverLetterGeneratorInteractive />
        </div>
      </main>
    </div>
  );
}
