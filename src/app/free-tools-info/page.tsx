import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Career Tools | CareerMindAI',
  description: 'Access powerful career tools including JD Keyword Extractor and Resume Word Counter. No login required. Get instant insights to optimize your job search documents.',
};

export default function FreeToolsInfo() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                🎉 No Signup Required
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Free Career Tools by CareerMindAI
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Powerful, instant career insights without any login. Built to help you succeed every day.
              </p>
              <Link
                href="/free-tools-hub"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-all duration-150 shadow-card hover:shadow-elevation"
              >
                Open Free Tools Hub
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Overview */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Instant Career Analysis Tools
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Professional-grade tools you can use right now, without creating an account.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* JD Keyword Extractor */}
              <div className="bg-background p-8 rounded-lg border border-border hover:shadow-card transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    JD Keyword Extractor
                  </h3>
                </div>
                <p className="text-text-secondary mb-6">
                  Paste any job description and instantly extract the most important keywords, required skills, and qualifications. Perfect for tailoring your resume and understanding what employers really want.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Identifies technical skills, soft skills, and industry-specific terms
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Highlights must-have vs nice-to-have requirements
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Provides keyword frequency analysis for optimization
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Use Cases:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Resume Tailoring', 'Cover Letter Writing', 'Interview Prep'].map(
                      (useCase, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-surface rounded-full text-xs text-text-secondary border border-border"
                        >
                          {useCase}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Word Counter */}
              <div className="bg-background p-8 rounded-lg border border-border hover:shadow-card transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Resume Word Counter
                  </h3>
                </div>
                <p className="text-text-secondary mb-6">
                  Analyze your resume length, readability, and keyword density. Get instant feedback on whether your resume meets industry standards and ATS requirements.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Word and character count with optimal length recommendations
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Keyword density analysis for ATS optimization
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <p className="text-sm text-text-secondary">
                      Readability score and improvement suggestions
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Use Cases:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Length Optimization', 'ATS Compliance', 'Content Balance'].map(
                      (useCase, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-surface rounded-full text-xs text-text-secondary border border-border"
                        >
                          {useCase}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Simple. Fast. Effective.
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Get professional insights in seconds, no complicated setup required.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* JD Keyword Extractor Process */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  JD Keyword Extractor
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Paste Job Description
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Copy the full job description from any job posting
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Instant Analysis
                      </h4>
                      <p className="text-sm text-text-secondary">
                        AI extracts keywords, skills, and requirements automatically
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Word Counter Process */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Resume Word Counter
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Paste Resume Content
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Copy your resume text into the analyzer
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Get Metrics
                      </h4>
                      <p className="text-sm text-text-secondary">
                        View word count, keyword density, and optimization tips
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Offer Them Free */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why We Offer These Tools Free
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Build Trust
                </h3>
                <p className="text-sm text-text-secondary">
                  Experience the quality of our AI technology before committing to premium features.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Career Education
                </h3>
                <p className="text-sm text-text-secondary">
                  Help job seekers understand what makes resumes and applications successful.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  First Step
                </h3>
                <p className="text-sm text-text-secondary">
                  Get a taste of AI-powered career tools before exploring our full suite of features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Statistics */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Trusted by Job Seekers Worldwide
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { metric: '50K+', label: 'Job Descriptions Analyzed' },
                { metric: '30K+', label: 'Resumes Optimized' },
                { metric: '4.8/5', label: 'User Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-surface rounded-lg border border-border">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.metric}</div>
                  <p className="text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upgrade Path */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready for More Advanced Features?
                </h2>
                <p className="text-lg text-text-secondary">
                  Our free tools are just the beginning. Upgrade to access AI-powered resume building, cover letter generation, and comprehensive career tools.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Resume Audit with ResumeMind Score™
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Get detailed ATS compatibility scoring, section-by-section feedback, and actionable improvement suggestions.
                  </p>
                  <Link
                    href="/resume-audit-info"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    AI Resume Builder
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Build ATS-optimized resumes with AI-generated content, multiple templates, and regional customization.
                  </p>
                  <Link
                    href="/resume-builder-info"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-surface">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: 'Do I really not need to create an account?',
                  answer: 'Absolutely! All our free tools are accessible without any signup. Just visit the Free Tools Hub and start using them immediately.',
                },
                {
                  question: 'Is my data stored or shared?',
                  answer: 'No. The free tools process everything in your browser. We don\'t store job descriptions or resume content you analyze with these tools.',
                },
                {
                  question: 'Are there any usage limits?',
                  answer: 'The free tools have no usage limits. You can analyze as many job descriptions and resumes as you need, anytime.',
                },
                {
                  question: 'How accurate are the free tools?',
                  answer: 'Our free tools use the same AI technology as our premium features. They provide accurate keyword extraction and meaningful metrics for job search optimization.',
                },
                {
                  question: 'What\'s the difference between free and premium tools?',
                  answer: 'Free tools provide analysis and insights. Premium tools add AI-powered content generation, ATS scoring, personalized recommendations, and document export capabilities.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-background rounded-lg border border-border overflow-hidden"
                >
                  <summary className="px-6 py-4 cursor-pointer font-medium text-foreground hover:bg-muted transition-colors duration-150">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-text-secondary">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-transparent to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Start Optimizing Your Job Search Today
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              No signup required. No credit card needed. Just powerful career tools at your fingertips.
            </p>
            <Link
              href="/free-tools-hub"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              Use Free Tools Now
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}