"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import FileUploadZone from "./FileUploadZone";
import LoadingState from "./LoadingState";
import AuditResults from "./AuditResults";
import { getFirebaseAuth } from "@/lib/firebaseClient";

import UpgradeModal from "@/components/monetization/UpgradeModal";

const [showUpgrade, setShowUpgrade] = useState(false);


interface FormErrors {
  file: string;
}

interface Strength {
  title: string;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface ATSRecommendation {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
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
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<FormErrors>({ file: "" });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResultsData | null>(null);
  const [apiError, setApiError] = useState("");

  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  const auditId = useMemo(
    () => auditResults?.auditId || auditResults?.audit_id || "",
    [auditResults]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { file: "" };
    if (!selectedFile) newErrors.file = "Please upload your resume";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAnalyze = async () => {
    if (!validateForm()) return;

    setIsAnalyzing(true);
    setApiError("");
    setAuditResults(null);

    try {
      const formData = new FormData();
      if (!selectedFile) throw new Error("Resume file missing");
      formData.append("resumeFile", selectedFile);

      const res = await fetch("/api/resume-audit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Audit failed");

      setAuditResults(data);
    } catch (e: any) {
      setApiError(e?.message || "Something went wrong");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBuildResume = () => {
    if (!auditId) {
      setApiError("auditId missing from API response");
      return;
    }
    router.push(`/ai-resume-builder?auditId=${encodeURIComponent(auditId)}`);
  };

  const handleExportPDF = async () => {
    if (!auditId) {
      setApiError("Audit ID missing");
      return;
    }

    setIsExporting(true);
    setApiError("");

    try {
      const auth = getFirebaseAuth();
      const user = auth.currentUser;

      if (!user) {
        router.push("/sign-in");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("/api/pdf-export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "resume",
          id: auditId,
        }),
      });

        if (res.status === 402) {
        setShowUpgrade(true);
        return;
      }


      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Export failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "CareerMindAI-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      setApiError(e?.message || "PDF export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    setErrors({ file: "" });
    setAuditResults(null);
    setApiError("");
  };

  if (!isHydrated) return null;

  return (
    <>
      <LoadingState isVisible={isAnalyzing || isExporting} />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            {apiError}
          </div>
        )}

        {!auditResults ? (
          <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
            <FileUploadZone
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              error={errors.file}
            />
            
{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />} 

            <button
              onClick={handleAnalyze}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
            >
              Analyze Resume
            </button>
          </div>
        ) : (
          <>
            <div className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center">
              <div>
                <div className="text-sm text-text-secondary">Next step</div>
                <div className="font-semibold">Build AI Resume from this Audit</div>
                <div className="text-xs text-text-secondary break-all">
                  Audit ID: {auditId}
                </div>
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
