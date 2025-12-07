import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface PricingPreviewProps {
  className?: string;
}

const PricingPreview = ({ className = '' }: PricingPreviewProps) => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with basic career tools",
      features: [
        "1 Resume Audit per month",
        "Basic ATS Score",
        "Free Tools Hub access",
        "Community support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Starter",
      price: "₹499",
      period: "per month",
      description: "Ideal for active job seekers with regular applications",
      features: [
        "10 Resume Audits per month",
        "AI Resume Builder",
        "5 Cover Letters",
        "Interview Prep (Basic)",
        "LinkedIn Optimization",
        "Priority email support"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Pro",
      price: "₹999",
      period: "per month",
      description: "Complete toolkit for serious career advancement",
      features: [
        "Unlimited Resume Audits",
        "AI Resume Builder (Advanced)",
        "Unlimited Cover Letters",
        "Interview Prep (Advanced)",
        "LinkedIn Optimization (Pro)",
        "Career Coaching Sessions",
        "24/7 Priority support"
      ],
      cta: "Go Pro",
      highlighted: false
    }
  ];

  return (
    <section className={`bg-background py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the plan that fits your career goals. All plans include core features.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-surface border rounded-xl p-8 shadow-card hover:shadow-elevation transition-all duration-150 ${
                tier.highlighted ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border'
              }`}
            >
              {tier.highlighted && (
                <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-text-secondary ml-2">/ {tier.period}</span>
              </div>
              <p className="text-text-secondary mb-6">{tier.description}</p>
              <Link
                href="/pricing-plans"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-150 mb-6 ${
                  tier.highlighted
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-card'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {tier.cta}
              </Link>
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/pricing-plans"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-150"
          >
            View detailed pricing comparison
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;