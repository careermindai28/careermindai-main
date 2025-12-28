type PdfType = "resume" | "coverLetter" | "interviewGuide";

type DownloadResult =
  | { ok: true }
  | { ok: false; code: "EXPORT_LIMIT_REACHED" | "UNAUTHORIZED" | "FAILED"; message: string };

export async function downloadPdf(
  type: PdfType,
  id: string,
  opts?: {
    onStart?: () => void;
    onDone?: () => void;
    onError?: (msg: string) => void;
  }
): Promise<DownloadResult> {
  try {
    opts?.onStart?.();

    const res = await fetch("/api/pdf-export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });

    // Handle monetization responses cleanly
    if (res.status === 402) {
      const txt = await res.text().catch(() => "");
      return {
        ok: false,
        code: "EXPORT_LIMIT_REACHED",
        message: txt || "Daily export limit reached. Please upgrade.",
      };
    }

    if (res.status === 401 || res.status === 403) {
      const txt = await res.text().catch(() => "");
      return {
        ok: false,
        code: "UNAUTHORIZED",
        message: txt || "Unauthorized. Please sign in again.",
      };
    }

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { ok: false, code: "FAILED", message: txt || "PDF export failed" };
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const name =
      type === "resume"
        ? "CareerMindAI-Resume.pdf"
        : type === "coverLetter"
        ? "CareerMindAI-CoverLetter.pdf"
        : "CareerMindAI-Interview-Guide.pdf";

    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    opts?.onDone?.();
    return { ok: true };
  } catch (e: any) {
    const msg = e?.message || "Failed to download PDF";
    opts?.onError?.(msg);
    return { ok: false, code: "FAILED", message: msg };
  }
}
