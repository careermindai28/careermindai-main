import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Resume Audit with ResumeMind Score™ - AI-Powered ATS Analysis | CareerMindAI',
  description: 'Get your resume analyzed by AI with ResumeMind Score™. Check ATS compatibility, content quality, and formatting based on global best practices. Improve your resume for Indian and international job markets.',
};

export default function ResumeAuditInfoPage() {
  const features = [
    {
      icon: 'CheckCircleIcon',
      title: 'ATS Compatibility',
      description: 'Scan your resume against Applicant Tracking Systems used by top companies worldwide'
    },
    {
      icon: 'DocumentTextIcon',
      title: 'HR Readability',
      description: 'Ensure your resume is easily readable by hiring managers and passes the 6-second test'
    },
    {
      icon: 'LightBulbIcon',
      title: 'Recruiter Psychology',
      description: 'Optimize content based on what recruiters actually look for in winning resumes'
    },
    {
      icon: 'MagnifyingGlassIcon',
      title: 'Keyword Density',
      description: 'Get the right balance of keywords to match job descriptions without over-stuffing'
    },
    {
      icon: 'SparklesIcon',
      title: 'Impact Statements',
      description: 'Transform weak bullet points into powerful achievement statements with metrics'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description: 'Upload your resume in PDF, DOCX, or TXT format. Our AI supports all major formats.'
    },
    {
      number: '02',
      title: 'Add Job Description (Optional)',
      description: 'Paste the job description to get role-specific feedback and keyword matching analysis.'
    },
    {
      number: '03',
      title: 'Get ResumeMind Score™',
      description: 'Receive instant score breakdown across ATS (40%), Content (40%), and Formatting (20%) categories.'
    },
    {
      number: '04',
      title: 'Implement Suggestions',
      description: 'Follow section-by-section actionable feedback to improve your resume instantly.'
    }
  ];

  const audiences = [
    { icon: 'UserGroupIcon', text: 'Indian job seekers targeting domestic and international roles' },
    { icon: 'BriefcaseIcon', text: 'Career switchers looking to reposition their experience' },
    { icon: 'AcademicCapIcon', text: 'Mid-senior professionals aiming for leadership positions' },
    { icon: 'SparklesIcon', text: 'Fresh graduates entering the competitive job market' }
  ];

  const faqs = [
    {
      question: 'Is my resume data safe?',
      answer: 'Yes, absolutely. We use bank-level encryption and never store your resume permanently. Your data is processed in-memory and deleted immediately after analysis. We comply with GDPR and Indian data protection laws.'
    },
    {
      question: 'Can I use this for international roles?',
      answer: 'Yes! Our AI is trained on global resume best practices and understands ATS systems used by companies in India, US, Europe, Canada, and remote roles. We provide region-specific feedback.'
    },
    {
      question: 'Will it rewrite my resume or just audit it?',
      answer: 'The Resume Audit tool provides detailed feedback and suggestions section-by-section, but does not automatically rewrite your resume. For AI-powered rewriting, check our AI Resume Builder tool.'
    },
    {
      question: 'How accurate is the ResumeMind Score™?',
      answer: 'Our scoring algorithm is based on analysis of 100,000+ successful resumes and feedback from 500+ HR professionals. The score reflects industry-standard ATS requirements and recruiter preferences.'
    },
    {
      question: 'What file formats do you support?',
      answer: 'We support PDF, DOCX, DOC, and TXT formats. For best results, we recommend uploading a PDF version of your resume as it preserves formatting across different systems.'
    },
    {
      question: 'How long does the audit take?',
      answer: 'The AI analysis typically takes 30-60 seconds. You\'ll receive your ResumeMind Score™ and detailed feedback immediately after processing.'
    },
    {
      question: 'Do you check for grammar and spelling?',
      answer: 'Yes, our audit includes grammar, spelling, and professional writing style checks. We also flag common resume mistakes like first-person pronouns and passive voice.'
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
                  <span className="text-sm font-medium">Powered by Advanced AI</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Resume Audit with <span className="text-primary">ResumeMind Score™</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary mb-8">
                  AI-powered resume checker that scores ATS compatibility, content quality, and formatting based on global best practices. Get actionable feedback in 60 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/landing-page#get-started"
                    className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-150 shadow-card hover:shadow-elevation"
                  >
                    Try Resume Audit
                    <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                  </Link>
                  <Link
                    href="/resume-audit-tool"
                    className="inline-flex items-center justify-center bg-surface hover:bg-muted text-foreground px-8 py-4 rounded-lg font-semibold border-2 border-border transition-all duration-150"
                  >
                    View Dashboard Demo
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-surface rounded-2xl shadow-elevation p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Your ResumeMind Score™</h3>
                    <span className="text-3xl font-bold text-primary">78</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-text-secondary">ATS Compatibility</span>
                        <span className="text-sm font-semibold text-foreground">82%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-text-secondary">Content Quality</span>
                        <span className="text-sm font-semibold text-foreground">75%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-text-secondary">Formatting</span>
                        <span className="text-sm font-semibold text-foreground">77%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '77%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      <Icon name="LightBulbIcon" size={16} className="inline mr-2 text-accent" />
                      <strong>Top Suggestion:</strong> Add 3-4 quantified achievements with metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why ResumeMind Score is Different */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why ResumeMind Score™ is Different
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                We analyze your resume across multiple dimensions that actually matter to recruiters and ATS systems
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* How the AI Audit Works */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How the AI Audit Works
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Get your ResumeMind Score™ in 4 simple steps
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

        {/* What You Get */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What You Get
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-surface rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="ChartBarIcon" size={24} className="text-primary mr-3" />
                    Comprehensive Score Breakdown
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Overall ResumeMind Score out of 100</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">ATS compatibility percentage (40% weight)</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Content quality assessment (40% weight)</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Formatting and layout score (20% weight)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-surface rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="ListBulletIcon" size={24} className="text-primary mr-3" />
                    Section-by-Section Feedback
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Contact information optimization</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Professional summary enhancement tips</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Experience bullet point improvements</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Skills section keyword matching</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="CheckIcon" size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">Education and certifications review</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Example Feedback</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon name="XCircleIcon" size={20} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Missing quantification</p>
                        <p className="text-sm text-red-700 dark:text-red-400">"Managed team of developers" → Add team size and project impact</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon name="ExclamationTriangleIcon" size={20} className="text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">Weak action verb</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">"Responsible for sales" → Use "Drove", "Achieved", or "Accelerated"</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon name="CheckCircleIcon" size={20} className="text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Strong achievement</p>
                        <p className="text-sm text-green-700 dark:text-green-400">"Increased revenue by 45% (₹2.5Cr) in 6 months" - Keep this format!</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon name="InformationCircleIcon" size={20} className="text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Keyword optimization</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400">Add "Agile", "Scrum", "CI/CD" to match job description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is It For */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Who Is It For?
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Built for ambitious professionals across career stages and geographies
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {audiences.map((audience, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-6 border border-border flex items-start"
                >
                  <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon name={audience.icon as any} size={20} className="text-accent" />
                  </div>
                  <p className="text-foreground">{audience.text}</p>
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
              Ready to see your ResumeMind Score™?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join 10,000+ professionals who improved their resumes with AI-powered feedback
            </p>
            <Link
              href="/landing-page#get-started"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              Get Started Free
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
}