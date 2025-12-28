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
  id: string
): Promise<DownloadPdfResult> {
  try {
    // ✅ Get Firebase ID token (client-side only)
    const { getFirebaseAuth } = await import("@/lib/firebaseClient");
    const auth = getFirebaseAuth();
    const user = auth.currentUser;

    if (!user) {
      return {
        ok: false,
        code: "UNAUTHORIZED",
        message: "Please sign in to export PDFs.",
        status: 401,
      };
    }

    const token = await user.getIdToken();

    const res = await fetch("/api/pdf-export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
      body: JSON.stringify({ type, id }),
    });

    if (res.status === 402) {
      const data = await res.json().catch(() => null);
      return {
        ok: false,
        code: "EXPORT_LIMIT_REACHED",
        message:
          data?.error ||
          "Daily export limit reached. Upgrade to export unlimited PDFs.",
        status: 402,
      };
    }

    if (res.status === 401) {
      const data = await res.json().catch(() => null);
      return {
        ok: false,
        code: "UNAUTHORIZED",
        message: data?.error || "Unauthorized. Please sign in again.",
        status: 401,
      };
    }

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return {
        ok: false,
        code: "FAILED",
        message: data?.error || "PDF export failed.",
        status: res.status,
      };
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

    return { ok: true };
  } catch (e: any) {
    return {
      ok: false,
      code: "FAILED",
      message: e?.message || "PDF export failed.",
    };
  }
}
