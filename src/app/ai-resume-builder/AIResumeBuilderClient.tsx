"use client";
import { printPdf } from "@/lib/printPdf";
import { setPdfWatermark } from "@/lib/pdfWatermark";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TemplateRenderer from "./components/TemplateRenderer";
import { ResumeJSON, TemplateKey } from "@/lib/resumeTypes";

type BuilderResponse = {
  ok: boolean;
  auditId: string;
  builderId: string;
  result: ResumeJSON;
};

export default function AIResumeBuilderClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const auditIdFromUrl = useMemo(() => sp.get("auditId") || "", [sp]);
  const builderIdFromUrl = useMemo(() => sp.get("builderId") || "", [sp]);

  const [auditId, setAuditId] = useState(auditIdFromUrl);

  const [targetRole, setTargetRole] = useState("");
  const [companyName, setCompanyName] = useState(""); // ✅ NEW
  const [region, setRegion] = useState("india");
  const [tone, setTone] = useState("premium");

  // ✅ JD handling
  const [jdText, setJdText] = useState(""); // canonical JD text used for tailoring
  const [jdFileName, setJdFileName] = useState<string>("");
  const [jdExtracting, setJdExtracting] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState<BuilderResponse | null>(null);

  const [nextLoading, setNextLoading] = useState<"" | "cover" | "interview">("");
  const [template, setTemplate] = useState<TemplateKey>("atsClassic");
  const [templateSaving, setTemplateSaving] = useState(false);

  // ✅ Re-open existing builder
  useEffect(() => {
    setPdfWatermark(true); // default ON
    const loadExisting = async () => {
      if (!builderIdFromUrl) return;
      setErr("");
      setLoading(true);
      try {
        const res = await fetch(`/api/builder-read?builderId=${encodeURIComponent(builderIdFromUrl)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load saved resume.");

        setAuditId(json.auditId || "");
        setTargetRole(json.inputs?.targetRole || "");
        setCompanyName(json.inputs?.companyName || "");
        setRegion(json.inputs?.region || "india");
        setTone(json.inputs?.tone || "premium");
        setJdText(json.inputs?.jobDescription || json.inputs?.jdText || ""); // compat
        setTemplate((json.selectedTemplate || "atsClassic") as TemplateKey);

        setData({
          ok: true,
          auditId: json.auditId,
          builderId: json.builderId,
          result: json.result,
        });
      } catch (e: any) {
        setErr(e?.message || "Failed to load.");
      } finally {
        setLoading(false);
      }
    };
    loadExisting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderIdFromUrl]);

  const goHome = () => router.push("/landing-page");
  const startOver = () => router.push("/resume-audit-tool");

  // ✅ JD file upload → extract text via API
  const onJDUpload = async (file: File | null) => {
    if (!file) return;
    setErr("");
    setJdExtracting(true);
    setJdFileName(file.name);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/jd-extract", { method: "POST", body: fd });
      const json = await res.json().catch(() => null);

      if (!res.ok) throw new Error(json?.error || "JD extraction failed.");
      if (!json?.jdText) throw new Error("No jdText returned.");

      setJdText(json.jdText);
    } catch (e: any) {
      setErr(e?.message || "JD extraction failed.");
      setJdFileName("");
    } finally {
      setJdExtracting(false);
    }
  };

  const handleBuild = async () => {
    setErr("");
    setData(null);

    const aid = (auditId || "").trim();
    if (!aid) {
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
          auditId: aid,
          targetRole: targetRole.trim(),
          companyName: companyName.trim(), // ✅ NEW
          jobDescription: jdText.trim(),   // ✅ JD text (paste or extracted)
          region,
          tone,
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Resume build failed.");
      if (!json?.result || !json?.builderId) throw new Error("Builder API did not return expected result.");

      setAuditId(json.auditId || aid);
      setTemplate((json.selectedTemplate || "atsClassic") as TemplateKey);

      setData({
        ok: true,
        auditId: json.auditId || aid,
        builderId: json.builderId,
        result: json.result,
      });

      router.replace(`/ai-resume-builder?builderId=${encodeURIComponent(json.builderId)}`);
    } catch (e: any) {
      setErr(typeof e?.message === "string" ? e.message : "Resume build failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async (builderId: string, selectedTemplate: TemplateKey) => {
    setTemplateSaving(true);
    try {
      const res = await fetch("/api/builder-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ builderId, selectedTemplate }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Failed to save template.");
    } finally {
      setTemplateSaving(false);
    }
  };

  const onTemplateChange = async (val: TemplateKey) => {
    setTemplate(val);
    if (data?.builderId) {
      try {
        await saveTemplate(data.builderId, val);
      } catch (e: any) {
        setErr(e?.message || "Template save failed.");
      }
    }
  };

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
          companyName: companyName.trim(), // ✅ NEW (safe if backend ignores)
          jobDescription: jdText.trim(),   // ✅ use same JD
          tone,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Cover letter generation failed.");
      if (!json?.coverLetterId) throw new Error("coverLetterId missing from API response.");

      router.push(`/cover-letter?builderId=${encodeURIComponent(data.builderId)}&coverLetterId=${encodeURIComponent(json.coverLetterId)}`);
    } catch (e: any) {
      setErr(e?.message || "Cover letter generation failed.");
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
          companyName: companyName.trim(), // ✅ NEW (safe if backend ignores)
          jobDescription: jdText.trim(),   // ✅ use same JD
          focus: "mixed",
          difficulty: "standard",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Interview guide generation failed.");
      if (!json?.guideId) throw new Error("guideId missing from API response.");

      router.push(`/interview-guide?builderId=${encodeURIComponent(data.builderId)}&guideId=${encodeURIComponent(json.guideId)}`);
    } catch (e: any) {
      setErr(e?.message || "Interview guide generation failed.");
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
              Tailor your resume using Target Role + optional JD.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={goHome} className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
              Home
            </button>
            <button onClick={startOver} className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
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
            <select className="mt-1 w-full border border-border rounded-lg bg-background p-2" value={region} onChange={(e) => setRegion(e.target.value)}>
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
            <label className="text-sm font-medium text-foreground">Company Name (optional)</label>
            <input
              className="mt-1 w-full border border-border rounded-lg bg-background p-2"
              placeholder="e.g., Morgan Stanley"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Tone</label>
            <select className="mt-1 w-full border border-border rounded-lg bg-background p-2" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="premium">Premium</option>
              <option value="executive">Executive</option>
              <option value="concise">Concise</option>
            </select>
          </div>

          {/* ✅ JD Upload (minimal UI) */}
          <div>
            <label className="text-sm font-medium text-foreground">Job Description Upload (optional)</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="mt-1 w-full border border-border rounded-lg bg-background p-2 text-sm"
              onChange={(e) => onJDUpload(e.target.files?.[0] || null)}
            />
            <div className="mt-1 text-xs text-text-secondary">
              {jdExtracting
                ? "Extracting JD text..."
                : jdFileName
                  ? `Loaded: ${jdFileName}`
                  : "Upload PDF/DOCX/TXT (or paste below)."}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Job Description (paste text, optional)</label>
            <textarea
              className="mt-1 w-full border border-border rounded-lg bg-background p-2 min-h-[160px]"
              placeholder="Paste JD here (this will tailor keywords and bullet framing)."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            {!!jdText.trim() && (
              <div className="mt-1 text-xs text-text-secondary">
                JD text loaded ({jdText.trim().length} chars).
                <button
                  type="button"
                  className="ml-2 underline"
                  onClick={() => {
                    setJdText("");
                    setJdFileName("");
                  }}
                >
                  Clear
                </button>
              </div>
            )}
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
            disabled={loading || jdExtracting}
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
            Your resume is automatically saved. You can generate a Cover Letter or Interview Guide anytime from this resume.
          </div>
        )}
      </div>

      {/* ✅ Template selector */}
      {data?.builderId && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-foreground">Resume Template</div>
              <div className="text-xs text-text-secondary mt-1">Choose a layout. Content stays the same; only presentation changes.</div>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="border border-border rounded-lg bg-background p-2 text-sm"
                value={template}
                onChange={(e) => onTemplateChange(e.target.value as TemplateKey)}
              >
                <option value="atsClassic">ATS Classic</option>
                <option value="modernProfessional">Modern Professional</option>
                <option value="executive">Executive</option>
              </select>
              <div className="text-xs text-text-secondary">{templateSaving ? "Saving..." : "Saved"}</div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Template preview */}
      {data?.result && (
        <>
          <TemplateRenderer template={template} data={data.result} />
          <div className="no-print bg-surface border border-border rounded-xl p-6 flex justify-end">
  <button
    onClick={printPdf}
    className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground"
  >
    Download Resume PDF
  </button>
</div>


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
        </>
      )}
    </div>
  );
}
