'use client';

import { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import TrustSignals from './TrustSignals';
import PaymentMethods from './PaymentMethods';
import FAQSection from './FAQSection';
import TestimonialCard from './TestimonialCard';

interface PricingFeature {
  text: string;
  included: boolean;
  limit?: string;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
}

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    starter: string | boolean;
    pro: string | boolean;
  }[];
}

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

interface PaymentMethod {
  name: string;
  icon: string;
  alt: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

const PricingInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [billingType, setBillingType] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for exploring our tools and getting started',
    features: [
    { text: 'Resume Audit', included: true, limit: '1 per month' },
    { text: 'Basic Resume Templates', included: true, limit: '2 templates' },
    { text: 'Cover Letter Generator', included: true, limit: '1 per month' },
    { text: 'Interview Questions', included: true, limit: 'Basic set' },
    { text: 'LinkedIn Headline Generator', included: true },
    { text: 'Free Tools Access', included: true },
    { text: 'AI Resume Builder', included: false },
    { text: 'Advanced Templates', included: false },
    { text: 'Priority Support', included: false },
    { text: 'ATS Optimization', included: false }],

    cta: 'Get Started Free',
    ctaLink: '/user-dashboard'
  },
  {
    name: 'Starter',
    price: 499,
    period: 'month',
    description: 'Ideal for active job seekers who need comprehensive tools',
    features: [
    { text: 'Resume Audits', included: true, limit: '10 per month' },
    { text: 'AI Resume Builder', included: true, limit: 'Unlimited' },
    { text: 'Premium Templates', included: true, limit: '10 templates' },
    { text: 'Cover Letters', included: true, limit: '10 per month' },
    { text: 'Interview Preparation', included: true, limit: 'Full access' },
    { text: 'LinkedIn Optimization', included: true },
    { text: 'ATS Optimization', included: true },
    { text: 'Email Support', included: true },
    { text: 'Priority Support', included: false },
    { text: 'Custom Branding', included: false }],

    cta: 'Start 7-Day Trial',
    ctaLink: '/user-dashboard',
    popular: true
  },
  {
    name: 'Pro',
    price: 999,
    period: 'month',
    description: 'For professionals seeking maximum career advancement',
    features: [
    { text: 'Unlimited Resume Audits', included: true },
    { text: 'AI Resume Builder', included: true, limit: 'Unlimited' },
    { text: 'All Premium Templates', included: true, limit: '20+ templates' },
    { text: 'Unlimited Cover Letters', included: true },
    { text: 'Advanced Interview Prep', included: true },
    { text: 'LinkedIn Full Optimization', included: true },
    { text: 'ATS Optimization', included: true },
    { text: 'Priority Support', included: true },
    { text: 'Custom Branding', included: true },
    { text: 'Career Coaching Session', included: true, limit: '1 per month' }],

    cta: 'Start 7-Day Trial',
    ctaLink: '/user-dashboard'
  }];


  const comparisonData: ComparisonFeature[] = [
  {
    category: 'Resume Tools',
    features: [
    { name: 'Resume Audits', free: '1/month', starter: '10/month', pro: 'Unlimited' },
    { name: 'AI Resume Builder', free: false, starter: true, pro: true },
    { name: 'Resume Templates', free: '2', starter: '10', pro: '20+' },
    { name: 'ATS Optimization', free: false, starter: true, pro: true },
    { name: 'Custom Branding', free: false, starter: false, pro: true }]

  },
  {
    category: 'Cover Letters & Applications',
    features: [
    { name: 'Cover Letter Generator', free: '1/month', starter: '10/month', pro: 'Unlimited' },
    { name: 'Job Description Analysis', free: true, starter: true, pro: true },
    { name: 'Tone Customization', free: false, starter: true, pro: true }]

  },
  {
    category: 'Interview Preparation',
    features: [
    { name: 'Interview Questions', free: 'Basic', starter: 'Full Access', pro: 'Advanced' },
    { name: 'STAR Method Training', free: false, starter: true, pro: true },
    { name: 'Mock Interview Sessions', free: false, starter: false, pro: true }]

  },
  {
    category: 'LinkedIn Tools',
    features: [
    { name: 'Headline Generator', free: true, starter: true, pro: true },
    { name: 'Summary Optimization', free: false, starter: true, pro: true },
    { name: 'Profile Review', free: false, starter: false, pro: true }]

  },
  {
    category: 'Support & Resources',
    features: [
    { name: 'Email Support', free: false, starter: true, pro: true },
    { name: 'Priority Support', free: false, starter: false, pro: true },
    { name: 'Career Coaching', free: false, starter: false, pro: '1/month' }]

  }];


  const trustSignals: TrustSignal[] = [
  {
    icon: 'ShieldCheckIcon',
    title: '30-Day Money Back',
    description: 'Not satisfied? Get a full refund within 30 days, no questions asked'
  },
  {
    icon: 'LockClosedIcon',
    title: 'Secure Payments',
    description: 'Your payment information is encrypted and secure with industry standards'
  },
  {
    icon: 'UserGroupIcon',
    title: '10,000+ Happy Users',
    description: 'Join thousands of professionals who landed their dream jobs with us'
  }];


  const paymentMethods: PaymentMethod[] = [
  {
    name: 'UPI',
    icon: "https://img.rocket.new/generatedImages/rocket_gen_img_1375dbf5c-1764616382238.png",
    alt: 'UPI payment logo with orange and green colors'
  },
  {
    name: 'Visa',
    icon: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb877b22-1764616381499.png",
    alt: 'Visa credit card logo in blue and white'
  },
  {
    name: 'Mastercard',
    icon: "https://img.rocket.new/generatedImages/rocket_gen_img_1dce1487a-1764616383190.png",
    alt: 'Mastercard logo with red and orange circles'
  },
  {
    name: 'RuPay',
    icon: "https://img.rocket.new/generatedImages/rocket_gen_img_1c26dbb77-1764616383370.png",
    alt: 'RuPay card logo in orange and green'
  },
  {
    name: 'Net Banking',
    icon: "https://img.rocket.new/generatedImages/rocket_gen_img_184cea4af-1764616381544.png",
    alt: 'Net banking icon with bank building symbol'
  }];


  const faqs: FAQ[] = [
  {
    question: 'Can I switch plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you will be charged the prorated amount for the remainder of your billing cycle. When downgrading, the change will take effect at the start of your next billing cycle.'
  },
  {
    question: 'What happens after my free trial ends?',
    answer: 'After your 7-day free trial ends, you will be automatically charged for the plan you selected. You can cancel anytime during the trial period without being charged. We will send you a reminder email 2 days before your trial ends.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our service for any reason, contact our support team within 30 days of your purchase for a full refund. No questions asked.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use industry-standard encryption and secure payment gateways to protect your payment information. We never store your complete card details on our servers. All transactions are processed through PCI-DSS compliant payment processors.'
  },
  {
    question: 'Can I use CareerMindAI for multiple resumes?',
    answer: 'Yes! All paid plans allow you to create and manage multiple resumes. You can create different versions tailored for different job applications, industries, or career stages. The Free plan is limited to one active resume at a time.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods in India including UPI, Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and popular digital wallets. International users can pay using credit cards and PayPal.'
  },
  {
    question: 'Is there a discount for annual billing?',
    answer: 'Yes! When you choose annual billing, you save 20% compared to monthly billing. For example, the Starter plan costs ₹9,590 per year (₹799/month) instead of ₹11,988 for monthly billing. The savings are automatically applied when you select annual billing.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No refunds are provided for partial months, but you can continue using the service until your subscription expires.'
  }];


  const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'TCS',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c91c5de7-1763296268961.png",
    alt: 'Professional headshot of Indian woman with long dark hair in business attire smiling',
    rating: 5,
    text: 'The Starter plan helped me land 3 interviews in just 2 weeks. The AI resume builder is worth every rupee!'
  },
  {
    name: 'Rahul Verma',
    role: 'Marketing Manager',
    company: 'Flipkart',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15f0f6e6a-1763295844282.png",
    alt: 'Professional headshot of Indian man with short black hair in navy blue suit',
    rating: 5,
    text: 'Upgraded to Pro for the career coaching session. Best investment in my career. Got my dream job at Flipkart!'
  },
  {
    name: 'Anjali Patel',
    role: 'Data Analyst',
    company: 'Amazon',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d71d6fc6-1763295655575.png",
    alt: 'Professional headshot of Indian woman with shoulder-length hair in white blouse',
    rating: 5,
    text: 'Started with the free plan, upgraded to Starter after seeing results. The ATS optimization feature is a game-changer.'
  }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) =>
              <div key={i} className="h-96 bg-muted rounded-xl"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-16">
      <section className="text-center">
        <div className="inline-flex items-center justify-center gap-3 bg-muted px-4 py-2 rounded-full mb-6">
          <span className="text-sm font-medium text-foreground">
            Billing Cycle:
          </span>
          <button
            onClick={() => setBillingType('monthly')}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-150 ${
            billingType === 'monthly' ? 'bg-primary text-primary-foreground shadow-card' : 'text-text-secondary hover:text-foreground'}`
            }>

            Monthly
          </button>
          <button
            onClick={() => setBillingType('annual')}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-150 ${
            billingType === 'annual' ? 'bg-primary text-primary-foreground shadow-card' : 'text-text-secondary hover:text-foreground'}`
            }>

            Annual
            <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Start with our free plan or unlock advanced features with our paid plans. All plans include a 7-day free trial.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pricingPlans.map((plan, index) =>
        <PricingCard
          key={index}
          {...plan}
          billingType={billingType} />

        )}
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Detailed Feature Comparison
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Compare all features across our plans to find the perfect fit for your career goals
          </p>
        </div>
        <ComparisonTable data={comparisonData} />
      </section>

      <section>
        <TrustSignals signals={trustSignals} />
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers with CareerMindAI
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) =>
          <TestimonialCard key={index} testimonial={testimonial} />
          )}
        </div>
      </section>

      <section>
        <PaymentMethods methods={paymentMethods} />
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Got questions? We have answers. If you can't find what you're looking for, contact our support team.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Transform Your Career?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Start your 7-day free trial today. No credit card required for the free plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/user-dashboard"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-150 shadow-elevation">

            Start Free Trial
          </a>
          <a
            href="/landing-page"
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-150">

            Learn More
          </a>
        </div>
      </section>
    </div>);

};

export default PricingInteractive;