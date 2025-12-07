'use client';

import { useState, useEffect } from 'react';
import ResumeSelector from './ResumeSelector';
import ToneSelector from './ToneSelector';
import GenerationProgress from './GenerationProgress';
import CoverLetterCard from './CoverLetterCard';
import EditModal from './EditModal';
import ExportOptions from './ExportOptions';
import Icon from '@/components/ui/AppIcon';

interface CoverLetter {
  id: string;
  variant: string;
  content: string;
  approach: string;
}

const CoverLetterGeneratorInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedLetters, setGeneratedLetters] = useState<CoverLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<CoverLetter | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockGeneratedLetters: CoverLetter[] = [
    {
      id: 'letter-1',
      variant: 'Experience-Focused',
      approach: 'Emphasizes technical skills and project achievements',
      content: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineer position at TechCorp. With over 5 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am confident in my ability to contribute to your team's success.\n\nIn my current role at InnovateSoft, I have successfully led the development of a microservices architecture that improved system performance by 40% and reduced deployment time by 60%. My expertise in React, Node.js, and cloud technologies aligns perfectly with the requirements outlined in your job description.\n\nI am particularly drawn to TechCorp's commitment to innovation and your recent work in AI-powered solutions. I believe my experience in implementing machine learning models and my passion for cutting-edge technology would make me a valuable addition to your engineering team.\n\nI would welcome the opportunity to discuss how my skills and experience can contribute to TechCorp's continued growth and success. Thank you for considering my application.\n\nSincerely,\nYour Name`,
    },
    {
      id: 'letter-2',
      variant: 'Company-Aligned',
      approach: 'Focuses on company culture and mission alignment',
      content: `Dear Hiring Manager,\n\nI was thrilled to discover the Software Engineer opening at TechCorp. Your company's mission to democratize technology and create inclusive digital solutions resonates deeply with my personal values and professional aspirations.\n\nThroughout my career, I have consistently sought opportunities to work on projects that make a meaningful impact. At InnovateSoft, I spearheaded the development of an accessibility-first web application that served over 100,000 users, including those with disabilities. This experience reinforced my belief that technology should be accessible to everyone—a principle I see reflected in TechCorp's work.\n\nYour recent initiative in sustainable tech solutions particularly caught my attention. I have been actively involved in optimizing code for energy efficiency and have contributed to open-source projects focused on green computing. I am excited about the possibility of bringing this passion to TechCorp and contributing to your sustainability goals.\n\nI am eager to discuss how my technical expertise and alignment with your values can help TechCorp achieve its mission. Thank you for your consideration.\n\nBest regards,\nYour Name`,
    },
    {
      id: 'letter-3',
      variant: 'Achievement-Driven',
      approach: 'Highlights quantifiable results and impact',
      content: `Dear Hiring Manager,\n\nI am excited to apply for the Software Engineer position at TechCorp. My track record of delivering measurable results and driving technical excellence makes me an ideal candidate for this role.\n\nKey achievements in my current position include:\n• Architected and deployed a real-time analytics platform that processes 10 million events daily\n• Reduced application load time by 65% through performance optimization\n• Mentored 8 junior developers, with 6 receiving promotions within 18 months\n• Implemented CI/CD pipelines that decreased deployment failures by 80%\n\nThese accomplishments demonstrate my ability to not only write quality code but also to think strategically about system architecture and team development. I am confident that I can bring similar results-oriented thinking to TechCorp's engineering challenges.\n\nYour job description mentions the need for someone who can scale systems and lead technical initiatives. My experience in both areas, combined with my collaborative approach to problem-solving, positions me well to contribute immediately to your team.\n\nI look forward to the opportunity to discuss how I can help TechCorp achieve its technical goals. Thank you for your time and consideration.\n\nSincerely,\nYour Name`,
    },
  ];

  const handleGenerate = async () => {
    if (!selectedResume || !companyName || !roleTitle || !jobDescription) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedLetters([]);

    for (let i = 1; i <= 4; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setGeneratedLetters(mockGeneratedLetters);
    setSelectedLetter(mockGeneratedLetters[0].id);
    setIsGenerating(false);
  };

  const handleEdit = (letterId: string) => {
    const letter = generatedLetters.find((l) => l.id === letterId);
    if (letter) {
      setEditingLetter(letter);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (content: string) => {
    if (editingLetter) {
      setGeneratedLetters((prev) =>
        prev.map((letter) =>
          letter.id === editingLetter.id ? { ...letter, content } : letter
        )
      );
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting cover letter in ${format} format`);
    alert(`Cover letter exported as ${format.toUpperCase()}`);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isGenerating && generatedLetters.length === 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Create Your Cover Letter
          </h2>

          <div className="space-y-6">
            <ResumeSelector
              selectedResume={selectedResume}
              onResumeSelect={setSelectedResume}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., TechCorp"
                  className="w-full px-4 py-3 bg-surface border border-input rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role Title <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-3 bg-surface border border-input rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description <span className="text-error">*</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to help us tailor your cover letter..."
                rows={8}
                className="w-full px-4 py-3 bg-surface border border-input rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all duration-150"
              />
            </div>

            <ToneSelector selectedTone={selectedTone} onToneSelect={setSelectedTone} />

            <button
              onClick={handleGenerate}
              className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-150 shadow-card flex items-center justify-center space-x-2"
            >
              <Icon name="SparklesIcon" size={20} />
              <span>Generate Cover Letters</span>
            </button>
          </div>
        </div>
      )}

      {isGenerating && (
        <GenerationProgress isGenerating={isGenerating} currentStep={currentStep} />
      )}

      {!isGenerating && generatedLetters.length > 0 && (
        <>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Generated Cover Letters
              </h2>
              <button
                onClick={() => {
                  setGeneratedLetters([]);
                  setSelectedLetter('');
                  setCompanyName('');
                  setRoleTitle('');
                  setJobDescription('');
                }}
                className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
              >
                <Icon name="ArrowPathIcon" size={16} />
                <span>Start Over</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {generatedLetters.map((letter) => (
                <CoverLetterCard
                  key={letter.id}
                  letter={letter}
                  isSelected={selectedLetter === letter.id}
                  onSelect={setSelectedLetter}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>

          {selectedLetter && <ExportOptions onExport={handleExport} />}
        </>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        content={editingLetter?.content || ''}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default CoverLetterGeneratorInteractive;