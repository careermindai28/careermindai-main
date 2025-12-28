'use client';

import { useState, useEffect } from 'react';
import QuestionCategory from './QuestionCategory';
import InterviewInputForm from './InterviewInputForm';
import ProgressTracker from './ProgressTracker';
import PracticeTimer from './PracticeTimer';
import SavedQuestions from './SavedQuestions';
import Icon from '@/components/ui/AppIcon';
import UpgradeModal from '@/components/monetization/UpgradeModal';
import { downloadPdf } from '@/lib/downloadPdf';

const InterviewPreparationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'questions' | 'practice' | 'saved'>('questions');
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setQuestionsGenerated(true);
    }, 2000);
  };

  const handleExport = async () => {
    const mockGuideId = 'interview-guide-1'; // 🔁 replace with real Firestore ID later

    const result = await downloadPdf('interviewGuide', mockGuideId);

    if (!result.ok && result.code === 'EXPORT_LIMIT_REACHED') {
      setShowUpgrade(true);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Interview Preparation</h1>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border rounded"
          >
            <Icon name="ArrowDownTrayIcon" size={18} />
            Export PDF
          </button>
        </div>

        {!questionsGenerated ? (
          <InterviewInputForm onGenerate={handleGenerate} />
        ) : (
          <>
            <PracticeTimer />
            <ProgressTracker progress={[]} />
            <QuestionCategory
              title="Sample Questions"
              description="Interview practice"
              icon="StarIcon"
              questions={[]}
              categoryType="hr"
            />
          </>
        )}
      </div>
    </>
  );
};

export default InterviewPreparationInteractive;
