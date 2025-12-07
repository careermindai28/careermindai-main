import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import Breadcrumb from '@/components/common/Breadcrumb';
import PricingInteractive from './components/PricingInteractive';

export const metadata: Metadata = {
  title: 'Pricing Plans - CareerMindAI',
  description: 'Choose the perfect plan for your career development journey. Compare features across Free, Starter, and Pro plans with transparent pricing in INR. Start with a 7-day free trial.',
};

export default function PricingPlansPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Breadcrumb />
        </div>

        <PricingInteractive />
      </main>

      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">CareerMindAI</h3>
              <p className="text-sm text-text-secondary">
                AI-powered career development platform helping professionals land their dream jobs.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/pricing-plans" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/free-tools-hub" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Free Tools
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/landing-page" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} CareerMindAI. All rights reserved. Made with ❤️ in Mumbai, India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}