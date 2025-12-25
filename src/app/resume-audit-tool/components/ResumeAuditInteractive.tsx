'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import FileUploadZone from './FileUploadZone';
import JobDescriptionInput from './JobDescriptionInput';
import AuditFormFields from './AuditFormFields';
import LoadingState from './LoadingState';
import AuditResults from './AuditResults';

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
  auditId?: string;
  audit_id?: string;

  resumeMindScore: number;
  atsCompatibility: number;

  summary?: string;
  strengths: Strength[];
  improvements: Improvement[];
  atsRecommendations: ATSRecommendation[];

  recommendedKeywords?: string[];
  riskFlags?: string[];
  regionNotes?: string;
  roleFitNotes?: string;
}

export default function ResumeAuditInteractive() {
  console.log("🔥 ResumeAuditInteractive LOADED");
  const router = useRouter();

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
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const auditId = useMemo(
    () => auditResults?.auditId || auditResults?.audit_id || '',
    [auditResults]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      file: '',
      jobDescription: '',
      jobDescriptionFile: '',
      targetRole: '',
      companyName: '',
    };

    if (!selectedFile) newErrors.file = 'Please upload your resume';

    // Keep as required (as per your existing flow)
    if (!targetRole.trim()) newErrors.targetRole = 'Target role is required';
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAnalyze = async () => {
    if (!validateForm()) return;

    setIsAnalyzing(true);
    setApiError('');
    setAuditResults(null);

    try {
      const formData = new FormData();
      if (!selectedFile) throw new Error('Resume file missing');
      formData.append('resumeFile', selectedFile);

      if (jobDescription.trim()) formData.append('jobDescription', jobDescription);
      if (targetRole.trim()) formData.append('targetRole', targetRole);
      if (companyName.trim()) formData.append('companyName', companyName);
      if (region) formData.append('region', region);
      if (jobType) formData.append('experienceLevel', jobType);

      const res = await fetch('/api/resume-audit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Audit failed');

      setAuditResults(data);
    } catch (e: any) {
      setApiError(e?.message || 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBuildResume = () => {
    if (!auditId) {
      setApiError('auditId missing from API response');
      return;
    }
    router.push(`/ai-resume-builder?auditId=${encodeURIComponent(auditId)}`);
  };

  const handleExportPDF = () => {
    // keep existing behavior — you can wire export later
    alert('PDF export will be enabled in the next phase.');
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

  if (!isHydrated) return null;

  return (
    <>
      <LoadingState isVisible={isAnalyzing} />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            {apiError}
          </div>
        )}

        {!auditResults ? (
          <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
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

            <button
              onClick={handleAnalyze}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
            >
              Analyze Resume
            </button>
          </div>
        ) : (
          <>
            {/* ✅ CTA to Resume Builder */}
            <div className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center">
              <div>
                <div className="text-sm text-text-secondary">Next step</div>
                <div className="font-semibold">Build AI Resume from this Audit</div>
                <div className="text-xs text-text-secondary break-all">Audit ID: {auditId}</div>
              </div>
              <button
                onClick={handleBuildResume}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
              >
                Build AI Resume
              </button>
            </div>

            <AuditResults
              results={auditResults}
              onExportPDF={handleExportPDF}
              onStartOver={handleStartOver}
            />
          </>
        )}
      </div>
    </>
  );
}
