'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import TemplateSelector from './TemplateSelector';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ResumePreview from './ResumePreview';
import AIEnhancementModal from './AIEnhancementModal';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

const ResumeBuilderInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('classic-1');
  const [isSaving, setIsSaving] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContext, setAIModalContext] = useState<{
    field: string;
    originalText: string;
  }>({ field: '', originalText: '' });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    linkedin: 'linkedin.com/in/rahulsharma',
    portfolio: 'https://rahulsharma.dev',
    summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies with proven track record of delivering high-impact projects.',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 'exp-1',
      company: 'Tech Solutions India',
      position: 'Senior Software Engineer',
      location: 'Bangalore, Karnataka',
      startDate: '2021-06',
      endDate: '',
      current: true,
      achievements: [
        'Led development of microservices architecture serving 2M+ users, reducing response time by 40%',
        'Mentored team of 5 junior developers, improving code quality and delivery speed by 30%',
        'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
      ],
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: 'edu-1',
      institution: 'Indian Institute of Technology, Mumbai',
      degree: 'Bachelor of Technology',
      field: 'Computer Science',
      location: 'Mumbai, Maharashtra',
      startDate: '2015-07',
      endDate: '2019-05',
      gpa: '8.5/10',
      achievements: ['Dean\'s List 2017-2019', 'President of Coding Club'],
    },
  ]);

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    {
      id: 'cat-1',
      name: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    },
    {
      id: 'cat-2',
      name: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'TailwindCSS'],
    },
    {
      id: 'cat-3',
      name: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL'],
    },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAIEnhance = (field: string, originalText?: string) => {
    setAIModalContext({
      field,
      originalText: originalText || '',
    });
    setShowAIModal(true);
  };

  const handleAIApply = (suggestion: string) => {
    if (aiModalContext.field === 'summary') {
      setPersonalInfo({ ...personalInfo, summary: suggestion });
    }
    console.log('AI suggestion applied:', suggestion);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Resume saved successfully');
    }, 1500);
  };

  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    console.log(`Exporting resume as ${format.toUpperCase()}`);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-2 h-[800px] bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI Resume Builder</h1>
              <p className="text-text-secondary">
                Create ATS-optimized resumes with AI-powered content suggestions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                <Icon name={isSaving ? 'ArrowPathIcon' : 'BookmarkIcon'} size={16} className={isSaving ? 'animate-spin' : ''} />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  <span>Export</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-left text-foreground hover:bg-muted transition-colors rounded-t-lg"
                  >
                    <Icon name="DocumentTextIcon" size={16} />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('docx')}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-left text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="DocumentIcon" size={16} />
                    <span>Export as DOCX</span>
                  </button>
                  <button
                    onClick={() => handleExport('txt')}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-left text-foreground hover:bg-muted transition-colors rounded-b-lg"
                  >
                    <Icon name="DocumentTextIcon" size={16} />
                    <span>Export as TXT (ATS)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden mb-4">
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-colors ${
                  activeTab === 'edit' ?'bg-primary text-primary-foreground' :'bg-surface text-text-secondary hover:bg-muted'
                }`}
              >
                <Icon name="PencilIcon" size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-colors ${
                  activeTab === 'preview' ?'bg-primary text-primary-foreground' :'bg-surface text-text-secondary hover:bg-muted'
                }`}
              >
                <Icon name="EyeIcon" size={16} />
                <span>Preview</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-1 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
              <div className="bg-surface border border-border rounded-lg p-6">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              </div>

              <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
                <PersonalInfoForm
                  data={personalInfo}
                  onUpdate={setPersonalInfo}
                  onAIEnhance={(field) => handleAIEnhance(field, personalInfo.summary)}
                />

                <div className="border-t border-border pt-6">
                  <ExperienceForm
                    experiences={experiences}
                    onUpdate={setExperiences}
                    onAIEnhance={(id) => handleAIEnhance('experience', id)}
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <EducationForm education={education} onUpdate={setEducation} />
                </div>

                <div className="border-t border-border pt-6">
                  <SkillsForm
                    skillCategories={skillCategories}
                    onUpdate={setSkillCategories}
                    onAIEnhance={() => handleAIEnhance('skills')}
                  />
                </div>
              </div>
            </div>

            <div className={`lg:col-span-2 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
              <div className="sticky top-24">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="InformationCircleIcon" size={16} />
                    <span>Live preview updates as you type</span>
                  </div>
                </div>
                <ResumePreview
                  personalInfo={personalInfo}
                  experiences={experiences}
                  education={education}
                  skillCategories={skillCategories}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIEnhancementModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onApply={handleAIApply}
        originalText={aiModalContext.originalText}
        fieldType={aiModalContext.field}
      />
    </>
  );
};

export default ResumeBuilderInteractive;