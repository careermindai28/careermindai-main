'use client';

import { useState, useEffect } from 'react';
import ResumeSelector from './ResumeSelector';
import ToneSelector from './ToneSelector';
import GenerationProgress from './GenerationProgress';
import CoverLetterCard from './CoverLetterCard';
import EditModal from './EditModal';
import ExportOptions from './ExportOptions';
import Icon from '@/components/ui/AppIcon';
import UpgradeModal from '@/components/monetization/UpgradeModal';
import { downloadPdf } from '@/lib/downloadPdf';

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
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockGeneratedLetters: CoverLetter[] = [
    {
      id: 'letter-1',
      variant: 'Experience-Focused',
      approach: 'Emphasizes technical skills and project achievements',
      content: 'Mock content...',
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
      await new Promise((r) => setTimeout(r, 1000));
      setCurrentStep(i);
    }

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
        prev.map((l) =>
          l.id === editingLetter.id ? { ...l, content } : l
        )
      );
    }
  };

  const handleExport = async () => {
    const letter = generatedLetters.find((l) => l.id === selectedLetter);
    if (!letter) return;

    const result = await downloadPdf('coverLetter', letter.id);

    if (!result.ok && result.code === 'EXPORT_LIMIT_REACHED') {
      setShowUpgrade(true);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      <div className="space-y-6">
        {!isGenerating && generatedLetters.length === 0 && (
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-primary text-white rounded"
          >
            Generate Cover Letters
          </button>
        )}

        {isGenerating && (
          <GenerationProgress isGenerating currentStep={currentStep} />
        )}

        {!isGenerating && generatedLetters.length > 0 && (
          <>
            <div className="grid gap-4">
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

            {selectedLetter && (
              <ExportOptions onExport={handleExport} />
            )}
          </>
        )}

        <EditModal
          isOpen={isEditModalOpen}
          content={editingLetter?.content || ''}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      </div>
    </>
  );
};

export default CoverLetterGeneratorInteractive;
