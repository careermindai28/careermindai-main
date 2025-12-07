import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface UpgradePromptProps {
  className?: string;
}

const UpgradePrompt = ({ className = '' }: UpgradePromptProps) => {
  const premiumFeatures = [
    'Unlimited resume audits with detailed scoring',
    'AI-powered resume builder with 20+ templates',
    'Personalized cover letter generation',
    'Mock interview preparation with AI feedback',
    'LinkedIn profile optimization tools',
    'Priority support and updates',
  ];

  return (
    <div className={`bg-gradient-to-br from-primary via-accent to-secondary rounded-xl p-8 lg:p-12 text-primary-foreground ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="SparklesIcon" size={16} />
            <span>Premium Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Supercharge Your Career?
          </h2>
          <p className="text-lg opacity-90">
            Unlock the full power of CareerMindAI with our premium tools and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Icon name="CheckCircleIcon" size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/pricing-plans"
            className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-semibold transition-all duration-150 shadow-elevation hover:shadow-modal text-center"
          >
            View Pricing Plans
          </Link>
          <Link
            href="/user-dashboard"
            className="w-full sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-150 text-center"
          >
            Start Free Trial
          </Link>
        </div>

        <p className="text-center text-sm opacity-75 mt-6">
          No credit card required • Cancel anytime • 7-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default UpgradePrompt;