"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResumePreview from "./components/ResumePreview";

type ResumeJSON = {
  headline: string;
  professionalSummary: string[];
  coreSkills: string[];
  toolsAndTech: string[];
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{ degree: string; institution: string; year?: string }>;
  certifications: string[];
  projects: Array<{ title: string; bullets: string[] }>;
  achievements: string[];
  keywordPack: string[];
};

type BuilderResponse = {
  ok: boolean;
  auditId: string;
  builderId: string;
  result: ResumeJSON;
};

export default function AIResumeBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auditId = useMemo(() => searchParams.get("auditId") || "", [searchParams]);

  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [region, setRegion] = useState("india");
  const [tone, setTone] = useState("premium");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState<BuilderResponse | null>(null);

  const [nextLoading, setNextLoading] = useState<"" | "cover" | "interview">("");

  const handleBuild = async () => {
    setErr("");
    setData(null);

    if (!auditId) {
      setErr("Missing auditId. Please run Resume Audit and click “Build AI Resume”.");
      return;
    }
    if (!targetRole.trim()) {
      setErr("Please enter a Target Role.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resume-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditId,
          targetRole: targetRole.trim(),
          jobDescription: jobDescription.trim(),
          region,
          tone,
        }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }

      if (!res.ok) {
        const msg = json?.error || raw || `Server error: ${res.status}`;
        throw new Error(msg);
      }

      if (!json?.result || !json?.builderId) {
        throw new Error("Builder API did not return expected result.");
      }

      setData(json as BuilderResponse);
    } catch (e: any) {
      setErr(typeof e?.message === "string" ? e.message : "Resume build failed.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => router.push("/landing-page");
  const startOver = () => router.push("/resume-audit-tool");

  const generateCoverLetter = async () => {
    if (!data?.builderId) return;
    setErr("");
    setNextLoading("cover");
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          builderId: data.builderId,
          jobDescription: jobDescription.trim(),
          tone,
        }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }

      if (!res.ok) throw new Error(json?.error || raw || `Server error: ${res.status}`);
      const coverLetterId = json?.coverLetterId as string | undefined;
      if (!coverLetterId) throw new Error("coverLetterId missing from API response.");
      router.push(`/cover-letter?builderId=${encodeURIComponent(data.builderId)}&coverLetterId=${encodeURIComponent(coverLetterId)}`);
    } catch (e: any) {
      setErr(typeof e?.message === "string" ? e.message : "Cover letter generation failed.");
    } finally {
      setNextLoading("");
    }
  };

  const generateInterviewGuide = async () => {
    if (!data?.builderId) return;
    setErr("");
    setNextLoading("interview");
    try {
      const res = await fetch("/api/interview-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          builderId: data.builderId,
          focus: "mixed",
          difficulty: "standard",
        }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }

      if (!res.ok) throw new Error(json?.error || raw || `Server error: ${res.status}`);
      const guideId = json?.guideId as string | undefined;
      if (!guideId) throw new Error("guideId missing from API response.");
      router.push(`/interview-guide?builderId=${encodeURIComponent(data.builderId)}&guideId=${encodeURIComponent(guideId)}`);
    } catch (e: any) {
      setErr(typeof e?.message === "string" ? e.message : "Interview guide generation failed.");
    } finally {
      setNextLoading("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AI Resume Builder</h1>
            <p className="text-sm text-text-secondary mt-2">
              Generate an ATS-optimized resume using your Resume Audit results.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goHome}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              Home
            </button>
            <button
              onClick={startOver}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              Start Over
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Audit ID</label>
            <div className="mt-1 text-sm text-text-secondary break-all">{auditId || "(missing)"}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Region</label>
            <select
              className="mt-1 w-full border border-border rounded-lg bg-background p-2"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="india">India</option>
              <option value="gcc">GCC / Middle East</option>
              <option value="global">Global</option>
              <option value="usa">USA</option>
              <option value="europe">Europe</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Target Role *</label>
            <input
              className="mt-1 w-full border border-border rounded-lg bg-background p-2"
              placeholder="e.g., Senior Market Risk Manager"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Tone</label>
            <select
              className="mt-1 w-full border border-border rounded-lg bg-background p-2"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="premium">Premium</option>
              <option value="executive">Executive</option>
              <option value="concise">Concise</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Job Description (optional)</label>
            <textarea
              className="mt-1 w-full border border-border rounded-lg bg-background p-2 min-h-[140px]"
              placeholder="Paste JD to tailor keywords and bullet framing (optional)."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {err && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            {err}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <button
            onClick={handleBuild}
            disabled={loading}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Building..." : "Build CareerMindAI Resume"}
          </button>

          {data?.builderId && (
            <div className="text-xs text-text-secondary break-all">
              Saved ✓ &nbsp; Builder ID: {data.builderId}
            </div>
          )}
        </div>

        {data?.builderId && (
  <div className="mt-2 text-xs text-text-secondary">
    Your resume is automatically saved.  
    You can generate a Cover Letter or Interview Guide anytime from this resume.
  </div>
)}

      </div>

      {data?.result && (
        <>
          <ResumePreview result={data.result} />

          {/* ✅ Continue CTAs */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="text-sm text-text-secondary mb-2">Next steps</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateCoverLetter}
                disabled={nextLoading !== "" || !data?.builderId}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
              >
                {nextLoading === "cover" ? "Generating..." : "Generate Cover Letter"}
              </button>

              <button
                onClick={generateInterviewGuide}
                disabled={nextLoading !== "" || !data?.builderId}
                className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground disabled:opacity-50"
              >
                {nextLoading === "interview" ? "Generating..." : "Generate Interview Guide"}
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Raw JSON (debug)</h2>
            <pre className="text-xs overflow-auto p-4 rounded-lg bg-background border border-border whitespace-pre-wrap break-words">
              {JSON.stringify(data.result, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
