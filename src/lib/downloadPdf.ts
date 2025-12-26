type PdfType = "resume" | "coverLetter" | "interviewGuide";

export async function downloadPdf(
  type: PdfType,
  id: string,
  opts?: {
    onStart?: () => void;
    onDone?: () => void;
    onError?: (msg: string) => void;
  }
) {
  try {
    opts?.onStart?.();

    const res = await fetch("/api/pdf-export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || "PDF export failed");
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
  } catch (e: any) {
    const msg = e?.message || "Failed to download PDF";
    opts?.onError?.(msg);
    throw e;
  }
}
