'use client';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Email',
      value: 'careermindai28@gmail.com',
      link: 'mailto:careermindai28@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
      description: 'Available for support during business hours',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Location',
      value: 'Mumbai, India',
      description: 'Built in Mumbai, serving globally',
    },
  ];

  const quickLinks = [
    {
      title: 'FAQ',
      description: 'Find answers to common questions',
      href: '/faq',
    },
    {
      title: 'Help Center',
      description: 'Browse our documentation',
      href: '/help-center',
    },
    {
      title: 'Pricing',
      description: 'View our pricing plans',
      href: '/pricing-plans',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-surface rounded-2xl shadow-card border border-border p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Contact Information
        </h2>
        <div className="space-y-6">
          {contactMethods?.map((method, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                {method?.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {method?.title}
                </h3>
                {method?.link ? (
                  <a
                    href={method?.link}
                    className="text-primary hover:underline font-medium"
                  >
                    {method?.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{method?.value}</p>
                )}
                <p className="text-sm text-text-secondary mt-1">
                  {method?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Links */}
      <div className="bg-surface rounded-2xl shadow-card border border-border p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
        <div className="space-y-4">
          {quickLinks?.map((link, index) => (
            <a
              key={index}
              href={link?.href}
              className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-150 group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-150">
                {link?.title}
              </h3>
              <p className="text-sm text-text-secondary">{link?.description}</p>
            </a>
          ))}
        </div>
      </div>
      {/* Response Time Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              Response Time
            </h3>
            <p className="text-sm text-blue-800">
              We typically respond to all inquiries within 24-48 hours during
              business days. For urgent matters, please mention &quot;URGENT&quot; in
              your subject line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;