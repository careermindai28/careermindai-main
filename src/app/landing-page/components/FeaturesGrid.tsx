import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Feature {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

interface FeaturesGridProps {
  className?: string;
}

const FeaturesGrid = ({ className = '' }: FeaturesGridProps) => {
  const features: Feature[] = [
    {
      title: "Resume Audit",
      description: "Get instant AI-powered analysis with ResumeMind Score, ATS compatibility check, and actionable improvement suggestions.",
      icon: "DocumentMagnifyingGlassIcon",
      link: "/resume-audit-info",
      color: "primary"
    },
    {
      title: "AI Resume Builder",
      description: "Build ATS-optimized resumes with professional templates, AI content generation, and real-time preview.",
      icon: "DocumentTextIcon",
      link: "/resume-builder-info",
      color: "secondary"
    },
    {
      title: "Cover Letter Generator",
      description: "Create personalized cover letters tailored to specific job descriptions with AI-powered content suggestions.",
      icon: "DocumentIcon",
      link: "/cover-letter-info",
      color: "accent"
    },
    {
      title: "Interview Preparation",
      description: "Practice with AI-generated questions for HR rounds, technical interviews, and behavioral assessments using STAR method.",
      icon: "ChatBubbleLeftRightIcon",
      link: "/interview-prep-info",
      color: "success"
    },
    {
      title: "LinkedIn Optimization",
      description: "Optimize your LinkedIn profile with AI-generated headlines, summaries, and keyword suggestions for better visibility.",
      icon: "UserCircleIcon",
      link: "/linkedin-optimizer-info",
      color: "warning"
    },
    {
      title: "Free Tools Hub",
      description: "Access free utilities including JD keyword extractor, resume word counter, and salary calculator.",
      icon: "WrenchScrewdriverIcon",
      link: "/free-tools-hub",
      color: "primary"
    }
  ];

  return (
    <section className={`bg-surface py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Career Tools
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to succeed in your job search, powered by advanced AI technology
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevation transition-all duration-150 group"
            >
              <div className={`flex items-center justify-center w-14 h-14 bg-${feature.color}/10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-150`}>
                <Icon name={feature.icon as any} size={28} className={`text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-150">
                {feature.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-150">
                <span>Learn more</span>
                <Icon name="ArrowRightIcon" size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-150" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;