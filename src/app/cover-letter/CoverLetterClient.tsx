"use client";

import { setPdfWatermark } from "@/lib/pdfWatermark";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { downloadPdf } from "@/lib/downloadPdf";
import { getCareerMindAILoadingLine } from "@/lib/careermindaiLoadingLines";

export default function CoverLetterClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const builderId = useMemo(() => sp.get("builderId") || "", [sp]);
  const coverLetterId = useMemo(() => sp.get("coverLetterId") || "", [sp]);

  const [content, setContent] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);

  // ✅ PDF export UX
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfLine, setPdfLine] = useState("");

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`/api/cover-letter-read?coverLetterId=${encodeURIComponent(coverLetterId)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load cover letter.");
      setContent(json.content);
    } catch (e: any) {
      setErr(e?.message || "Failed to load.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPdfWatermark(true);
    if (coverLetterId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverLetterId]);

  const backToResume = () => {
    if (!builderId) return;
    router.push(`/ai-resume-builder?builderId=${encodeURIComponent(builderId)}`);
  };

  const generateInterviewGuide = async () => {
    if (!builderId) return;
    setErr("");
    setNextLoading(true);
    try {
      const res = await fetch("/api/interview-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          builderId,
          focus: "mixed",
          difficulty: "standard",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Interview guide generation failed.");
      if (!json?.guideId) throw new Error("guideId missing from API response.");
      router.push(`/interview-guide?builderId=${encodeURIComponent(builderId)}&guideId=${encodeURIComponent(json.guideId)}`);
    } catch (e: any) {
      setErr(e?.message || "Interview guide generation failed.");
    } finally {
      setNextLoading(false);
    }
  };

  const handleDownloadCoverLetterPdf = async () => {
    if (!coverLetterId) {
      setErr("Missing coverLetterId.");
      return;
    }
    setPdfLine(getCareerMindAILoadingLine());

    await downloadPdf("coverLetter", coverLetterId, {
      onStart: () => setPdfLoading(true),
      onDone: () => {
        setPdfLoading(false);
        setPdfLine("");
      },
      onError: (msg) => {
        setPdfLoading(false);
        setPdfLine("");
        alert(msg);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-foreground">Cover Letter</div>
          <div className="text-xs text-text-secondary break-all">Builder: {builderId} • CoverLetter: {coverLetterId}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => router.push("/landing-page")} className="px-4 py-2 border border-border rounded-lg bg-background text-sm">
            Home
          </button>
          <button onClick={() => router.push("/resume-audit-tool")} className="px-4 py-2 border border-border rounded-lg bg-background text-sm">
            Start Over
          </button>
        </div>
      </div>

      {err && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          {err}
        </div>
      )}

      {!content ? (
        <div className="bg-surface border border-border rounded-xl p-6">
          <button
            onClick={load}
            disabled={loading || !coverLetterId}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load Cover Letter"}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
            <div className="text-sm font-semibold text-foreground">{content.subjectLine || "Subject"}</div>
            <pre className="text-sm whitespace-pre-wrap break-words text-foreground">{content.letter || ""}</pre>
            {Array.isArray(content.highlights) && content.highlights.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-foreground space-y-1">
                {content.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
              </ul>
            )}
          </div>

          <div className="no-print bg-surface border border-border rounded-xl p-6 flex flex-col items-end gap-2">
            <button
              onClick={handleDownloadCoverLetterPdf}
              disabled={pdfLoading}
              className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground disabled:opacity-50"
            >
              {pdfLoading ? "Generating PDF..." : "Download Cover Letter PDF"}
            </button>

            {pdfLoading && (
              <div className="text-xs text-text-secondary max-w-xl text-right">
                {pdfLine}
              </div>
            )}
          </div>

          {/* ✅ Continue Actions */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="text-sm text-text-secondary mb-2">Continue</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={backToResume}
                disabled={!builderId}
                className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground disabled:opacity-50"
              >
                Back to Resume
              </button>

              <button
                onClick={generateInterviewGuide}
                disabled={!builderId || nextLoading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
              >
                {nextLoading ? "Generating..." : "Generate Interview Guide"}
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Raw JSON (debug)</h2>
            <pre className="text-xs overflow-auto p-4 rounded-lg bg-background border border-border whitespace-pre-wrap break-words">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
