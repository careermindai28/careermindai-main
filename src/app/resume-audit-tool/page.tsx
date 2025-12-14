"use client";

import React, { useMemo, useState } from "react";

type AuditResult = {
  resumeMindScore: number;
  atsCompatibility: number;
  summary: string;
  strengths: { title: string; description: string }[];
  improvements: { title: string; description: string; priority: "high" | "medium" | "low" }[];
  atsRecommendations: { title: string; description: string; impact: "high" | "medium" | "low" }[];
  recommendedKeywords: string[];
  riskFlags: string[];
  regionNotes: string;
  roleFitNotes: string;
};

export default function ResumeAuditToolPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<AuditResult | null>(null);

  const fileHint = useMemo(() => {
    if (!file) return "";
    return `${file.name} (${Math.round(file.size / 1024)} KB)`;
  }, [file]);

  async function onAnalyze() {
    setError("");
    setResult(null);

    if (!file) {
      setError("Please upload a resume file (PDF or DOCX).");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("resumeFile", file); // ✅ IMPORTANT: server expects resumeFile
      if (jobDescription.trim()) fd.append("jobDescription", jobDescription.trim());
      if (targetRole.trim()) fd.append("targetRole", targetRole.trim());
      if (companyName.trim()) fd.append("companyName", companyName.trim());
      if (region.trim()) fd.append("region", region.trim());
      if (experienceLevel.trim()) fd.append("experienceLevel", experienceLevel.trim());

      const res = await fetch("/api/resume-audit", {
        method: "POST",
        body: fd, // ✅ multipart/form-data automatically
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Resume audit failed.");
      }

      setResult(data as AuditResult);
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Resume Audit Tool</h1>
      <p style={{ marginBottom: 18, opacity: 0.85 }}>
        Upload your resume (PDF/DOCX). We’ll extract the text on the server and generate a ResumeMind audit.
      </p>

      <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Upload Resume (PDF/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {fileHint ? <div style={{ marginTop: 8, opacity: 0.8 }}>{fileHint}</div> : null}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Target Role (optional)</label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
            placeholder="e.g., Market Risk Manager"
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Company (optional)</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
            placeholder="e.g., Morgan Stanley"
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Region (optional)</label>
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
            placeholder="e.g., India / GCC / Remote"
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Experience Level (optional)</label>
          <input
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
            placeholder="e.g., 10+ years"
          />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Job Description (optional)</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ width: "100%", minHeight: 140, padding: 12, border: "1px solid #e5e7eb", borderRadius: 10 }}
          placeholder="Paste JD here for keyword matching..."
        />
      </div>

      {error ? (
        <div style={{ padding: 12, background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, marginBottom: 12 }}>
          <b>Error:</b> {error}
        </div>
      ) : null}

      <button
        onClick={onAnalyze}
        disabled={loading}
        style={{
          padding: "12px 16px",
          borderRadius: 12,
          border: "1px solid #111827",
          background: loading ? "#e5e7eb" : "#111827",
          color: loading ? "#111827" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 700,
        }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result ? (
        <div style={{ marginTop: 20, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Audit Results</h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
            <div><b>ResumeMind Score:</b> {result.resumeMindScore}/100</div>
            <div><b>ATS Compatibility:</b> {result.atsCompatibility}%</div>
          </div>

          <p style={{ marginBottom: 12 }}><b>Summary:</b> {result.summary}</p>

          <div style={{ marginBottom: 12 }}>
            <b>Strengths</b>
            <ul>
              {result.strengths?.map((s, i) => <li key={i}>{s.description}</li>)}
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <b>Improvements</b>
            <ul>
              {result.improvements?.map((imp, i) => (
                <li key={i}>
                  <b>{imp.priority.toUpperCase()}:</b> {imp.description}
                </li>
              ))}
            </ul>
          </div>

          {result.recommendedKeywords?.length ? (
            <div style={{ marginBottom: 12 }}>
              <b>Recommended Keywords</b>
              <div style={{ marginTop: 6, opacity: 0.9 }}>{result.recommendedKeywords.join(", ")}</div>
            </div>
          ) : null}

          {result.riskFlags?.length ? (
            <div style={{ marginBottom: 12 }}>
              <b>Risk Flags</b>
              <ul>
                {result.riskFlags.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
