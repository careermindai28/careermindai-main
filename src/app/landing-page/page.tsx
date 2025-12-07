import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import HeroSection from './components/HeroSection';
import TestimonialMarquee from './components/TestimonialMarquee';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesGrid from './components/FeaturesGrid';
import PricingPreview from './components/PricingPreview';
import GoogleAuthSection from './components/GoogleAuthSection';
import FooterSection from './components/FooterSection';

export const metadata: Metadata = {
  title: 'CareerMindAI - AI-Powered Resume Optimization & Career Tools',
  description: 'Transform your job search with ResumeMind Score. Get AI-powered resume audits, ATS optimization, cover letter generation, and interview preparation tools designed for Indian and global job markets.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <HeroSection />
        <TestimonialMarquee />
        <HowItWorksSection />
        <FeaturesGrid />
        <PricingPreview />
        <GoogleAuthSection />
      </main>
      <FooterSection />
    </div>
  );
}