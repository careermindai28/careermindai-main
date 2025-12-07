'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface PricingFeature {
  text: string;
  included: boolean;
  limit?: string;
}

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  billingType: 'monthly' | 'annual';
}

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  popular = false,
  billingType,
}: PricingCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const annualPrice = billingType === 'annual' ? Math.floor(price * 12 * 0.8) : price * 12;
  const monthlySavings = billingType === 'annual' ? Math.floor(price * 0.2) : 0;

  return (
    <div
      className={`relative bg-surface rounded-xl border-2 transition-all duration-300 hover:shadow-elevation ${
        popular
          ? 'border-primary shadow-card scale-105'
          : 'border-border hover:border-primary/50'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-card">
          Most Popular
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-bold text-foreground">
              {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
            </span>
            {price > 0 && (
              <span className="text-text-secondary text-lg">/{period}</span>
            )}
          </div>
          {isHydrated && billingType === 'annual' && price > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-success font-medium">
                Save ₹{monthlySavings.toLocaleString('en-IN')}/month
              </p>
              <p className="text-xs text-text-secondary">
                Billed annually at ₹{annualPrice.toLocaleString('en-IN')}
              </p>
            </div>
          )}
        </div>

        <Link
          href={ctaLink}
          className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-150 mb-6 ${
            popular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-elevation'
              : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
          }`}
        >
          {cta}
        </Link>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground mb-4">
            What's included:
          </p>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon
                name={feature.included ? 'CheckCircleIcon' : 'XCircleIcon'}
                size={20}
                variant="solid"
                className={`flex-shrink-0 mt-0.5 ${
                  feature.included ? 'text-success' : 'text-text-secondary/40'
                }`}
              />
              <div className="flex-1">
                <span
                  className={`text-sm ${
                    feature.included ? 'text-foreground' : 'text-text-secondary/60'
                  }`}
                >
                  {feature.text}
                </span>
                {feature.limit && (
                  <span className="text-xs text-text-secondary ml-2">
                    ({feature.limit})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;