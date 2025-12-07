'use client';

import { useState, useEffect } from 'react';

const PolicyNavigation = () => {
  const [activeSection, setActiveSection] = useState('data-collection');

  const sections = [
    { id: 'data-collection', title: 'Data We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Data' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'third-party', title: 'Third-Party Sharing' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'contact', title: 'Contact Us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-24">
      <div className="bg-surface rounded-xl shadow-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                activeSection === section.id
                  ? 'bg-primary text-white font-medium' :'text-text-secondary hover:bg-muted hover:text-foreground'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PolicyNavigation;