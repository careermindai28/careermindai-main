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

  const content =
    (docData.content || docData.coverLetter || docData.text || "").toString();

  return (
    <PrintLayout title="Cover Letter" watermarkEnabled={wmEnabled}>
      <h1>Cover Letter</h1>
      <div className="hr" />
      {content
        .split("\n")
        .map((line: string, i: number) =>
          line.trim() ? <p key={i}>{line}</p> : <div key={i} style={{ height: 8 }} />
        )}
    </PrintLayout>
  );
}
