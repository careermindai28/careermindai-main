'use client';

const PolicyContent = () => {
  return (
    <div className="bg-surface rounded-2xl shadow-card border border-border p-8 lg:p-12 space-y-12">
      {/* Introduction */}
      <section>
        <p className="text-text-secondary leading-relaxed mb-4">
          CareerMindAI is an AI-powered career platform built to help job
          seekers create ATS-optimized resumes, cover letters, LinkedIn
          profiles, and interview preparation – powered by our ResumeMind
          Score™ engine and built in Mumbai, India, for both Indian and global
          job markets.
        </p>
        <p className="text-text-secondary leading-relaxed">
          This Privacy Policy explains how we collect, use, store, and protect
          your personal information when you use our services. By using
          CareerMindAI, you agree to the terms outlined in this policy.
        </p>
      </section>

      {/* Data Collection */}
      <section id="data-collection">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Data We Collect
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Information You Provide
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>
                <strong>Account Information:</strong> Name, email address,
                password
              </li>
              <li>
                <strong>Resume Content:</strong> Work experience, education,
                skills, achievements
              </li>
              <li>
                <strong>Profile Information:</strong> Job titles, industry
                preferences, career goals
              </li>
              <li>
                <strong>Generated Content:</strong> Cover letters, LinkedIn
                profiles, interview responses
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details for paid
                subscriptions (processed securely through third-party payment
                providers)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
              <li>
                <strong>Usage Analytics:</strong> Pages visited, features used,
                time spent on platform
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating
                system, device identifiers
              </li>
              <li>
                <strong>IP Address:</strong> For security and analytics purposes
              </li>
              <li>
                <strong>Cookies:</strong> Session management and preference
                storage
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">
                  Important: Government ID Protection
                </h4>
                <p className="text-sm text-yellow-800">
                  <strong>
                    CareerMindAI does NOT request or store government identity
                    numbers
                  </strong>{' '}
                  such as PAN, Aadhaar, passport, driving license, or any other
                  government-issued ID numbers. We will never ask for such
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section id="how-we-use">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How We Use Your Data
        </h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            We use your information to provide, improve, and personalize our
            services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>
              <strong>Resume Auditing:</strong> Analyze your resume content to
              generate ResumeMind Score™ and provide actionable feedback
            </li>
            <li>
              <strong>Content Generation:</strong> Create ATS-optimized resumes,
              cover letters, and LinkedIn profiles using AI
            </li>
            <li>
              <strong>Interview Preparation:</strong> Generate personalized
              interview questions and practice scenarios
            </li>
            <li>
              <strong>Service Improvement:</strong> Analyze usage patterns to
              enhance features and user experience
            </li>
            <li>
              <strong>Communication:</strong> Send account updates, feature
              announcements, and support responses
            </li>
            <li>
              <strong>Security:</strong> Protect against fraud, unauthorized
              access, and security threats
            </li>
            <li>
              <strong>Legal Compliance:</strong> Meet legal and regulatory
              requirements
            </li>
          </ul>
        </div>
      </section>

      {/* Data Security */}
      <section id="data-security">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Data Security
        </h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            We implement industry-standard security measures to protect your
            data:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">
                Encryption
              </h4>
              <p className="text-sm text-text-secondary">
                All data transmitted between your device and our servers is
                encrypted using SSL/TLS protocols
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">
                Secure Storage
              </h4>
              <p className="text-sm text-text-secondary">
                Your data is stored in secure, encrypted databases with
                restricted access controls
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">
                Access Control
              </h4>
              <p className="text-sm text-text-secondary">
                Only authorized personnel have access to user data, limited to
                what&apos;s necessary for service delivery
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">
                Regular Audits
              </h4>
              <p className="text-sm text-text-secondary">
                We conduct regular security audits and vulnerability assessments
              </p>
            </div>
          </div>
          <p className="text-sm text-text-secondary italic">
            While we strive to protect your data using best-effort practices, no
            method of transmission or storage is 100% secure. We cannot
            guarantee absolute security but continuously work to improve our
            security measures.
          </p>
        </div>
      </section>

      {/* Third-Party Sharing */}
      <section id="third-party">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Third-Party Sharing
        </h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            We do NOT sell your personal data to third parties. We may share
            limited information with:
          </p>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-foreground mb-1">
                Service Providers
              </h4>
              <p className="text-sm text-text-secondary">
                Payment processors, cloud hosting services, analytics tools that
                help us operate the platform
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-foreground mb-1">
                AI Service Providers
              </h4>
              <p className="text-sm text-text-secondary">
                Third-party AI APIs (OpenAI, Anthropic, etc.) receive resume
                content for processing but do not store it permanently
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold text-foreground mb-1">
                Legal Requirements
              </h4>
              <p className="text-sm text-text-secondary">
                Law enforcement or regulatory authorities when required by law or
                to protect rights and safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section id="your-rights">
        <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            You have the following rights regarding your personal data:
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-1">
                Access & Download
              </h4>
              <p className="text-sm text-blue-800">
                Request a copy of your personal data in a portable format
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-1">
                Correction
              </h4>
              <p className="text-sm text-blue-800">
                Update or correct inaccurate personal information
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-1">Deletion</h4>
              <p className="text-sm text-blue-800">
                Request deletion of your account and associated data (subject to
                legal retention requirements)
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-1">
                Opt-Out
              </h4>
              <p className="text-sm text-blue-800">
                Unsubscribe from marketing communications at any time
              </p>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            To exercise these rights, contact us at{' '}
            <a
              href="mailto:careermindai28@gmail.com"
              className="text-primary hover:underline"
            >
              careermindai28@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Cookies */}
      <section id="cookies">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Cookies & Tracking Technologies
        </h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            We use cookies and similar technologies to enhance your experience:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Type
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Purpose
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-foreground">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 text-sm text-foreground font-medium">
                    Essential
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Required for login, security, and core functionality
                  </td>
                  <td className="p-3 text-sm text-text-secondary">Session</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm text-foreground font-medium">
                    Analytics
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Understand user behavior and improve features
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Up to 2 years
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm text-foreground font-medium">
                    Preferences
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Remember your settings and preferences
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Up to 1 year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-secondary">
            You can manage cookie preferences through your browser settings.
            Note that disabling essential cookies may affect platform
            functionality.
          </p>
        </div>
      </section>

      {/* Data Retention */}
      <section id="data-retention">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Data Retention
        </h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            We retain your personal data for as long as necessary to provide our
            services and comply with legal obligations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>
              <strong>Active Accounts:</strong> Data is retained while your
              account is active
            </li>
            <li>
              <strong>Inactive Accounts:</strong> Accounts inactive for 3+ years
              may be archived or deleted
            </li>
            <li>
              <strong>Deleted Accounts:</strong> Most data is permanently
              deleted within 90 days
            </li>
            <li>
              <strong>Legal Requirements:</strong> Some data may be retained
              longer for legal, tax, or regulatory compliance
            </li>
            <li>
              <strong>Backup Systems:</strong> Deleted data may persist in
              backup systems for up to 180 days before permanent removal
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
        <div className="space-y-4">
          <p className="text-text-secondary leading-relaxed">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or your personal data, please contact us:
          </p>
          <div className="bg-muted rounded-lg p-6">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Email
                </h4>
                <a
                  href="mailto:careermindai28@gmail.com"
                  className="text-primary hover:underline"
                >
                  careermindai28@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Location
                </h4>
                <p className="text-text-secondary">Mumbai, India</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Response Time
                </h4>
                <p className="text-text-secondary">
                  We aim to respond to all privacy inquiries within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Policy Updates
        </h2>
        <p className="text-text-secondary leading-relaxed">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or legal requirements. We will notify you of
          significant changes via email or through a prominent notice on our
          platform. Continued use of CareerMindAI after updates constitutes
          acceptance of the revised policy.
        </p>
        <p className="text-sm text-text-secondary mt-4">
          <strong>Version:</strong> 1.0 | <strong>Last Updated:</strong>{' '}
          December 2, 2025
        </p>
      </section>
    </div>
  );
};

export default PolicyContent;