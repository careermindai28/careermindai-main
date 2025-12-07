'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AnalysisResult {
  wordCount: number;
  characterCount: number;
  atsScore: number;
  readabilityScore: number;
  sectionBalance: {
    summary: number;
    experience: number;
    skills: number;
    education: number;
  };
  suggestions: string[];
}

interface ResumeWordCounterProps {
  className?: string;
}

const ResumeWordCounter = ({ className = '' }: ResumeWordCounterProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockResult: AnalysisResult = {
    wordCount: 487,
    characterCount: 3245,
    atsScore: 78,
    readabilityScore: 82,
    sectionBalance: {
      summary: 15,
      experience: 45,
      skills: 25,
      education: 15,
    },
    suggestions: [
      'Consider adding more quantifiable achievements with numbers and percentages',
      'Your experience section is well-balanced at 45% of total content',
      'Include 2-3 more technical skills to improve ATS matching',
      'Summary section could be expanded to 50-75 words for better impact',
      'Use more action verbs like "implemented", "optimized", "led" to strengthen descriptions',
    ],
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    setIsAnalyzing(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2500));

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setFileName('');
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
    if (!result) return;

    const exportData = `Resume Analysis Report\n\nWord Count: ${result.wordCount}\nCharacter Count: ${result.characterCount}\nATS Score: ${result.atsScore}%\nReadability Score: ${result.readabilityScore}%\n\nSection Balance:\n- Summary: ${result.sectionBalance.summary}%\n- Experience: ${result.sectionBalance.experience}%\n- Skills: ${result.sectionBalance.skills}%\n- Education: ${result.sectionBalance.education}%\n\nSuggestions:\n${result.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className={`bg-surface rounded-xl border border-border shadow-card p-6 ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Resume Word Counter</h2>
          <p className="text-text-secondary">Analyze your resume for ATS optimization and readability</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="DocumentTextIcon" size={16} />
          <span>1,523 resumes analyzed today</span>
        </div>
      </div>

      {!fileName ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-150 ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="CloudArrowUpIcon" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-1">
                Drop your resume here
              </p>
              <p className="text-sm text-text-secondary">
                or click to browse files
              </p>
            </div>
            <button
              onClick={handleBrowseClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-150 shadow-card hover:shadow-elevation"
            >
              Browse Files
            </button>
            <p className="text-xs text-text-secondary">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-background rounded-lg p-4 border border-border flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="DocumentTextIcon" size={20} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{fileName}</p>
                {isAnalyzing && (
                  <p className="text-sm text-text-secondary">Analyzing resume...</p>
                )}
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-text-secondary hover:text-foreground transition-colors duration-150 flex-shrink-0"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>

          {isAnalyzing && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mx-auto" />
                <p className="text-text-secondary">Analyzing your resume...</p>
              </div>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Analysis Results</h3>
                <button
                  onClick={handleExport}
                  className="text-sm text-text-secondary hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
                >
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="DocumentTextIcon" size={20} className="text-primary" />
                    <span className="text-sm font-medium text-text-secondary">Word Count</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{result.wordCount}</p>
                  <p className="text-xs text-text-secondary mt-1">Optimal: 400-600 words</p>
                </div>

                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="HashtagIcon" size={20} className="text-primary" />
                    <span className="text-sm font-medium text-text-secondary">Characters</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{result.characterCount}</p>
                  <p className="text-xs text-text-secondary mt-1">Including spaces</p>
                </div>

                <div className={`rounded-lg p-4 border ${getScoreBgColor(result.atsScore)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CheckBadgeIcon" size={20} className={getScoreColor(result.atsScore)} />
                    <span className="text-sm font-medium text-text-secondary">ATS Score</span>
                  </div>
                  <p className={`text-3xl font-bold ${getScoreColor(result.atsScore)}`}>{result.atsScore}%</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {result.atsScore >= 80 ? 'Excellent' : result.atsScore >= 60 ? 'Good' : 'Needs work'}
                  </p>
                </div>

                <div className={`rounded-lg p-4 border ${getScoreBgColor(result.readabilityScore)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="EyeIcon" size={20} className={getScoreColor(result.readabilityScore)} />
                    <span className="text-sm font-medium text-text-secondary">Readability</span>
                  </div>
                  <p className={`text-3xl font-bold ${getScoreColor(result.readabilityScore)}`}>{result.readabilityScore}%</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {result.readabilityScore >= 80 ? 'Very clear' : result.readabilityScore >= 60 ? 'Clear' : 'Complex'}
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-foreground mb-4">Section Balance</h4>
                <div className="space-y-4">
                  {Object.entries(result.sectionBalance).map(([section, percentage]) => (
                    <div key={section}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground capitalize">{section}</span>
                        <span className="text-sm text-text-secondary">{percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-foreground mb-4">Improvement Suggestions</h4>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="LightBulbIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="SparklesIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Upgrade to Premium</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Get detailed ATS analysis, keyword optimization, and AI-powered content suggestions with our Premium Resume Builder.
                    </p>
                    <a
                      href="/pricing-plans"
                      className="inline-flex items-center space-x-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-150"
                    >
                      <span>View Premium Features</span>
                      <Icon name="ArrowRightIcon" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeWordCounter;