import PrintLayout from "../_components/PrintLayout";
import { getFirestore } from "@/lib/firebaseAdmin";
import { verifyPdfUrl } from "@/lib/pdfSign";

export const runtime = "nodejs";

function mustInt(v: string | null) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : 0;
}

async function getWatermarkFlag(db: any) {
  try {
    const snap = await db.collection("config").doc("app").get();
    return snap.exists ? !!snap.data()?.pdfWatermarkEnabled : true;
  } catch {
    return true;
  }
}

function extractCoverLetterText(docData: any): string {
  // Common placements
  const candidate =
    docData?.content ??
    docData?.coverLetter ??
    docData?.text ??
    docData?.result ??
    "";

  // string → return
  if (typeof candidate === "string") return candidate;

  // array of lines/paragraphs
  if (Array.isArray(candidate)) {
    return candidate.map((x) => (typeof x === "string" ? x : "")).filter(Boolean).join("\n");
  }

  // object → try common keys
  if (candidate && typeof candidate === "object") {
    const keys = ["letter", "body", "final", "content", "text", "coverLetter"];
    for (const k of keys) {
      const v = (candidate as any)[k];
      if (typeof v === "string" && v.trim()) return v;
      if (Array.isArray(v)) {
        const joined = v.map((x) => (typeof x === "string" ? x : "")).filter(Boolean).join("\n");
        if (joined.trim()) return joined;
      }
    }

    // If your generator stored paragraphs in something like { paragraphs: [...] }
    if (Array.isArray((candidate as any).paragraphs)) {
      const joined = (candidate as any).paragraphs
        .map((x: any) => (typeof x === "string" ? x : ""))
        .filter(Boolean)
        .join("\n");
      if (joined.trim()) return joined;
    }

    // last-resort: pretty JSON (never [object Object])
    return JSON.stringify(candidate, null, 2);
  }

  return "";
}

function renderParagraphs(text: string) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  return lines.map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{ height: 8 }} />;
    return <p key={i}>{t}</p>;
  });
}

export default async function PrintCoverLetterPage({
  searchParams,
}: {
  searchParams: { coverLetterId?: string; sig?: string; exp?: string };
}) {
  const coverLetterId = (searchParams.coverLetterId || "").trim();
  const sig = (searchParams.sig || "").trim();
  const exp = mustInt(searchParams.exp || null);

  if (!coverLetterId || !sig || !exp) {
    return (
      <PrintLayout title="Unauthorized" watermarkEnabled={false}>
        <h1>Unauthorized</h1>
        <p className="small">Missing parameters.</p>
      </PrintLayout>
    );
  }

  const ok = verifyPdfUrl({ type: "coverLetter", id: coverLetterId, exp, sig });
  if (!ok) {
    return (
      <PrintLayout title="Unauthorized" watermarkEnabled={false}>
        <h1>Unauthorized</h1>
        <p className="small">Invalid or expired link.</p>
      </PrintLayout>
    );
  }

  const db = getFirestore();
  const wmEnabled = await getWatermarkFlag(db);

  // Try common collection names safely
  let docData: any = null;
  const colCandidates = ["coverLetters", "cover_letters"];
  for (const col of colCandidates) {
    const snap = await db.collection(col).doc(coverLetterId).get();
    if (snap.exists) {
      docData = snap.data();
      break;
    }
  }

  if (!docData) {
    return (
      <PrintLayout title="Not Found" watermarkEnabled={wmEnabled}>
        <h1>Not found</h1>
        <p className="small">Cover letter not found.</p>
      </PrintLayout>
    );
  }

  const text = extractCoverLetterText(docData);

  return (
    <PrintLayout title="Cover Letter" watermarkEnabled={wmEnabled}>
      <h1>Cover Letter</h1>
      <div className="hr" />
      {renderParagraphs(text)}
    </PrintLayout>
  );
}
