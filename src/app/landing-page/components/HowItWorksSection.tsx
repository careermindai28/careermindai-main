import Icon from '@/components/ui/AppIcon';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = ({ className = '' }: HowItWorksSectionProps) => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Upload Your Resume",
      description: "Simply upload your existing resume in PDF or DOCX format. Our AI will analyze it instantly.",
      icon: "CloudArrowUpIcon"
    },
    {
      number: 2,
      title: "Get ResumeMind Score",
      description: "Receive a comprehensive score with detailed breakdowns of ATS compatibility, content quality, and formatting.",
      icon: "ChartBarIcon"
    },
    {
      number: 3,
      title: "Optimize with AI",
      description: "Use our AI-powered tools to rebuild your resume, generate cover letters, and prepare for interviews.",
      icon: "SparklesIcon"
    },
    {
      number: 4,
      title: "Land Your Dream Job",
      description: "Apply with confidence knowing your resume is optimized to beat ATS systems and impress recruiters.",
      icon: "TrophyIcon"
    }
  ];

  return (
    <section className={`bg-background py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get started in minutes and transform your job search with AI-powered tools
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-all duration-150 h-full">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Icon name={step.icon as any} size={32} className="text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary">
                  {step.description}
                </p>
              </div>
              {step.number < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <Icon name="ArrowRightIcon" size={24} className="text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;