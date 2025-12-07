import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CareerMindAI Terms of Service',
  description: 'Terms of Service for using CareerMindAI platform - AI-powered resume building, cover letter generation, and career development tools.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-text-secondary">
              Last Updated: December 2, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <p className="text-foreground leading-relaxed">
                Welcome to CareerMindAI. By accessing or using our platform, you agree to be bound by these Terms of Service. 
                Please read them carefully before using our AI-powered career development tools.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  By creating an account, accessing, or using CareerMindAI services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
                <p>
                  If you do not agree with any part of these terms, you may not access or use our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the platform after changes 
                  constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Service Description
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  CareerMindAI is an AI-powered career platform built to help job seekers create ATS-optimized resumes, 
                  cover letters, LinkedIn profiles, and interview preparation – powered by our ResumeMind Score<sup>TM</sup> engine 
                  and built in Mumbai, India, for both Indian and global job markets.
                </p>
                <p className="font-medium">Our services include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Resume audit and scoring using ResumeMind Score<sup>TM</sup></li>
                  <li>AI-powered resume building and optimization</li>
                  <li>Cover letter generation</li>
                  <li>Interview preparation tools</li>
                  <li>LinkedIn profile optimization</li>
                  <li>Free career development tools</li>
                </ul>
                <p>
                  Service availability and features may vary based on your subscription plan (Free, Starter ₹499/month, Pro ₹999/month).
                </p>
              </div>
            </section>

            {/* Use of the Service */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Use of the Service
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="font-medium">You agree to use CareerMindAI only for lawful purposes and in accordance with these terms:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You must provide accurate and complete registration information</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must not use the service to violate any laws or regulations</li>
                  <li>You must not attempt to reverse engineer, modify, or hack our platform</li>
                  <li>You must not use our service to generate content that is discriminatory, offensive, or illegal</li>
                  <li>You must not share your account with others or create multiple accounts to circumvent usage limits</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-semibold text-blue-800 mb-2">🔒 Sensitive Data Notice</p>
                  <p className="text-sm">
                    <strong>CareerMindAI does not request or store government identity numbers such as PAN, Aadhaar, 
                    passport, or driving licence details.</strong> If you include such information in your uploaded 
                    documents, we strongly recommend removing it to protect your privacy.
                  </p>
                </div>
                <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <strong className="text-yellow-800">⚠️ Important:</strong> We reserve the right to suspend or terminate 
                  accounts that violate these terms without prior notice or refund.
                </p>
              </div>
            </section>

            {/* AI-Generated Content Disclaimer */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. AI-Generated Content Disclaimer
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <strong className="text-blue-800">📝 Critical Notice:</strong> All content generated by CareerMindAI, 
                  including resumes, cover letters, interview responses, and LinkedIn profiles, is created using artificial 
                  intelligence and should be reviewed, verified, and customized before submission to employers.
                </p>
                <p>
                  While we strive to provide accurate and relevant content, AI-generated material may contain errors, 
                  inaccuracies, or content that requires personalization. You are solely responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reviewing all AI-generated content for accuracy and relevance</li>
                  <li>Verifying that generated content accurately represents your skills and experience</li>
                  <li>Ensuring all statements in your resume and cover letters are truthful</li>
                  <li>Customizing generic content to match specific job requirements</li>
                  <li>Compliance with any industry-specific regulations or standards</li>
                </ul>
                <p className="font-medium mt-4">
                  CareerMindAI is not responsible for any consequences arising from the use of AI-generated content, 
                  including but not limited to job application rejections, employment issues, or misrepresentation.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Intellectual Property Rights
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="font-medium">Platform Ownership:</p>
                <p>
                  CareerMindAI and its original content, features, and functionality (including the ResumeMind Score<sup>TM</sup> engine) 
                  are owned by CareerMindAI and are protected by international copyright, trademark, patent, trade secret, and 
                  other intellectual property laws.
                </p>
                <p className="font-medium mt-4">Your Content:</p>
                <p>
                  You retain all rights to the personal information and career data you provide to our platform. 
                  By using our services, you grant CareerMindAI a limited, non-exclusive license to use your data 
                  solely for the purpose of providing our services to you.
                </p>
                <p className="font-medium mt-4">AI-Generated Content:</p>
                <p>
                  Content generated by our AI tools (resumes, cover letters, etc.) based on your input is provided 
                  for your personal use. You may use, modify, and distribute this content as needed for your career 
                  development purposes.
                </p>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Payment Terms & Subscriptions
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="font-medium">Subscription Plans:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Free Plan:</strong> ₹0/month - Basic resume audit and limited tools</li>
                  <li><strong>Starter Plan:</strong> ₹499/month - Full access to all tools with standard limits</li>
                  <li><strong>Pro Plan:</strong> ₹999/month - Maximum features and higher usage limits</li>
                </ul>
                <p className="font-medium mt-4">Billing:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Subscription fees are billed monthly in advance</li>
                  <li>Payment is processed automatically through our secure payment gateway</li>
                  <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                  <li>Subscription automatically renews unless cancelled before the renewal date</li>
                </ul>
                <p className="font-medium mt-4">Cancellation:</p>
                <p>
                  You may cancel your subscription at any time through your account settings. Cancellation will be 
                  effective at the end of your current billing period. No partial refunds are provided for unused 
                  time in the current billing cycle.
                </p>
                <p className="mt-4">
                  For refund eligibility and process, please refer to our{' '}
                  <Link href="/legal/refund" className="text-primary hover:underline">
                    Refund Policy
                  </Link>.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  To the maximum extent permitted by applicable law, CareerMindAI and its affiliates, officers, 
                  employees, agents, partners, and licensors shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Job application rejections or employment-related losses</li>
                  <li>Data loss or corruption</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Use or inability to use our services</li>
                </ul>
                <p className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <strong>Service "As Is":</strong> CareerMindAI is provided "as is" and "as available" without 
                  warranties of any kind, either express or implied, including but not limited to warranties of 
                  merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p className="mt-4">
                  Our total liability for any claims arising from your use of the service shall not exceed the 
                  amount you paid to CareerMindAI in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            {/* Account Termination */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Account Termination
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="font-medium">Termination by You:</p>
                <p>
                  You may terminate your account at any time by contacting our support team at{' '}
                  <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                    careermindai28@gmail.com
                  </a>{' '}
                  or through your account settings. Upon termination, your access to paid features will continue 
                  until the end of your current billing period.
                </p>
                <p className="font-medium mt-4">Termination by Us:</p>
                <p>
                  We reserve the right to suspend or terminate your account immediately, without prior notice or 
                  liability, for any reason, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation of these Terms of Service</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Abuse of our services or resources</li>
                  <li>Non-payment of subscription fees</li>
                  <li>Providing false or misleading information</li>
                </ul>
                <p className="mt-4">
                  Upon termination, your right to use the service will immediately cease. We may delete your account 
                  data in accordance with our data retention policies outlined in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Dispute Resolution & Governing Law
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="font-medium">Governing Law:</p>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, 
                  without regard to its conflict of law provisions.
                </p>
                <p className="font-medium mt-4">Dispute Resolution:</p>
                <p>
                  In the event of any dispute arising from these terms or your use of CareerMindAI, both parties 
                  agree to first attempt to resolve the dispute through good-faith negotiation.
                </p>
                <p className="mt-4">
                  If the dispute cannot be resolved through negotiation within 30 days, the parties agree to 
                  resolve the dispute through binding arbitration in Mumbai, India, in accordance with the 
                  Arbitration and Conciliation Act, 1996.
                </p>
                <p className="font-medium mt-4">Jurisdiction:</p>
                <p>
                  For any legal matters not subject to arbitration, the courts of Mumbai, Maharashtra, India 
                  shall have exclusive jurisdiction.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Changes to Terms
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  We reserve the right to modify or replace these Terms of Service at any time at our sole discretion. 
                  We will provide notice of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Updating the "Last Updated" date at the top of this page</li>
                  <li>Sending an email notification to your registered email address</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="mt-4">
                  Your continued use of CareerMindAI after any changes to these terms constitutes acceptance of 
                  the modified terms. If you do not agree to the new terms, you must stop using our services and 
                  may terminate your account.
                </p>
                <p className="mt-4 font-medium">
                  We encourage you to review these Terms periodically to stay informed about our policies.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Contact Us
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  If you have any questions, concerns, or feedback about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="font-medium">CareerMindAI Support</p>
                  <p className="mt-2">
                    Email:{' '}
                    <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                      careermindai28@gmail.com
                    </a>
                  </p>
                  <p className="mt-1">Location: Mumbai, India</p>
                  <p className="mt-2">
                    For additional support, visit our{' '}
                    <Link href="/help-center" className="text-primary hover:underline">
                      Help Center
                    </Link>{' '}
                    or{' '}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact Page
                    </Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance Acknowledgment */}
            <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <p className="text-foreground leading-relaxed">
                <strong>By using CareerMindAI, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms of Service.</strong> If you have any questions or do not agree with any part of these 
                terms, please contact us before using our services.
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Legal Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/privacy-policy" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Privacy Policy
              </Link>
              <Link 
                href="/legal/refund" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Refund Policy
              </Link>
              <Link 
                href="/faq" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> FAQ
              </Link>
              <Link 
                href="/contact" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}