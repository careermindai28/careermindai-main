import type { Metadata } from 'next';
import PublicHeader from '@/components/common/PublicHeader';
import FooterSection from '@/app/landing-page/components/FooterSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CareerMindAI Privacy Policy',
  description: 'Privacy Policy for CareerMindAI - Learn how we collect, use, protect, and manage your personal information and career data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-text-secondary">
              Last Updated: December 3, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <p className="text-foreground leading-relaxed">
                At CareerMindAI, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform and services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                  <p className="mb-2">When you create an account or use our services, we may collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Profile information (professional summary, work experience, education)</li>
                    <li>Resume and cover letter content</li>
                    <li>Job application information and preferences</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
                  <p className="mb-2">We automatically collect certain information about your device and usage patterns:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and features used</li>
                    <li>Time and date of visits</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies, web beacons, and similar tracking technologies to enhance your experience, 
                    analyze usage patterns, and deliver personalized content. You can control cookie preferences 
                    through your browser settings.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Do Not Collect */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Information We Do Not Collect
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-semibold text-blue-800 mb-2">🔒 Sensitive Data Protection</p>
                  <p className="text-sm">
                    <strong>CareerMindAI does not request or store government identity numbers such as PAN, Aadhaar, 
                    passport, or driving licence details.</strong>
                  </p>
                </div>
                <p className="mt-4">
                  We also do not collect sensitive personal information such as:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Financial information (credit card details, bank account numbers)</li>
                  <li>Health or medical information</li>
                  <li>Biometric data</li>
                  <li>Social Security Numbers or similar government identifiers</li>
                  <li>Religious or political affiliations</li>
                </ul>
                <p className="mt-4">
                  If you choose to include any of this information in your resume or other documents you upload, 
                  we strongly recommend removing it before submission to protect your privacy.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Delivery:</strong> To provide resume auditing, AI-powered content generation, 
                  and career development tools</li>
                  <li><strong>Account Management:</strong> To create and manage your account, authenticate users, 
                  and provide customer support</li>
                  <li><strong>Improvement:</strong> To analyze usage patterns and improve our platform features, 
                  functionality, and user experience</li>
                  <li><strong>Communication:</strong> To send service updates, security alerts, and respond to 
                  your inquiries</li>
                  <li><strong>Personalization:</strong> To customize content and recommendations based on your 
                  preferences and usage</li>
                  <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
                  <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our 
                  Terms of Service</li>
                </ul>
              </div>
            </section>

            {/* Data Sharing and Disclosure */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Data Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p className="font-medium">We do not sell your personal information to third parties. We may share your information only in the following circumstances:</p>
                
                <div>
                  <h3 className="font-semibold mb-2">Service Providers</h3>
                  <p className="text-sm">
                    We work with trusted third-party service providers who assist us in operating our platform 
                    (hosting, analytics, payment processing). These providers are contractually bound to protect 
                    your data and use it only for specified purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-sm">
                    We may disclose your information if required by law, court order, or government regulation, 
                    or to protect our rights, property, or safety.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Business Transfers</h3>
                  <p className="text-sm">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                    to the acquiring entity, subject to the same privacy protections.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">With Your Consent</h3>
                  <p className="text-sm">
                    We may share your information with third parties when you explicitly consent to such sharing.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Data Security
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your personal information from 
                  unauthorized access, alteration, disclosure, or destruction. Our security practices include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest using SSL/TLS protocols</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data storage with backup and disaster recovery procedures</li>
                  <li>Employee training on data protection and privacy best practices</li>
                </ul>
                <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
                  <strong className="text-yellow-800">⚠️ Important:</strong> While we strive to protect your 
                  information, no method of transmission over the internet is 100% secure. You are responsible 
                  for maintaining the confidentiality of your account credentials.
                </p>
              </div>
            </section>

            {/* Your Rights and Choices */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Your Rights and Choices
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>You have the following rights regarding your personal information:</p>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold mb-1">Access and Portability</p>
                    <p className="text-sm">Request a copy of your personal data in a structured, commonly used format</p>
                  </div>
                  <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold mb-1">Correction</p>
                    <p className="text-sm">Update or correct inaccurate or incomplete personal information</p>
                  </div>
                  <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold mb-1">Deletion</p>
                    <p className="text-sm">Request deletion of your personal data (subject to legal retention requirements)</p>
                  </div>
                  <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold mb-1">Opt-Out</p>
                    <p className="text-sm">Unsubscribe from marketing communications at any time</p>
                  </div>
                  <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                    <p className="font-semibold mb-1">Restriction</p>
                    <p className="text-sm">Limit how we use or process your personal information</p>
                  </div>
                </div>
                <p className="mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                    careermindai28@gmail.com
                  </a>. 
                  We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Data Retention
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  We retain your personal information for as long as necessary to provide our services and comply 
                  with legal obligations. Specific retention periods include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Data:</strong> Retained while your account is active and for 90 days after 
                  account closure (unless you request immediate deletion)</li>
                  <li><strong>Resume and Career Documents:</strong> Stored for the duration of your subscription 
                  and 30 days after cancellation</li>
                  <li><strong>Usage Data:</strong> Aggregated and anonymized data may be retained indefinitely 
                  for analytics</li>
                  <li><strong>Support Communications:</strong> Retained for 2 years for customer service purposes</li>
                </ul>
                <p className="mt-4">
                  You may request earlier deletion by contacting our support team, subject to legal and 
                  regulatory retention requirements.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Children's Privacy
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  CareerMindAI is not intended for users under the age of 18. We do not knowingly collect personal 
                  information from children. If we become aware that we have inadvertently collected data from a 
                  child without parental consent, we will take steps to delete that information promptly.
                </p>
                <p>
                  If you believe we have collected information from a child, please contact us immediately at{' '}
                  <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                    careermindai28@gmail.com
                  </a>.
                </p>
              </div>
            </section>

            {/* International Data Transfers */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. International Data Transfers
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your country of 
                  residence. These countries may have different data protection laws than your jurisdiction.
                </p>
                <p>
                  When we transfer your personal information internationally, we ensure appropriate safeguards 
                  are in place to protect your data, including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Standard contractual clauses approved by relevant authorities</li>
                  <li>Data processing agreements with third-party service providers</li>
                  <li>Compliance with applicable data protection regulations</li>
                </ul>
              </div>
            </section>

            {/* Updates to Privacy Policy */}
            <section className="bg-surface p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Updates to This Privacy Policy
              </h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  technology, legal requirements, or other operational needs. We will notify you of material 
                  changes by:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Updating the "Last Updated" date at the top of this policy</li>
                  <li>Sending an email notification to your registered email address</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="mt-4">
                  Your continued use of CareerMindAI after changes to this Privacy Policy constitutes acceptance 
                  of the updated terms. We encourage you to review this policy periodically.
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
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                  practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="font-medium">CareerMindAI Privacy Team</p>
                  <p className="mt-2">
                    Email:{' '}
                    <a href="mailto:careermindai28@gmail.com" className="text-primary hover:underline">
                      careermindai28@gmail.com
                    </a>
                  </p>
                  <p className="mt-1">Location: Mumbai, India</p>
                  <p className="mt-2 text-sm text-text-secondary">
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
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <p className="text-foreground leading-relaxed">
                <strong>By using CareerMindAI, you acknowledge that you have read, understood, and agree to 
                this Privacy Policy.</strong> If you do not agree with any part of this policy, please do not 
                use our services.
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Legal Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/legal/terms" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <span>→</span> Terms of Service
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