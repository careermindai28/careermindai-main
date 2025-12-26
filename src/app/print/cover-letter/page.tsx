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

function splitParas(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
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
        <p className="muted">Missing parameters.</p>
      </PrintLayout>
    );
  }

  const ok = verifyPdfUrl({ type: "coverLetter", id: coverLetterId, exp, sig });
  if (!ok) {
    return (
      <PrintLayout title="Unauthorized" watermarkEnabled={false}>
        <h1>Unauthorized</h1>
        <p className="muted">Invalid or expired link.</p>
      </PrintLayout>
    );
  }

  const db = getFirestore();
  const wmEnabled = await getWatermarkFlag(db);

  const snap = await db.collection("coverLetters").doc(coverLetterId).get();
  if (!snap.exists) {
    return (
      <PrintLayout title="Not Found" watermarkEnabled={wmEnabled}>
        <h1>Not found</h1>
        <p className="muted">Cover letter not found.</p>
      </PrintLayout>
    );
  }

  const doc = snap.data() as any;
  const content = doc?.content || {};
  const subjectLine = typeof content?.subjectLine === "string" ? content.subjectLine.trim() : "";
  const letter = typeof content?.letter === "string" ? content.letter.trim() : "";

  const paras = splitParas(letter);

  return (
    <PrintLayout title="Cover Letter" watermarkEnabled={wmEnabled}>
      <h1>Cover Letter</h1>
      {subjectLine && <div className="badge">{subjectLine}</div>}
      <div className="hr" />
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </PrintLayout>
  );
}
