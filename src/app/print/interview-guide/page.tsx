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

function renderLines(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{ height: 8 }} />;

    // Simple heading heuristic
    const isHeading =
      t.length < 70 &&
      (t.endsWith(":") ||
        t.toLowerCase().includes("section") ||
        /^[0-9]+\./.test(t));

    if (isHeading) {
      return (
        <div key={i} style={{ marginTop: 14 }}>
          <b>{t.replace(/:$/, "")}</b>
        </div>
      );
    }

    // Bullet heuristic
    if (t.startsWith("- ") || t.startsWith("• ")) {
      return (
        <ul key={i} style={{ marginTop: 6 }}>
          <li>{t.replace(/^[-•]\s+/, "")}</li>
        </ul>
      );
    }

    return <p key={i}>{t}</p>;
  });
}

export default async function PrintInterviewGuidePage({
  searchParams,
}: {
  searchParams: { guideId?: string; sig?: string; exp?: string };
}) {
  const guideId = (searchParams.guideId || "").trim();
  const sig = (searchParams.sig || "").trim();
  const exp = mustInt(searchParams.exp || null);

  if (!guideId || !sig || !exp) {
    return (
      <PrintLayout title="Unauthorized" watermarkEnabled={false}>
        <h1>Unauthorized</h1>
        <p className="small">Missing parameters.</p>
      </PrintLayout>
    );
  }

  const ok = verifyPdfUrl({ type: "interviewGuide", id: guideId, exp, sig });
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

  let docData: any = null;
  const colCandidates = ["interviewGuides", "interview_guides"];
  for (const col of colCandidates) {
    const snap = await db.collection(col).doc(guideId).get();
    if (snap.exists) {
      docData = snap.data();
      break;
    }
  }

  if (!docData) {
    return (
      <PrintLayout title="Not Found" watermarkEnabled={wmEnabled}>
        <h1>Not found</h1>
        <p className="small">Interview guide not found.</p>
      </PrintLayout>
    );
  }

  const content =
    (docData.content || docData.guide || docData.text || "").toString();

  return (
    <PrintLayout title="Interview Guide" watermarkEnabled={wmEnabled}>
      <h1>Interview Preparation Guide</h1>
      <div className="hr" />
      {renderLines(content)}
    </PrintLayout>
  );
}
