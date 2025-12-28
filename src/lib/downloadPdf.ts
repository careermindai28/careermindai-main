type PdfType = "resume" | "coverLetter" | "interviewGuide";

export type DownloadPdfResult =
  | { ok: true }
  | {
      ok: false;
      code: "UNAUTHORIZED" | "EXPORT_LIMIT_REACHED" | "FAILED";
      message: string;
      status?: number;
    };

export async function downloadPdf(
  type: PdfType,
  id: string,
  opts?: {
    onStart?: () => void;
    onDone?: () => void;
    onError?: (msg: string) => void;
  }
): Promise<DownloadPdfResult> {
  try {
    opts?.onStart?.();

    // ✅ Lazy import to avoid server-side bundling issues
    const { getFirebaseAuth } = await import("@/lib/firebaseClient");
    const auth = getFirebaseAuth();
    const user = auth.currentUser;

    if (!user) {
      const msg = "Please sign in to export PDFs.";
      opts?.onError?.(msg);
      return { ok: false, code: "UNAUTHORIZED", message: msg, status: 401 };
    }

    const token = await user.getIdToken();

    const res = await fetch("/api/pdf-export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED by your API
      },
      body: JSON.stringify({ type, id }),
    });

    if (res.status === 402) {
      const data = await res.json().catch(() => null);
      const msg =
        data?.error ||
        "Daily export limit reached. Upgrade to export unlimited PDFs.";
      opts?.onError?.(msg);
      return { ok: false, code: "EXPORT_LIMIT_REACHED", message: msg, status: 402 };
    }

    if (res.status === 401) {
      const msg = "Unauthorized. Please sign in again.";
      opts?.onError?.(msg);
      return { ok: false, code: "UNAUTHORIZED", message: msg, status: 401 };
    }

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const msg = data?.error || "PDF export failed";
      opts?.onError?.(msg);
      return { ok: false, code: "FAILED", message: msg, status: res.status };
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
