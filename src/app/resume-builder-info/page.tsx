import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'AI Resume Builder - Global-Ready ATS-Optimized Resumes | CareerMindAI',
  description: 'Build professional, ATS-optimized resumes with AI assistance. Get role-specific content suggestions, quantification help, and region-aware templates for India, US, Europe, and remote roles.',
};

export default function ResumeBuilderInfoPage() {
  const features = [
    {
      icon: 'GlobeAltIcon',
      title: 'Role-Tailored Content',
      description: 'AI analyzes job requirements and suggests relevant skills, experience descriptions, and achievements'
    },
    {
      icon: 'LightBulbIcon',
      title: 'Achievement Bullet Suggestions',
      description: 'Get AI-powered bullet points that highlight impact, include metrics, and use strong action verbs'
    },
    {
      icon: 'CalculatorIcon',
      title: 'Smart Quantification',
      description: 'Automatically suggests where to add numbers, percentages, and metrics to make achievements concrete'
    },
    {
      icon: 'DocumentDuplicateIcon',
      title: 'Region-Aware Templates',
      description: 'Choose from India, US, Europe, or Remote-focused templates that match local hiring expectations'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Resume or Start Fresh',
      description: 'Upload your existing resume to improve it, or fill in basic profile information to start from scratch'
    },
    {
      number: '02',
      title: 'Choose Target Role & Region',
      description: 'Select your target job title and region (India / US / Europe / Remote) for customized suggestions'
    },
    {
      number: '03',
      title: 'AI Suggests Structure & Content',
      description: 'Our AI analyzes your input and generates role-specific content with proper formatting and keywords'
    },
    {
      number: '04',
      title: 'Export & Download',
      description: 'Get your resume as DOCX or PDF-ready content that you can further customize in any word processor'
    }
  ];

  const comparisons = [
    {
      category: 'Generic ChatGPT',
      points: [
        'Generates generic content',
        'No ATS optimization',
        'May include fake skills',
        'Ignores resume structure',
        'One-size-fits-all output'
      ]
    },
    {
      category: 'CareerMindAI Builder',
      points: [
        'Role-specific content',
        'Built-in ATS compliance',
        'Only your real skills',
        'Proper resume sections',
        'Region-aware formatting'
      ]
    }
  ];

  const templates = [
    {
      name: 'Modern',
      description: 'Clean, contemporary design with subtle colors perfect for tech and creative roles',
      bestFor: 'Tech, Design, Marketing'
    },
    {
      name: 'Minimal',
      description: 'Simple, distraction-free layout that lets your experience speak for itself',
      bestFor: 'Finance, Consulting, Legal'
    },
    {
      name: 'Professional',
      description: 'Traditional format trusted by Fortune 500 companies and established industries',
      bestFor: 'Corporate, Management, Healthcare'
    },
    {
      name: 'Creative',
      description: 'Eye-catching design with personality, ideal for standing out in competitive fields',
      bestFor: 'Advertising, Media, Startups'
    }
  ];

  const faqs = [
    {
      question: 'Can I customize the AI-generated content?',
      answer: 'Absolutely! The AI provides suggestions that you can edit, rephrase, or use as inspiration. You have complete control over the final content. Think of it as a smart assistant, not a replacement for your judgment.'
    },
    {
      question: 'How is this different from resume templates?',
      answer: 'Traditional templates just provide layout. Our AI Builder generates actual content based on your profile, target role, and region. It\'s like having a professional resume writer + designer working together.'
    },
    {
      question: 'Will it work for my industry?',
      answer: 'Yes! We support all major industries including Tech, Finance, Healthcare, Marketing, Consulting, Engineering, Education, and more. The AI adapts suggestions based on your specific field.'
    },
    {
      question: 'What if I don\'t have much experience?',
      answer: 'Perfect for freshers! The AI helps you present academic projects, internships, and skills in a professional way. It also suggests how to frame volunteer work and extracurricular activities.'
    },
    {
      question: 'Can I build multiple resumes for different roles?',
      answer: 'Yes, we recommend creating tailored resumes for each type of role you\'re applying to. Each resume can emphasize different skills and experiences relevant to that specific position.'
    },
    {
      question: 'Do you provide cover letters too?',
      answer: 'Yes! Check our Cover Letter Generator tool. It works seamlessly with resumes created in the AI Resume Builder for consistent branding and messaging.'
    },
    {
      question: 'How does region-aware formatting work?',
      answer: 'US resumes typically emphasize achievements and exclude photos. European resumes often include more personal details. Indian resumes balance both approaches. Our AI adjusts content and layout accordingly.'
    }
  ];

  return (
    <>
      <PublicHeader />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                  <Icon name="SparklesIcon" size={16} />
                  <span className="text-sm font-medium">AI-Powered Content Generation</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  AI Resume Builder for <span className="text-primary">Global-Ready Profiles</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary mb-8">
                  Create ATS-optimized, role-specific resumes with AI-generated content. Designed for India, US, Europe, and remote opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/landing-page#get-started"
                    className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-150 shadow-card hover:shadow-elevation"
                  >
                    Start Building Free
                    <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                  </Link>
                  <Link
                    href="#examples"
                    className="inline-flex items-center justify-center bg-surface hover:bg-muted text-foreground px-8 py-4 rounded-lg font-semibold border-2 border-border transition-all duration-150"
                  >
                    View Examples
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {templates.slice(0, 4).map((template, index) => (
                    <div
                      key={index}
                      className="bg-surface rounded-xl p-4 border border-border hover:shadow-card transition-all duration-150"
                    >
                      <div className="aspect-[8.5/11] bg-gradient-to-br from-muted to-background rounded-lg mb-3 flex items-center justify-center">
                        <Icon name="DocumentTextIcon" size={32} className="text-text-secondary" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">{template.name}</h4>
                      <p className="text-xs text-text-secondary mt-1">{template.bestFor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Our AI Resume Builder Does */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What Our AI Resume Builder Does
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                More than templates - intelligent content generation that adapts to your career goals
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-6 border border-border hover:shadow-card transition-all duration-150"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                From zero to interview-ready resume in 4 simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-surface rounded-xl p-6 border border-border h-full">
                    <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <Icon name="ChevronRightIcon" size={24} className="text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Beats Generic ChatGPT */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why It Beats Generic ChatGPT Outputs
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Built specifically for resume writing with deep career expertise
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {comparisons.map((comparison, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-8 border-2 ${
                    index === 0
                      ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800' :'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                  }`}
                >
                  <h3 className={`text-2xl font-bold mb-6 ${
                    index === 0 ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'
                  }`}>
                    {comparison.category}
                  </h3>
                  <ul className="space-y-3">
                    {comparison.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <Icon
                          name={index === 0 ? 'XMarkIcon' : 'CheckIcon'}
                          size={20}
                          className={`flex-shrink-0 mt-0.5 mr-3 ${
                            index === 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                          }`}
                        />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Template Preview Grid */}
        <section id="examples" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Professional Templates
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Choose from expertly designed templates optimized for different industries
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-6 border border-border hover:shadow-card transition-all duration-150 group"
                >
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-muted to-background rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                    <Icon name="DocumentTextIcon" size={48} className="text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{template.name}</h3>
                  <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                    <Icon name="StarIcon" size={14} />
                    {template.bestFor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-surface rounded-xl border border-border overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center justify-between">
                    {faq.question}
                    <Icon name="ChevronDownIcon" size={20} className="text-text-secondary group-open:rotate-180 transition-transform duration-150" />
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
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to build your professional resume?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of professionals who landed interviews with AI-optimized resumes
            </p>
            <Link
              href="/landing-page#get-started"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              Start Building Now
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
}