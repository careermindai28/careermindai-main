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
        <p className="muted">Missing parameters.</p>
      </PrintLayout>
    );
  }

  const ok = verifyPdfUrl({ type: "interviewGuide", id: guideId, exp, sig });
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

  const snap = await db.collection("interviewGuides").doc(guideId).get();
  if (!snap.exists) {
    return (
      <PrintLayout title="Not Found" watermarkEnabled={wmEnabled}>
        <h1>Not found</h1>
        <p className="muted">Interview guide not found.</p>
      </PrintLayout>
    );
  }

  const doc = snap.data() as any;
  const c = doc?.content || doc || {};

  const overview = typeof c.overview === "string" ? c.overview.trim() : "";
  const quickPitch = typeof c.quickPitch === "string" ? c.quickPitch.trim() : "";

  const technicalQuestions = Array.isArray(c.technicalQuestions) ? c.technicalQuestions : [];
  const behavioralQuestions = Array.isArray(c.behavioralQuestions) ? c.behavioralQuestions : [];
  const roleSpecificTips = Array.isArray(c.roleSpecificTips) ? c.roleSpecificTips : [];
  const salaryNegotiation = Array.isArray(c.salaryNegotiation) ? c.salaryNegotiation : [];

  return (
    <PrintLayout title="Interview Guide" watermarkEnabled={wmEnabled}>
      <h1>Interview Preparation Guide</h1>
      <div className="hr" />

      {overview && (
        <>
          <h2>Overview</h2>
          <p>{overview}</p>
        </>
      )}

      {quickPitch && (
        <>
          <h2>Quick Pitch</h2>
          <p>{quickPitch}</p>
        </>
      )}

      {technicalQuestions.length > 0 && (
        <>
          <h2>Technical Questions</h2>
          {technicalQuestions.map((t: any, i: number) => {
            const q = typeof t?.q === "string" ? t.q : "";
            const a = typeof t?.idealAnswer === "string" ? t.idealAnswer : "";
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                {q && (
                  <p>
                    <b>Q:</b> {q}
                  </p>
                )}
                {a && (
                  <p>
                    <b>Ideal Answer:</b> {a}
                  </p>
                )}
              </div>
            );
          })}
        </>
      )}

      {behavioralQuestions.length > 0 && (
        <>
          <h2>Behavioral Questions (STAR)</h2>
          {behavioralQuestions.map((b: any, i: number) => {
            const q = typeof b?.q === "string" ? b.q : "";
            const star = typeof b?.starAnswer === "string" ? b.starAnswer : "";
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                {q && (
                  <p>
                    <b>Q:</b> {q}
                  </p>
                )}
                {star && (
                  <p>
                    <b>STAR Answer:</b> {star}
                  </p>
                )}
              </div>
            );
          })}
        </>
      )}

      {roleSpecificTips.length > 0 && (
        <>
          <h2>Role-Specific Tips</h2>
          <ul>
            {roleSpecificTips.map((x: any, i: number) => (
              <li key={i}>{typeof x === "string" ? x : JSON.stringify(x)}</li>
            ))}
          </ul>
        </>
      )}

      {salaryNegotiation.length > 0 && (
        <>
          <h2>Salary Negotiation</h2>
          <ul>
            {salaryNegotiation.map((x: any, i: number) => (
              <li key={i}>{typeof x === "string" ? x : JSON.stringify(x)}</li>
            ))}
          </ul>
        </>
      )}
    </PrintLayout>
  );
}
