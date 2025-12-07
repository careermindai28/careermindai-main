'use client';

import { useState, useEffect } from 'react';
import ProfileInputForm, { ProfileFormData } from './ProfileInputForm';
import HeadlineGenerator from './HeadlineGenerator';
import SummaryGenerator from './SummaryGenerator';
import LinkedInPreview from './LinkedInPreview';
import KeywordOptimization from './KeywordOptimization';
import ExportOptions from './ExportOptions';
import Icon from '@/components/ui/AppIcon';

interface HeadlineOption {
  id: string;
  headline: string;
  characterCount: number;
  rationale: string;
  keywords: string[];
}

interface SummaryOption {
  id: string;
  title: string;
  content: string;
  tone: string;
  wordCount: number;
  approach: string;
}

interface KeywordSuggestion {
  keyword: string;
  relevance: 'high' | 'medium' | 'low';
  category: string;
}

const LinkedInOptimizationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedHeadline, setSelectedHeadline] = useState('');
  const [selectedSummary, setSelectedSummary] = useState('');
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockHeadlines: HeadlineOption[] = [
  {
    id: 'h1',
    headline: 'Senior Software Engineer | Building Scalable Cloud Solutions | AWS & Kubernetes Expert | Helping Teams Deliver High-Performance Applications',
    characterCount: 145,
    rationale: 'Emphasizes technical expertise, leadership impact, and value proposition. Includes key searchable terms for recruiters.',
    keywords: ['Cloud Solutions', 'AWS', 'Kubernetes', 'Scalable Systems']
  },
  {
    id: 'h2',
    headline: 'Engineering Manager | Leading High-Performance Teams | Driving Innovation in Cloud Architecture | Passionate About Mentorship & Technical Excellence',
    characterCount: 152,
    rationale: 'Highlights leadership qualities, technical direction, and people management skills. Appeals to both technical and managerial roles.',
    keywords: ['Engineering Manager', 'Cloud Architecture', 'Team Leadership', 'Mentorship']
  },
  {
    id: 'h3',
    headline: 'Full-Stack Developer → Engineering Manager | Transforming Ideas into Scalable Products | Tech Lead with 10+ Years Experience',
    characterCount: 135,
    rationale: 'Shows career progression and versatility. Uses visual separator for impact. Quantifies experience for credibility.',
    keywords: ['Full-Stack', 'Engineering Manager', 'Tech Lead', 'Product Development']
  }];


  const mockSummaries: SummaryOption[] = [
  {
    id: 's1',
    title: 'Achievement-Focused Professional',
    content: `I'm a Senior Software Engineer with over 10 years of experience building scalable cloud solutions that serve millions of users. My expertise spans AWS, Kubernetes, and microservices architecture, with a proven track record of reducing infrastructure costs by 40% while improving system reliability.\n\nThroughout my career, I've led cross-functional teams to deliver high-impact projects, including a real-time analytics platform that processes 100M+ events daily. I'm passionate about mentoring junior engineers and fostering a culture of technical excellence.\n\nCurrently seeking opportunities to leverage my expertise in cloud architecture and team leadership to drive innovation at a forward-thinking organization.`,
    tone: 'Professional & Results-Driven',
    wordCount: 98,
    approach: 'Focuses on quantifiable achievements and technical expertise. Opens with strong value proposition and closes with clear career objective.'
  },
  {
    id: 's2',
    title: 'Story-Driven Narrative',
    content: `My journey in software engineering began with a simple question: How can technology solve real-world problems at scale? This curiosity has driven me through a decade of building systems that impact millions of lives.\n\nFrom optimizing database queries that saved 2 hours of processing time daily, to architecting cloud infrastructure that handles Black Friday traffic spikes seamlessly, I've learned that great engineering is about understanding both the technical and human aspects of problem-solving.\n\nToday, I combine my technical expertise in AWS and Kubernetes with leadership experience to build high-performing teams that deliver exceptional results. I believe the best solutions emerge when diverse perspectives collaborate with a shared vision.`,
    tone: 'Engaging & Authentic',
    wordCount: 112,
    approach: 'Uses storytelling to create emotional connection. Balances technical achievements with leadership philosophy and team values.'
  },
  {
    id: 's3',
    title: 'Executive-Level Positioning',
    content: `As a Senior Software Engineer and Technical Leader, I specialize in transforming complex business challenges into elegant, scalable solutions. My expertise in cloud architecture, distributed systems, and team leadership has consistently delivered measurable business impact.\n\nKey accomplishments include architecting a microservices platform that reduced deployment time by 70%, leading a team of 12 engineers to deliver a $5M revenue-generating product, and establishing engineering best practices that improved code quality metrics by 60%.\n\nI'm committed to driving technical innovation while building inclusive, high-performing teams. Open to strategic leadership opportunities where I can leverage my technical depth and business acumen to create lasting organizational value.`,
    tone: 'Executive & Strategic',
    wordCount: 105,
    approach: 'Positions for senior leadership roles. Emphasizes business impact, strategic thinking, and organizational influence alongside technical expertise.'
  }];


  const mockKeywordSuggestions: KeywordSuggestion[] = [
  { keyword: 'Cloud Architecture', relevance: 'high', category: 'Technical Skills' },
  { keyword: 'Microservices', relevance: 'high', category: 'Technical Skills' },
  { keyword: 'AWS Certified', relevance: 'high', category: 'Certifications' },
  { keyword: 'Team Leadership', relevance: 'high', category: 'Soft Skills' },
  { keyword: 'Agile Methodologies', relevance: 'medium', category: 'Methodologies' },
  { keyword: 'DevOps', relevance: 'high', category: 'Technical Skills' },
  { keyword: 'System Design', relevance: 'high', category: 'Technical Skills' },
  { keyword: 'Mentorship', relevance: 'medium', category: 'Soft Skills' },
  { keyword: 'CI/CD', relevance: 'medium', category: 'Technical Skills' },
  { keyword: 'Problem Solving', relevance: 'medium', category: 'Soft Skills' }];


  const mockCurrentKeywords = [
  'Software Engineering',
  'Cloud Computing',
  'Leadership',
  'AWS',
  'Kubernetes'];


  const mockProfileData = {
    name: 'Rahul Sharma',
    currentRole: 'Senior Software Engineer at Tech Innovations',
    location: 'Bangalore, Karnataka, India',
    connections: '500+',
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18d2609e4-1763295473500.png",
    profileImageAlt: 'Professional headshot of Indian man in blue shirt with glasses smiling at camera in modern office'
  };

  const handleGenerate = async (formData: ProfileFormData) => {
    setIsGenerating(true);
    setActiveTab('results');

    await new Promise((resolve) => setTimeout(resolve, 2500));

    setSelectedHeadline(mockHeadlines[0].headline);
    setSelectedSummary(mockSummaries[0].content);
    setHasGenerated(true);
    setIsGenerating(false);
  };

  const handleCopyHeadline = (headline: string) => {
    if (!isHydrated) return;
    setSelectedHeadline(headline);
    navigator.clipboard.writeText(headline);
  };

  const handleCopySummary = (summary: string) => {
    if (!isHydrated) return;
    setSelectedSummary(summary);
    navigator.clipboard.writeText(summary);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleExport = (format: 'text' | 'pdf') => {
    if (!isHydrated) return;
    console.log(`Exporting as ${format}`);
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>);

  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">LinkedIn Profile Optimization</h1>
        <p className="text-text-secondary">
          Generate AI-powered headlines and summaries to enhance your professional presence
        </p>
      </div>

      <div className="mb-6 border-b border-border">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-4 py-3 font-medium transition-all duration-150 border-b-2 ${
            activeTab === 'input' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground'}`
            }>

            <Icon name="PencilSquareIcon" size={20} className="inline mr-2" />
            Input Details
          </button>
          <button
            onClick={() => setActiveTab('results')}
            disabled={!hasGenerated}
            className={`px-4 py-3 font-medium transition-all duration-150 border-b-2 ${
            activeTab === 'results' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed'}`
            }>

            <Icon name="SparklesIcon" size={20} className="inline mr-2" />
            Generated Content
          </button>
        </div>
      </div>

      {activeTab === 'input' &&
      <div className="bg-surface border border-border rounded-lg p-6">
          <ProfileInputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>
      }

      {activeTab === 'results' &&
      <>
          {isGenerating ?
        <div className="bg-surface border border-border rounded-lg p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Icon name="SparklesIcon" size={48} className="text-accent animate-pulse" />
                <p className="text-lg font-medium text-foreground">Generating optimized content...</p>
                <p className="text-sm text-text-secondary">Analyzing your profile and industry trends</p>
              </div>
            </div> :
        hasGenerated ?
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <HeadlineGenerator
                headlines={mockHeadlines}
                onCopy={handleCopyHeadline}
                onRegenerate={handleRegenerate} />

                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <SummaryGenerator
                summaries={mockSummaries}
                onCopy={handleCopySummary}
                onRegenerate={handleRegenerate} />

                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <KeywordOptimization
                suggestions={mockKeywordSuggestions}
                currentKeywords={mockCurrentKeywords} />

                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <ExportOptions
                headline={selectedHeadline}
                summary={selectedSummary}
                onExport={handleExport} />

                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-surface border border-border rounded-lg p-6">
                  <LinkedInPreview
                headline={selectedHeadline}
                summary={selectedSummary}
                profileData={mockProfileData} />

                </div>
              </div>
            </div> :

        <div className="bg-surface border border-border rounded-lg p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Icon name="DocumentTextIcon" size={48} className="text-text-secondary" />
                <p className="text-lg font-medium text-foreground">No content generated yet</p>
                <p className="text-sm text-text-secondary">Fill in your details and generate content to see results</p>
                <button
              onClick={() => setActiveTab('input')}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">

                  Go to Input Form
                </button>
              </div>
            </div>
        }
        </>
      }
    </div>);

};

export default LinkedInOptimizationInteractive;