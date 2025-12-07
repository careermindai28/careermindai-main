import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LinkedIn Profile Optimization | CareerMindAI',
  description: 'AI-crafted LinkedIn headlines, About summaries, and experience bullets that attract recruiters. Optimize your professional profile with keyword suggestions tailored to your target role and region.',
};

export default function LinkedInOptimizerInfo() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                LinkedIn Profile Optimization That Attracts Recruiters
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                AI-crafted headlines, About summaries, experience bullets, and keyword suggestions tailored to your target role and region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/landing-page#get-started"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-150 shadow-card hover:shadow-elevation"
                >
                  Get Started
                </Link>
                <Link
                  href="/landing-page#hero"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground bg-surface hover:bg-muted border border-border rounded-lg transition-all duration-150"
                >
                  View Dashboard Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What LinkedIn Optimizer Improves */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What the LinkedIn Optimizer Improves
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Transform every key section of your LinkedIn profile to maximize recruiter visibility and engagement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Professional Headline',
                  description: 'AI-generated headlines that capture attention and communicate your value proposition in 120 characters.',
                  icon: '💼',
                },
                {
                  title: 'About Summary',
                  description: 'Compelling narrative that showcases your expertise, achievements, and career aspirations with strategic keyword placement.',
                  icon: '📝',
                },
                {
                  title: 'Experience Bullets',
                  description: 'Achievement-focused bullet points that quantify impact and use industry-relevant keywords.',
                  icon: '🎯',
                },
                {
                  title: 'Skills Optimization',
                  description: 'Strategic skill recommendations based on your target role and industry trends.',
                  icon: '⚡',
                },
                {
                  title: 'Featured Section Ideas',
                  description: 'Suggestions for portfolio items, articles, and projects to showcase your expertise.',
                  icon: '🌟',
                },
                {
                  title: 'Keyword Strategy',
                  description: 'Industry-specific keywords and phrases that improve your discoverability in recruiter searches.',
                  icon: '🔍',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-lg border border-border hover:shadow-card transition-shadow duration-150"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Four simple steps to transform your LinkedIn profile into a recruiter magnet.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Input Current Profile',
                  description: 'Upload your resume or paste your existing LinkedIn profile content.',
                },
                {
                  step: '02',
                  title: 'Specify Target Role',
                  description: 'Choose your target role, industry, experience level, and preferred region.',
                },
                {
                  step: '03',
                  title: 'Receive AI Optimizations',
                  description: 'Get AI-generated suggestions for headline, about, experience, and keywords.',
                },
                {
                  step: '04',
                  title: 'Implement Improvements',
                  description: 'Copy optimized content and update your LinkedIn profile for maximum impact.',
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-surface p-6 rounded-lg border border-border">
                    <div className="text-5xl font-bold text-primary/20 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After Comparison */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Before vs After Optimization
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                See how AI-powered optimization transforms LinkedIn profiles for better visibility and engagement.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before Example */}
              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Before Optimization
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Headline</p>
                    <p className="text-foreground">Software Developer at ABC Corp</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">About</p>
                    <p className="text-foreground">
                      I am a software developer with experience in various technologies. I enjoy coding and solving problems.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-red-600 font-medium">
                      ❌ Generic, lacks keywords, no quantified achievements
                    </p>
                  </div>
                </div>
              </div>

              {/* After Example */}
              <div className="bg-background p-6 rounded-lg border border-primary">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    After Optimization
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Headline</p>
                    <p className="text-foreground">
                      Senior Full-Stack Developer | React & Node.js | Building Scalable Solutions | Open to Remote Opportunities
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">About</p>
                    <p className="text-foreground">
                      Results-driven Full-Stack Developer with 5+ years building scalable web applications using React, Node.js, and AWS. Delivered 20% performance improvement and 40% faster load times for 100K+ users. Passionate about clean code, mentoring junior developers, and solving complex technical challenges.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-green-600 font-medium">
                      ✅ Keywords optimized, achievements quantified, clear value proposition
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Trusted by Professionals Worldwide
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  metric: '3x',
                  label: 'More Profile Views',
                  description: 'Users see 3x increase in profile visibility after optimization',
                },
                {
                  metric: '85%',
                  label: 'Recruiter Response',
                  description: 'Higher response rate from recruiters and hiring managers',
                },
                {
                  metric: '2.5x',
                  label: 'Connection Requests',
                  description: 'More relevant connection requests from industry professionals',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-surface rounded-lg border border-border"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.metric}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-text-secondary">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry-Specific Examples */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Tailored for Your Industry
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Optimization strategies customized for different career fields and experience levels.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Software Development',
                'Data Science & Analytics',
                'Product Management',
                'Digital Marketing',
                'Business Analysis',
                'UI/UX Design',
                'Sales & Business Development',
                'Human Resources',
              ].map((industry, index) => (
                <div
                  key={index}
                  className="bg-background p-4 rounded-lg border border-border text-center hover:border-primary transition-colors duration-150"
                >
                  <p className="font-medium text-foreground">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: 'How accurate is the AI optimization?',
                  answer: 'Our AI is trained on thousands of successful LinkedIn profiles and recruiter preferences. It uses industry-specific best practices and current trends to generate highly relevant, professional content that improves your visibility.',
                },
                {
                  question: 'Will LinkedIn detect AI-generated content?',
                  answer: 'Our optimization provides suggestions that you can customize and make your own. The AI generates professional, authentic content based on your actual experience and goals. You maintain full control and can adjust everything to match your voice.',
                },
                {
                  question: 'How often should I update my LinkedIn profile?',
                  answer: 'We recommend updating your profile every 3-6 months or whenever you change roles, gain new skills, or shift career focus. Regular updates keep your profile fresh and improve algorithmic visibility.',
                },
                {
                  question: 'Can I use this for international job searches?',
                  answer: 'Absolutely! Our AI understands regional differences in professional communication and can optimize your profile for specific markets including India, US, Europe, and remote opportunities.',
                },
                {
                  question: 'Does it work for all experience levels?',
                  answer: 'Yes! Whether you\'re a fresh graduate, mid-level professional, or senior executive, our AI adapts suggestions to your experience level and career goals.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-surface rounded-lg border border-border overflow-hidden"
                >
                  <summary className="px-6 py-4 cursor-pointer font-medium text-foreground hover:bg-muted transition-colors duration-150">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-text-secondary">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Attract More Recruiters?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Transform your LinkedIn profile with AI-powered optimization and stand out to hiring managers.
            </p>
            <Link
              href="/landing-page#get-started"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              Optimize My Profile Now
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}