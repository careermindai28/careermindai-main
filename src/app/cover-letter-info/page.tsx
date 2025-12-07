import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'AI Cover Letter Generator - One-Click Personalized Cover Letters | CareerMindAI',
  description: 'Create tailored, ATS-optimized cover letters in seconds. AI-powered personalization based on your resume, job description, and preferred tone. Perfect for career switchers and remote roles.',
};

export default function CoverLetterInfoPage() {
  const features = [
    {
      icon: 'SparklesIcon',
      title: 'AI-Powered Personalization',
      description: 'Tailors each letter to your resume, target role, and company culture'
    },
    {
      icon: 'AdjustmentsHorizontalIcon',
      title: 'Tone Adjustment',
      description: 'Choose from Professional, Enthusiastic, Conservative, or Creative tones'
    },
    {
      icon: 'DocumentTextIcon',
      title: 'Industry-Specific Templates',
      description: 'Pre-built templates for tech, finance, healthcare, and creative industries'
    },
    {
      icon: 'ArrowPathIcon',
      title: 'Resume Integration',
      description: 'Seamlessly pulls data from your resume for consistent messaging'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Input Job Details',
      description: 'Paste the job description and company name'
    },
    {
      step: 2,
      title: 'Select Tone Preference',
      description: 'Choose the tone that matches the company culture'
    },
    {
      step: 3,
      title: 'Receive AI Variations',
      description: 'Get multiple personalized letter options instantly'
    },
    {
      step: 4,
      title: 'Customize & Export',
      description: 'Fine-tune your favorite version and export as DOCX/PDF'
    }
  ];

  const toneExamples = [
    {
      tone: 'Professional',
      excerpt: 'My extensive background in project management, combined with expertise in agile methodologies, positions me well to contribute to your team\'s success...'
    },
    {
      tone: 'Enthusiastic',
      excerpt: 'I\'m thrilled at the opportunity to bring my passion for data analytics to your innovative team. My track record of turning insights into action aligns perfectly...'
    },
    {
      tone: 'Conservative',
      excerpt: 'With a proven record of delivering results in enterprise software development, I am confident in my ability to meet the requirements outlined in your posting...'
    },
    {
      tone: 'Creative',
      excerpt: 'Picture this: A marketing strategist who doesn\'t just follow trends but creates them. That\'s what I bring to your dynamic team...'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is the AI personalization?',
      answer: 'Our AI analyzes both your resume and the job description to identify key alignment points, ensuring every statement is relevant and authentic to your experience.'
    },
    {
      question: 'Can I use this for career switching?',
      answer: 'Absolutely! The AI is trained to highlight transferable skills and reframe your experience to match your target role, making career transitions smoother.'
    },
    {
      question: 'How many template variations do I get?',
      answer: 'You receive 3-4 variations per generation, each with a different approach and emphasis, giving you options to choose the best fit.'
    },
    {
      question: 'Does it integrate with my existing resume data?',
      answer: 'Yes! If you\'ve used our Resume Builder or Audit Tool, your data is automatically available, ensuring consistency across all your application materials.'
    },
    {
      question: 'Can I edit the generated content?',
      answer: 'Definitely! All generated content is fully editable, allowing you to add personal touches or adjust specific phrases to match your voice.'
    }
  ];

  const userSuccessMetrics = [
    { metric: '3x', label: 'Higher response rates' },
    { metric: '85%', label: 'Interview invitations' },
    { metric: '10 min', label: 'Average time saved' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                One-Click AI Cover Letters
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Tailored to your resume, job description, company, and tone. Stop writing generic letters that get ignored.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/landing-page#get-started"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 shadow-elevation hover:shadow-card text-center"
                >
                  Try Cover Letter Generator
                </Link>
                <Link
                  href="/landing-page#hero"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 text-center"
                >
                  View Dashboard Demo
                </Link>
              </div>
              
              {/* Success Metrics */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {userSuccessMetrics.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{item.metric}</div>
                    <div className="text-sm text-text-secondary">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cover Letter Preview */}
            <div className="bg-surface border border-border rounded-xl p-8 shadow-elevation">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="DocumentTextIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">AI-Generated Cover Letter</div>
                    <div className="text-sm text-text-secondary">Personalized for Senior Product Manager</div>
                  </div>
                </div>
                
                <div className="space-y-3 text-text-secondary leading-relaxed">
                  <p className="border-l-4 border-accent pl-4 bg-accent/5 py-2 rounded">
                    <span className="text-accent font-medium">Company-specific:</span> "Your company's commitment to sustainable innovation aligns perfectly with my values..."
                  </p>
                  <p className="border-l-4 border-primary pl-4 bg-primary/5 py-2 rounded">
                    <span className="text-primary font-medium">Role-aligned:</span> "My 8 years of product leadership, including launching 3 successful B2B SaaS products..."
                  </p>
                  <p className="border-l-4 border-success pl-4 bg-success/5 py-2 rounded">
                    <span className="text-success font-medium">Achievement-focused:</span> "Drove 40% user growth through data-driven feature prioritization..."
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <div className="text-sm text-text-secondary">ATS-Optimized</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Ready to send</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Generic Cover Letters Don't Work */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Generic Cover Letters Don't Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="XMarkIcon" size={24} className="text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Generic Templates</h3>
                  <p className="text-text-secondary">Hiring managers can spot copy-paste letters instantly. They lack personalization and show no research.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-success/5 border border-success/20 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">AI-Personalized Letters</h3>
                  <p className="text-text-secondary">References specific company details, aligns your experience with role requirements, and adapts tone to culture.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="XMarkIcon" size={24} className="text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Time-Consuming Manual Writing</h3>
                  <p className="text-text-secondary">Spending hours per application, often resulting in repetitive content and burnout.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-success/5 border border-success/20 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Automation</h3>
                  <p className="text-text-secondary">Generate customized letters in seconds, with option to fine-tune, freeing time for interview prep.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How CareerMindAI Builds Tailored Letters
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Uses resume + JD + company name + tone choice to create personalized, compelling cover letters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-elevation transition-shadow duration-150"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          
          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-elevation z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-surface border border-border rounded-xl p-6 hover:shadow-elevation transition-shadow duration-150">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tone Examples */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Examples of Use Cases
            </h2>
            <p className="text-xl text-text-secondary">
              Different tones for different scenarios - career switch, senior leadership, remote roles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {toneExamples.map((example, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-elevation transition-shadow duration-150"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                    {example.tone}
                  </div>
                </div>
                <p className="text-text-secondary italic leading-relaxed">
                  "{example.excerpt}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            What Hiring Managers Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="UserCircleIcon" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Sarah Chen</div>
                  <div className="text-sm text-text-secondary">Senior Recruiter, Tech Startup</div>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "Personalized cover letters stand out immediately. When candidates reference our company values and demonstrate they've done their research, it shows genuine interest."
              </p>
            </div>
            
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="UserCircleIcon" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Raj Malhotra</div>
                  <div className="text-sm text-text-secondary">Hiring Manager, Consulting Firm</div>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "A well-crafted cover letter that aligns experience with our specific requirements makes my shortlisting decisions much easier. Generic letters go straight to rejection."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-elevation transition-shadow duration-150 group"
              >
                <summary className="font-semibold text-foreground cursor-pointer flex items-center justify-between">
                  <span>{faq.question}</span>
                  <Icon
                    name="ChevronDownIcon"
                    size={20}
                    className="text-text-secondary group-open:rotate-180 transition-transform duration-150"
                  />
                </summary>
                <p className="text-text-secondary mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Create Your Perfect Cover Letter?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join thousands of job seekers who've landed interviews with personalized, AI-powered cover letters
          </p>
          <Link
            href="/landing-page#get-started"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-150 shadow-elevation hover:shadow-card"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}