"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function InterviewGuideClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const builderId = useMemo(() => sp.get("builderId") || "", [sp]);
  const guideId = useMemo(() => sp.get("guideId") || "", [sp]);

  const [content, setContent] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`/api/interview-guide-read?guideId=${encodeURIComponent(guideId)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load guide.");
      setContent(json.content);
    } catch (e: any) {
      setErr(e?.message || "Failed to load.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (guideId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideId]);

  const backToResume = () => {
    if (!builderId) return;
    router.push(`/ai-resume-builder?builderId=${encodeURIComponent(builderId)}`);
  };

  const generateCoverLetter = async () => {
    if (!builderId) return;
    setErr("");
    setNextLoading(true);
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          builderId,
          jobDescription: "",
          tone: "premium",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Cover letter generation failed.");
      if (!json?.coverLetterId) throw new Error("coverLetterId missing from API response.");
      router.push(`/cover-letter?builderId=${encodeURIComponent(builderId)}&coverLetterId=${encodeURIComponent(json.coverLetterId)}`);
    } catch (e: any) {
      setErr(e?.message || "Cover letter generation failed.");
    } finally {
      setNextLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-foreground">Interview Guide</div>
          <div className="text-xs text-text-secondary break-all">Builder: {builderId} • Guide: {guideId}</div>
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
            disabled={loading || !guideId}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load Interview Guide"}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            {content.overview && <p className="text-sm text-foreground whitespace-pre-wrap break-words">{content.overview}</p>}

            {content.quickPitch && (
              <div>
                <div className="font-semibold text-foreground mb-1">Quick Pitch</div>
                <pre className="text-sm whitespace-pre-wrap break-words">{content.quickPitch}</pre>
              </div>
            )}

            {Array.isArray(content.roleSpecificTips) && content.roleSpecificTips.length > 0 && (
              <div>
                <div className="font-semibold text-foreground mb-1">Role-Specific Tips</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {content.roleSpecificTips.map((t: string, i: number) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}

            {Array.isArray(content.technicalQuestions) && content.technicalQuestions.length > 0 && (
              <div>
                <div className="font-semibold text-foreground mb-2">Technical Questions</div>
                <div className="space-y-3">
                  {content.technicalQuestions.map((x: any, i: number) => (
                    <div key={i} className="border border-border rounded-lg p-4 bg-background">
                      <div className="font-medium">{x.q}</div>
                      <div className="text-sm text-text-secondary mt-1 whitespace-pre-wrap break-words">{x.idealAnswer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(content.behavioralQuestions) && content.behavioralQuestions.length > 0 && (
              <div>
                <div className="font-semibold text-foreground mb-2">Behavioral Questions (STAR)</div>
                <div className="space-y-3">
                  {content.behavioralQuestions.map((x: any, i: number) => (
                    <div key={i} className="border border-border rounded-lg p-4 bg-background">
                      <div className="font-medium">{x.q}</div>
                      <div className="text-sm text-text-secondary mt-1 whitespace-pre-wrap break-words">{x.starAnswer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(content.salaryNegotiation) && content.salaryNegotiation.length > 0 && (
              <div>
                <div className="font-semibold text-foreground mb-1">Salary Negotiation</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {content.salaryNegotiation.map((t: string, i: number) => <li key={i}>{t}</li>)}
                </ul>
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
                onClick={generateCoverLetter}
                disabled={!builderId || nextLoading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50"
              >
                {nextLoading ? "Generating..." : "Generate Cover Letter"}
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
