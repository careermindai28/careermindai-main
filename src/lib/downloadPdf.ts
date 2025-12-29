type PdfType = "resume" | "coverLetter" | "interviewGuide";


export type DownloadPdfResult =
  | { ok: true }
  | {
      ok: false;
      code: "UNAUTHORIZED" | "EXPORT_LIMIT_REACHED" | "FAILED";
      message: string;
      status?: number;
    };

type DownloadPdfOpts = {
  onStart?: () => void;
  onDone?: () => void;
  onError?: (msg: string) => void;
};

export async function downloadPdf(
  type: PdfType,
  id: string,
  opts?: DownloadPdfOpts
): Promise<DownloadPdfResult> {
  try {
    opts?.onStart?.();

    const { getFirebaseAuth } = await import("@/lib/firebaseClient");
    const auth = getFirebaseAuth();
    const user = auth.currentUser;

    if (!user) {
      const msg = "Please sign in to export PDFs.";
      opts?.onError?.(msg);
      return { ok: false, code: "UNAUTHORIZED", message: msg, status: 401 };
    }

    const token = await user.getIdToken(true);

    const res = await fetch("/api/pdf-export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, id }),
    });

    if (res.status === 402) {
      const data = await res.json().catch(() => null);
      const msg =
        data?.error || "Daily export limit reached. Upgrade to export unlimited PDFs.";
      opts?.onError?.(msg);
      return { ok: false, code: "EXPORT_LIMIT_REACHED", message: msg, status: 402 };
    }

    if (res.status === 401 || res.status === 403) {
      const data = await res.json().catch(() => null);
      const msg = data?.error || "Unauthorized. Please sign in again.";
      opts?.onError?.(msg);
      return { ok: false, code: "UNAUTHORIZED", message: msg, status: res.status };
    }

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const msg = data?.error || "PDF export failed.";
      opts?.onError?.(msg);
      return { ok: false, code: "FAILED", message: msg, status: res.status };
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    a.download =
      type === "resume"
        ? "CareerMindAI-Resume.pdf"
        : type === "coverLetter"
        ? "CareerMindAI-CoverLetter.pdf"
        : "CareerMindAI-Interview-Guide.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    opts?.onDone?.();
    return { ok: true };
  } catch (e: any) {
    const msg = e?.message || "PDF export failed.";
    opts?.onError?.(msg);
    return { ok: false, code: "FAILED", message: msg };
  }
}
