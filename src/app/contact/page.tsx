import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '../landing-page/components/FooterSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact CareerMindAI – Support & Enquiries',
  description:
    'Get in touch with CareerMindAI for support, feedback, or partnership enquiries. Reach us at careermindai28@gmail.com.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              For support, feedback, or partnership enquiries, reach us at{' '}
              <a
                href="mailto:careermindai28@gmail.com"
                className="text-primary hover:underline"
              >
                careermindai28@gmail.com
              </a>
            </p>
          </div>

          {/* Contact Form and Info Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}