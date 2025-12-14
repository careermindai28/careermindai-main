'use client';

import { useState, useEffect } from 'react';
import FileUploadZone from './FileUploadZone';
import JobDescriptionInput from './JobDescriptionInput';
import AuditFormFields from './AuditFormFields';
import LoadingState from './LoadingState';
import AuditResults from './AuditResults';
import Icon from '@/components/ui/AppIcon';

interface FormErrors {
  file: string;
  jobDescription: string;
  jobDescriptionFile: string;
  targetRole: string;
  companyName: string;
}

interface Strength {
  title: string;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface ATSRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface AuditResultsData {
  resumeMindScore: number;
  strengths: Strength[];
  improvements: Improvement[];
  atsCompatibility: number;
  atsRecommendations: ATSRecommendation[];
  summary?: string;
  recommendedKeywords?: string[];
  riskFlags?: string[];
  regionNotes?: string;
  roleFitNotes?: string;
}

const ResumeAuditInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [jobDescription, setJobDescription] = useState('');
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);

  const [targetRole, setTargetRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('india');
  const [jobType, setJobType] = useState('full-time');

  const [errors, setErrors] = useState<FormErrors>({
    file: '',
    jobDescription: '',
    jobDescriptionFile: '',
    targetRole: '',
    companyName: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResultsData | null>(null);
  const [apiError, setApiError] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      file: '',
      jobDescription: '',
      jobDescriptionFile: '',
      targetRole: '',
      companyName: '',
    };

    if (!selectedFile) newErrors.file = 'Please upload your resume';
    if (!targetRole.trim()) newErrors.targetRole = 'Target role is required';
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return await file.text();
  };

  const handleAnalyze = async () => {
    if (!validateForm()) return;

    setIsAnalyzing(true);
    setApiError('');

    try {
      const formData = new FormData();

      if (!selectedFile) throw new Error('Please upload your resume (PDF/DOCX).');
      formData.append('resumeFile', selectedFile);

      let jobDescriptionText = jobDescription.trim();
      if (!jobDescriptionText && jobDescriptionFile) {
        jobDescriptionText = (await extractTextFromFile(jobDescriptionFile)).trim();
      }

      if (jobDescriptionText) formData.append('jobDescription', jobDescriptionText);
      if (targetRole.trim()) formData.append('targetRole', targetRole.trim());
      if (companyName.trim()) formData.append('companyName', companyName.trim());
      if (region) formData.append('region', region);
      if (jobType) formData.append('experienceLevel', jobType);

      const response = await fetch('/api/resume-audit', {
        method: 'POST',
        body: formData,
      });

      // ✅ SAFE parsing: do not call response.json() directly
      const rawText = await response.text();
      let data: any = null;

      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const msg =
          (data && typeof data.error === 'string' && data.error) ||
          (rawText ? rawText.slice(0, 250) : `Server error: ${response.status}`);
        throw new Error(msg);
      }

      // If backend is still in "route alive" mode, show a friendly message
      if (data?.ok === true && data?.received) {
        throw new Error(
          'Backend is responding, but resume audit logic is not enabled yet. Next step is to add extraction + OpenAI back.'
        );
      }

      // Expect full audit response shape
      if (!data || typeof data.resumeMindScore !== 'number') {
        throw new Error('Resume audit API did not return expected JSON result.');
      }

      setAuditResults(data as AuditResultsData);
    } catch (err: any) {
      console.error('Error analyzing resume:', err);
      setApiError(typeof err?.message === 'string' ? err.message : 'Something went wrong.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportPDF = () => {
    alert('PDF export functionality will be implemented. Your audit report would be downloaded.');
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    setJobDescription('');
    setJobDescriptionFile(null);
    setTargetRole('');
    setCompanyName('');
    setRegion('india');
    setJobType('full-time');
    setErrors({
      file: '',
      jobDescription: '',
      jobDescriptionFile: '',
      targetRole: '',
      companyName: '',
    });
    setAuditResults(null);
    setApiError('');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadingState isVisible={isAnalyzing} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!auditResults ? (
          <>
            {apiError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="ExclamationTriangleIcon" size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-500 mb-1">Error</h3>
                    <p className="text-sm text-red-400">{apiError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="SparklesIcon" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Get Your ResumeMind Score<sup>TM</sup>
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Upload your resume and job description to receive a comprehensive AI-powered
                    audit with actionable insights to beat ATS systems and land more interviews.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
              <FileUploadZone onFileSelect={setSelectedFile} selectedFile={selectedFile} error={errors.file} />

              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
                onFileSelect={setJobDescriptionFile}
                selectedFile={jobDescriptionFile}
                error={errors.jobDescription}
              />

              <AuditFormFields
                targetRole={targetRole}
                companyName={companyName}
                region={region}
                jobType={jobType}
                onTargetRoleChange={setTargetRole}
                onCompanyNameChange={setCompanyName}
                onRegionChange={setRegion}
                onJobTypeChange={setJobType}
                errors={{ targetRole: errors.targetRole, companyName: errors.companyName }}
              />

              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-150 shadow-card hover:shadow-elevation flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="DocumentMagnifyingGlassIcon" size={20} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <AuditResults results={auditResults} onExportPDF={handleExportPDF} onStartOver={handleStartOver} />
        )}
      </div>
    </>
  );
};

export default ResumeAuditInteractive;
