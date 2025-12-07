import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CareerMindAI Refund Policy',
  description: 'Refund policy for CareerMindAI subscriptions - eligibility criteria, refund process, timelines, and customer protection guidelines.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Refund Policy
            </h1>
            <p className="text-text-secondary">
              Last Updated: December 2, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="bg-surface p-6 rounded-lg border border-border mb-8">
            <p className="text-foreground leading-relaxed">
              At CareerMindAI, we strive to provide exceptional value through our AI-powered career development tools. 
              This Refund Policy outlines the circumstances under which refunds may be issued and the process for 
              requesting them. Please read this policy carefully to understand your rights and our refund procedures.
            </p>
          </section>

          {/* Main Content */}
          <div className="space-y-8">
            {/* General Refund Policy */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. General Refund Policy
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <strong className="text-yellow-800">⚠️ Important Notice:</strong> CareerMindAI subscriptions are 
                  for digital services and are generally non-refundable once features or credits have been used. 
                  However, we understand that exceptional circumstances may arise, and we evaluate refund requests 
                  on a case-by-case basis.
                </p>
                <p className="mt-4">
                  As a digital subscription service providing immediate access to AI-powered tools, content generation, 
                  and career resources, refunds are subject to the conditions outlined in this policy.
                </p>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-semibold text-blue-800 mb-2">🔒 Data Privacy Note</p>
                  <p className="text-sm">
                    <strong>CareerMindAI does not request or store government identity numbers such as PAN, Aadhaar, 
                    passport, or driving licence details.</strong> All payment processing is handled through secure 
                    third-party providers who comply with industry security standards.
                  </p>
                </div>
              </div>
            </section>

            {/* Refund Eligibility */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Refund Eligibility Criteria
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold mb-3">30-Day Satisfaction Guarantee</h3>
                  <p>
                    For Starter (₹499/month) and Pro (₹999/month) plan subscribers, we offer a 30-day satisfaction guarantee:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Request must be made within 30 days of initial subscription purchase</li>
                    <li>Account must show minimal usage (less than 5 resume audits or content generations)</li>
                    <li>No previous refunds have been issued for the same account</li>
                    <li>Account must be in good standing with no violations of Terms of Service</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Eligible Refund Scenarios</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="font-medium text-green-800">✓ Technical Issues</p>
                      <p className="text-sm mt-1">
                        Persistent technical problems preventing access to core features despite support attempts
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="font-medium text-green-800">✓ Duplicate Charges</p>
                      <p className="text-sm mt-1">
                        Accidental duplicate payment or billing errors on our end
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="font-medium text-green-800">✓ Subscription Cancellation Issues</p>
                      <p className="text-sm mt-1">
                        Charges after subscription was cancelled within the required notice period
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="font-medium text-green-800">✓ Service Not as Described</p>
                      <p className="text-sm mt-1">
                        Core features significantly differ from advertised capabilities (within 30 days, minimal usage)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Non-Refundable Scenarios</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="font-medium text-red-800">✗ Extensive Usage</p>
                      <p className="text-sm mt-1">
                        Accounts showing significant usage (more than 5 resume audits, multiple content generations)
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="font-medium text-red-800">✗ Renewal Charges</p>
                      <p className="text-sm mt-1">
                        Automatic subscription renewals (you must cancel before renewal date)
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="font-medium text-red-800">✗ Change of Mind</p>
                      <p className="text-sm mt-1">
                        Simple change of mind after extensive use of services
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="font-medium text-red-800">✗ Job Application Results</p>
                      <p className="text-sm mt-1">
                        Dissatisfaction with job application outcomes or interview results
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="font-medium text-red-800">✗ Terms Violations</p>
                      <p className="text-sm mt-1">
                        Accounts suspended or terminated for violating Terms of Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Request Process */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. How to Request a Refund
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  If you believe you qualify for a refund based on the criteria above, please follow these steps:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Contact Support</h3>
                      <p className="text-sm">
                        Email us at{' '}
                        <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                          careermindai28@gmail.com
                        </a>{' '}
                        with the subject line "Refund Request"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Provide Required Information</h3>
                      <p className="text-sm mb-2">Include the following details in your email:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                        <li>Your registered email address and account name</li>
                        <li>Subscription plan (Starter or Pro)</li>
                        <li>Date of purchase/subscription start</li>
                        <li>Detailed reason for refund request</li>
                        <li>Transaction ID or payment confirmation (if available)</li>
                        <li>Description of any technical issues (with screenshots if applicable)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Account Verification</h3>
                      <p className="text-sm">
                        Our team will verify your account details, usage history, and eligibility for a refund
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Review & Decision</h3>
                      <p className="text-sm">
                        We will review your request within 5-7 business days and notify you of our decision via email
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Refund Processing</h3>
                      <p className="text-sm">
                        If approved, refunds are processed within 7-10 business days to your original payment method
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Processing Timelines */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Refund Processing Timelines
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Stage
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Timeline
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm">Initial Review</td>
                        <td className="px-4 py-3 text-sm">1-2 business days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Decision Notification</td>
                        <td className="px-4 py-3 text-sm">5-7 business days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Refund Processing (if approved)</td>
                        <td className="px-4 py-3 text-sm">7-10 business days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Bank Processing Time</td>
                        <td className="px-4 py-3 text-sm">3-5 business days (varies by bank)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <strong className="text-blue-800">📌 Note:</strong> Total time from refund request to funds 
                  appearing in your account may take up to 15-20 business days depending on your payment method 
                  and financial institution.
                </p>
              </div>
            </section>

            {/* Payment Method-Specific Information */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Refund Methods by Payment Type
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-semibold mb-2">💳 Credit/Debit Cards</h3>
                  <p className="text-sm">
                    Refunds are processed back to the original card. Processing time: 7-10 business days after 
                    approval. The refund will appear as a credit on your card statement.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-semibold mb-2">📱 UPI Payments</h3>
                  <p className="text-sm">
                    Refunds are processed to the original UPI ID. Processing time: 5-7 business days after approval. 
                    You will receive a notification from your UPI app when the refund is credited.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-semibold mb-2">🏦 Net Banking</h3>
                  <p className="text-sm">
                    Refunds are processed to the bank account used for payment. Processing time: 7-10 business days 
                    after approval. The refund will appear in your bank statement.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h3 className="font-semibold mb-2">💰 Digital Wallets</h3>
                  <p className="text-sm">
                    Refunds are processed to the original wallet. Processing time: 5-7 business days after approval. 
                    You will receive a notification from your wallet provider.
                  </p>
                </div>
              </div>
            </section>

            {/* Prorated Refunds */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Prorated Refunds & Partial Months
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  In exceptional cases where a refund is approved after significant subscription time has passed, 
                  we may issue a prorated refund based on unused subscription time:
                </p>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mt-4">
                  <p className="font-medium mb-2">Prorated Refund Calculation:</p>
                  <p className="text-sm mb-2">
                    Refund Amount = (Monthly Subscription Cost ÷ 30) × Unused Days
                  </p>
                  <p className="text-sm mt-3">
                    <strong>Example:</strong> Pro plan subscriber (₹999/month) requests refund after 10 days of use:
                  </p>
                  <p className="text-sm ml-4 mt-1">
                    Refund = (₹999 ÷ 30) × 20 unused days = ₹666 (approximately)
                  </p>
                </div>
                <p className="mt-4 text-sm">
                  <strong>Important:</strong> Prorated refunds are only considered in cases of technical failures, 
                  service disruptions, or other circumstances where the fault lies with CareerMindAI. Standard 
                  cancellations do not qualify for prorated refunds.
                </p>
              </div>
            </section>

            {/* Alternative Resolution Options */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Alternative Resolution Options
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  Before requesting a refund, consider these alternative options that may better address your concerns:
                </p>
                <div className="space-y-3 mt-4">
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <h3 className="font-semibold mb-1">💡 Account Credit</h3>
                    <p className="text-sm">
                      Instead of a refund, receive account credits for future use or upgrade to a different plan 
                      that better suits your needs
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <h3 className="font-semibold mb-1">📉 Plan Downgrade</h3>
                    <p className="text-sm">
                      Switch to a lower-cost plan (from Pro to Starter, or Starter to Free) instead of cancelling 
                      completely
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <h3 className="font-semibold mb-1">⏱️ Extended Trial</h3>
                    <p className="text-sm">
                      For technical issues, we may offer extended access while we resolve the problem instead of 
                      processing a refund
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                    <h3 className="font-semibold mb-1">🆘 Technical Support</h3>
                    <p className="text-sm">
                      Work with our support team to resolve technical issues or learn how to better utilize 
                      platform features
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <h3 className="font-semibold mb-2">Q: Can I get a refund if I'm not satisfied with AI-generated content?</h3>
                  <p className="text-sm text-text-secondary">
                    A: Refunds based solely on dissatisfaction with AI content are generally not provided, as our 
                    service requires user customization and verification. However, if there's a technical issue preventing content generation, we'll investigate and may issue a refund if appropriate.
                  </p>
                </div>
                <div className="border-b border-border pb-4">
                  <h3 className="font-semibold mb-2">Q: What happens to my data if I get a refund?</h3>
                  <p className="text-sm text-text-secondary">
                    A: Your account and data will be retained for 30 days after refund processing. You can 
                    download your data during this period. After 30 days, data is permanently deleted in 
                    accordance with our Privacy Policy.
                  </p>
                </div>
                <div className="border-b border-border pb-4">
                  <h3 className="font-semibold mb-2">Q: Can I get a refund for unused credits or features?</h3>
                  <p className="text-sm text-text-secondary">
                    A: Unused credits or features are not refundable. Subscription pricing includes access to 
                    all features within your plan tier, regardless of usage level.
                  </p>
                </div>
                <div className="border-b border-border pb-4">
                  <h3 className="font-semibold mb-2">Q: How do I prevent automatic renewal charges?</h3>
                  <p className="text-sm text-text-secondary">
                    A: Cancel your subscription at least 24 hours before your renewal date through your account 
                    settings. You'll retain access until the end of your billing period.
                  </p>
                </div>
                <div className="pb-4">
                  <h3 className="font-semibold mb-2">Q: What if my refund request is denied?</h3>
                  <p className="text-sm text-text-secondary">
                    A: If your refund request is denied, we'll provide a detailed explanation. You can appeal the 
                    decision or explore alternative resolution options by contacting our support team.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Contact Billing Support
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  For any questions about refunds, billing issues, or subscription concerns, please contact our 
                  dedicated billing support team:
                </p>
                <div className="mt-4 p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                  <p className="font-semibold text-lg mb-3">📧 Billing Support Contact</p>
                  <div className="space-y-2">
                    <p>
                      Email:{' '}
                      <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline font-medium">
                        careermindai28@gmail.com
                      </a>
                    </p>
                    <p className="text-sm text-text-secondary">
                      Subject Line: "Refund Request" or "Billing Inquiry"
                    </p>
                    <p className="text-sm text-text-secondary mt-3">
                      Response Time: We aim to respond within 24-48 hours during business days
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  For general support inquiries, visit our{' '}
                  <Link href="/help-center" className="text-primary hover:underline">
                    Help Center
                  </Link>{' '}
                  or{' '}
                  <Link href="/contact" className="text-primary hover:underline">
                    Contact Page
                  </Link>.
                </p>
              </div>
            </section>

            {/* Policy Changes */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Changes to Refund Policy
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective 
                  immediately upon posting to our website. We will notify users of significant changes via:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email notification to registered users</li>
                  <li>Notice on the platform dashboard</li>
                  <li>Update to the "Last Updated" date at the top of this page</li>
                </ul>
                <p className="mt-4">
                  Your continued use of CareerMindAI after policy changes constitutes acceptance of the 
                  modified Refund Policy.
                </p>
              </div>
            </section>

            {/* Final Note */}
            <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <p className="text-foreground leading-relaxed">
                <strong>Our Commitment:</strong> While our services are generally non-refundable, we are committed 
                to customer satisfaction and fair treatment. Each refund request is reviewed individually, and we 
                work to find reasonable solutions when genuine issues arise. We encourage you to reach out to our 
                support team before making a purchase if you have specific concerns or questions about our services.
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Information</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/legal/terms" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Terms of Service
              </Link>
              <Link 
                href="/privacy-policy" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Privacy Policy
              </Link>
              <Link 
                href="/pricing-plans" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> View Pricing Plans
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