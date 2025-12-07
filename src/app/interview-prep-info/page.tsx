import type { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'AI Interview Preparation - HR, Technical & Behavioral Practice | CareerMindAI',
  description: 'Practice role-specific interview questions with STAR method guidance. AI-generated questions for HR, technical, and behavioral rounds. Built for Indian and global interviews.',
};

export default function InterviewPrepInfoPage() {
  const features = [
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'HR & Behavioral Questions',
      description: 'Common questions with suggested approaches and red flags to avoid'
    },
    {
      icon: 'CodeBracketIcon',
      title: 'Role-Specific Technical Questions',
      description: 'Tailored questions for your target role, seniority, and industry'
    },
    {
      icon: 'StarIcon',
      title: 'STAR Method Scenarios',
      description: 'Structured frameworks to answer behavioral questions effectively'
    },
    {
      icon: 'ChartBarIcon',
      title: 'Progress Tracking',
      description: 'Monitor your practice sessions and improvement over time'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Choose Your Target Role',
      description: 'Input role, experience level, industry, and region (India/US/Europe/Remote)'
    },
    {
      step: 2,
      title: 'Receive Customized Questions',
      description: 'AI generates questions bucketed into HR, Technical, and Behavioral sections'
    },
    {
      step: 3,
      title: 'Practice with Frameworks',
      description: 'Use STAR method guidance and suggested answer structures'
    },
    {
      step: 4,
      title: 'Track Your Improvement',
      description: 'Save answered questions and monitor confidence levels over time'
    }
  ];

  const questionCategories = [
    {
      category: 'HR & Behavioral',
      icon: 'UserGroupIcon',
      examples: [
        'Tell me about yourself',
        'Why do you want to work here?',
        'Describe a time you handled conflict',
        'What are your salary expectations?'
      ]
    },
    {
      category: 'Technical (Product Manager)',
      icon: 'CpuChipIcon',
      examples: [
        'How do you prioritize features?',
        'Explain your product metrics framework',
        'Design a feature for [product]',
        'How do you handle technical debt?'
      ]
    },
    {
      category: 'Technical (Software Engineer)',
      icon: 'CodeBracketIcon',
      examples: [
        'Explain your approach to system design',
        'Debug this code snippet',
        'Optimize this algorithm',
        'Design a scalable API architecture'
      ]
    },
    {
      category: 'STAR Method Scenarios',
      icon: 'StarIcon',
      examples: [
        'Situation: Tight deadline scenario',
        'Task: Lead a cross-functional project',
        'Action: Resolve team disagreement',
        'Result: Deliver measurable impact'
      ]
    }
  ];

  const preparationTimeline = [
    { weeks: '4+ weeks out', focus: 'Practice 5-10 questions daily, focus on storytelling' },
    { weeks: '2-3 weeks out', focus: 'Deep dive into role-specific technical questions' },
    { weeks: '1 week out', focus: 'Mock interviews with saved questions, refine weak areas' },
    { weeks: 'Day before', focus: 'Review company research, rest, light question review' }
  ];

  const userTestimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      company: 'Bangalore-based Startup',
      quote: 'The STAR method guidance helped me structure my answers perfectly. I felt prepared for every question in my Google interview.'
    },
    {
      name: 'Aditya Verma',
      role: 'Product Manager',
      company: 'US-based SaaS Company',
      quote: 'Role-specific questions were spot-on. The AI understood exactly what a PM interview looks like and prepared me for both behavioral and case questions.'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the AI-generated questions?',
      answer: 'Our AI is trained on thousands of real interview questions from companies across industries. Questions are tailored to your specific role, seniority, and region, ensuring relevance and accuracy.'
    },
    {
      question: 'Can I practice for Indian and international interviews?',
      answer: 'Yes! The tool is designed for both Indian job markets and global roles (US, Europe, Remote). Questions adapt to regional interview styles and expectations.'
    },
    {
      question: 'How many questions should I practice?',
      answer: 'We recommend practicing 50-75 questions for comprehensive preparation: 20-30 behavioral, 20-30 technical, and 10-15 STAR scenarios. Spread this over 3-4 weeks for best results.'
    },
    {
      question: 'Does the tool provide model answers?',
      answer: 'Currently, the tool provides question frameworks and STAR method guidance. Full model answer generation is coming soon based on user feedback.'
    },
    {
      question: 'Can I save my practice sessions?',
      answer: 'Absolutely! All answered questions are saved to your dashboard, where you can review, refine, and track your progress over time.'
    },
    {
      question: 'Is this suitable for freshers?',
      answer: 'Yes! Select "Fresher" or "0-2 years" experience level, and the AI will generate entry-level appropriate questions focusing on potential, learning ability, and foundational knowledge.'
    }
  ];

  const successMetrics = [
    { metric: '2x', label: 'Confidence boost' },
    { metric: '78%', label: 'Interview success rate' },
    { metric: '60+', label: 'Avg questions practiced' }
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
                AI Interview Coach for HR, Technical & Behavioral Rounds
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Role-specific questions plus STAR-format guidance. Practice with confidence for Indian and global interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/landing-page#get-started"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 shadow-elevation hover:shadow-card text-center"
                >
                  Start Practicing
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
                {successMetrics.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{item.metric}</div>
                    <div className="text-sm text-text-secondary">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interview Question Preview */}
            <div className="bg-surface border border-border rounded-xl p-8 shadow-elevation">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">AI-Generated Interview Questions</div>
                    <div className="text-sm text-text-secondary">Tailored for Senior Product Manager</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 bg-primary/5 py-3 rounded">
                    <div className="text-xs text-primary font-semibold mb-1">HR / BEHAVIORAL</div>
                    <p className="text-foreground font-medium">Tell me about a time you led a cross-functional team through a challenging project.</p>
                  </div>
                  
                  <div className="border-l-4 border-accent pl-4 bg-accent/5 py-3 rounded">
                    <div className="text-xs text-accent font-semibold mb-1">TECHNICAL / ROLE-SPECIFIC</div>
                    <p className="text-foreground font-medium">How would you prioritize features when you have limited engineering resources?</p>
                  </div>
                  
                  <div className="border-l-4 border-success pl-4 bg-success/5 py-3 rounded">
                    <div className="text-xs text-success font-semibold mb-1">STAR METHOD SCENARIO</div>
                    <p className="text-foreground font-medium">
                      <span className="block"><strong>S:</strong> Product launch delayed</span>
                      <span className="block"><strong>T:</strong> Your task as PM...</span>
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">50+ questions generated</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">Practice ready</span>
                    </div>
                  </div>
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
              What You Get
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive interview preparation tools designed for real-world success
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

      {/* Question Categories Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Question Categories & Examples
            </h2>
            <p className="text-xl text-text-secondary">
              Role-specific questions tailored to your industry and experience level
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {questionCategories.map((category, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-elevation transition-shadow duration-150"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={category.icon as any} size={20} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-text-secondary">
                      <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Timeline */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Optimal Preparation Timeline
          </h2>
          
          <div className="space-y-4">
            {preparationTimeline.map((phase, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 flex items-center gap-6"
              >
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-lg font-bold text-primary">{phase.weeks}</div>
                </div>
                <div className="flex-1 border-l-2 border-accent pl-6">
                  <p className="text-foreground font-medium">{phase.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {userTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="UserCircleIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                    <div className="text-xs text-text-secondary">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-text-secondary italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Support Badge */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-surface border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Icon name="GlobeAltIcon" size={24} className="text-primary" />
            <span className="font-semibold text-foreground">Designed for Indian & Global Interviews</span>
          </div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our AI understands cultural nuances and interview styles across India, US, Europe, and remote positions. Questions adapt to regional expectations and industry norms.
          </p>
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
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join professionals who've practiced with AI-powered questions and landed their dream roles
          </p>
          <Link
            href="/landing-page#get-started"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-150 shadow-elevation hover:shadow-card"
          >
            Start Practicing Now
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}