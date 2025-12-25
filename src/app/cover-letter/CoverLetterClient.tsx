"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CoverLetterClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const builderId = useMemo(() => sp.get("builderId") || "", [sp]);
  const coverLetterId = useMemo(() => sp.get("coverLetterId") || "", [sp]);

  const [content, setContent] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

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
          <button onClick={() => router.push(`/ai-resume-builder?auditId=`)} className="px-4 py-2 border border-border rounded-lg bg-background text-sm">
            Back
          </button>
        </div>
      </div>

      {!content && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <button onClick={load} disabled={loading || !coverLetterId} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50">
            {loading ? "Loading..." : "Load Cover Letter"}
          </button>
          {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
        </div>
      )}

      {content && (
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

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Raw JSON (debug)</h2>
            <pre className="text-xs overflow-auto p-4 rounded-lg bg-background border border-border whitespace-pre-wrap break-words">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        </>
      )}
      {/* 🔁 Continue Actions */}
<div className="bg-surface border border-border rounded-xl p-6">
  <div className="text-sm text-text-secondary mb-2">Continue</div>
  <div className="flex flex-col sm:flex-row gap-3">
    <button
      onClick={() => router.push(`/ai-resume-builder?auditId=`)}
      className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground"
    >
      Back to Resume
    </button>

    <button
      onClick={() =>
        router.push(
          `/interview-guide?builderId=${encodeURIComponent(builderId)}`
        )
      }
      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
    >
      Generate Interview Guide
    </button>

    <button
      onClick={() => router.push("/landing-page")}
      className="px-6 py-3 border border-border bg-background rounded-lg font-semibold text-foreground"
    >
      Home
    </button>
  </div>
</div>


    </div>
  );
}
