'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'What is CareerMindAI?',
    answer: 'CareerMindAI is an AI-powered career platform built to help job seekers create ATS-optimized resumes, cover letters, LinkedIn profiles, and interview preparation – powered by our ResumeMind Score™ engine and built in Mumbai, India, for both Indian and global job markets.',
  },
  {
    category: 'Getting Started',
    question: 'How do I get started with CareerMindAI?',
    answer: 'Simply sign up for a free account, upload your resume to get your ResumeMind Score™, and explore our suite of AI-powered tools. Our free tier gives you access to basic resume auditing and limited tool usage.',
  },
  {
    category: 'ResumeMind Score™',
    question: 'What is ResumeMind Score™?',
    answer: 'ResumeMind Score™ is our proprietary AI-powered scoring engine that analyzes your resume against ATS (Applicant Tracking System) standards, keyword optimization, formatting, and industry best practices. It provides you with a comprehensive score from 0-100 along with actionable recommendations to improve your resume.',
  },
  {
    category: 'ResumeMind Score™',
    question: 'How is my ResumeMind Score™ calculated?',
    answer: 'Your score is calculated based on multiple factors including ATS compatibility (30%), keyword optimization (25%), formatting and structure (20%), content quality (15%), and overall presentation (10%). Our AI engine analyzes hundreds of data points to give you an accurate assessment.',
  },
  {
    category: 'Privacy & Security',
    question: 'Is CareerMindAI suitable for Indian job seekers?',
    answer: 'Absolutely! CareerMindAI was built in Mumbai with deep understanding of both Indian and global job markets. Our AI is trained on diverse job descriptions and resume formats from India, USA, UK, and other major markets, making it perfect for Indian professionals applying locally or internationally.',
  },
  {
    category: 'Privacy & Security',
    question: 'Do you store my resume securely?',
    answer: 'Yes, we take data security very seriously. All resumes and personal data are encrypted in transit and at rest. We use industry-standard security protocols and never share your data with third parties. You can delete your data at any time from your account settings.',
  },
  {
    category: 'Privacy & Security',
    question: 'Do you store PAN, Aadhaar, passport, or other government ID details?',
    answer: 'No, never. CareerMindAI does not request or store government identity numbers such as PAN, Aadhaar, passport, or driving licence details. We only store the resume content and profile information you choose to provide for generating career documents.',
  },
  {
    category: 'Pricing & Billing',
    question: 'How does pricing and billing work?',
    answer: 'We offer three plans: Free (₹0/month) with basic resume audit and limited tools; Starter (₹499/month) for active job seekers who need full access to all tools; and Pro (₹999/month) for power users who want maximum features and higher usage limits. All paid plans are billed monthly and can be cancelled anytime.',
  },
  {
    category: 'Pricing & Billing',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle.',
  },
  {
    category: 'Pricing & Billing',
    question: 'Do you offer refunds?',
    answer: 'Digital subscriptions are generally non-refundable once features or credits are used. However, in exceptional technical cases where our service fails to deliver, you can email our support team at careermindai28@gmail.com and we will review your case individually.',
  },
  {
    category: 'Features & Tools',
    question: 'What tools are included in CareerMindAI?',
    answer: 'CareerMindAI includes: Resume Audit Tool with ResumeMind Score™, AI Resume Builder with multiple templates, Cover Letter Generator, Interview Preparation with practice questions, LinkedIn Profile Optimization, and Free Tools Hub with keyword extractors and word counters.',
  },
  {
    category: 'Features & Tools',
    question: 'Can I use CareerMindAI for multiple job applications?',
    answer: 'Yes! Our Pro plan is designed for active job seekers. You can create multiple resumes, cover letters, and optimize your profile for different job applications. Each plan has different usage limits – check our pricing page for details.',
  },
  {
    category: 'Technical Support',
    question: 'What if I encounter a technical issue?',
    answer: 'If you experience any technical issues, please contact our support team at careermindai28@gmail.com with details about the problem. We typically respond within 24 hours on business days.',
  },
  {
    category: 'Technical Support',
    question: 'Which file formats do you support for resume uploads?',
    answer: 'We currently support PDF, DOC, and DOCX formats for resume uploads. For best results, we recommend using PDF format as it preserves formatting better.',
  },
];

const FAQAccordion: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          id={`faq-answer-${index}`}
          className="px-6 py-4 bg-gray-50 border-t border-gray-200"
        >
          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(faqData.map((item) => item.category)))];

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Find answers to common questions about CareerMindAI, ResumeMind Score™, and our services
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <div className="relative">
              <input
                id="faq-search"
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <FAQAccordion key={index} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Still Need Help Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help-center"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
            >
              Visit Help Center
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;