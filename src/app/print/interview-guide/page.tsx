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

function extractInterviewGuide(docData: any): { mode: "text" | "structured"; text?: string; structured?: any } {
  const candidate = docData?.content ?? docData?.guide ?? docData?.text ?? docData?.result ?? "";

  if (typeof candidate === "string") return { mode: "text", text: candidate };

  if (Array.isArray(candidate)) {
    const joined = candidate.map((x) => (typeof x === "string" ? x : "")).filter(Boolean).join("\n");
    return { mode: "text", text: joined };
  }

  if (candidate && typeof candidate === "object") {
    // If it has a "text" field
    if (typeof (candidate as any).text === "string") return { mode: "text", text: (candidate as any).text };

    // If it has common sections arrays
    if (Array.isArray((candidate as any).sections) || Array.isArray((candidate as any).questions)) {
      return { mode: "structured", structured: candidate };
    }

    // last-resort: render JSON in readable way (not [object Object])
    return { mode: "text", text: JSON.stringify(candidate, null, 2) };
  }

  return { mode: "text", text: "" };
}

function renderText(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  return lines.map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{ height: 8 }} />;

    const isHeading =
      t.length < 70 &&
      (t.endsWith(":") || t.toLowerCase().includes("section") || /^[0-9]+\./.test(t));

    if (isHeading) {
      return (
        <div key={i} style={{ marginTop: 14 }}>
          <b>{t.replace(/:$/, "")}</b>
        </div>
      );
    }

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

function renderStructuredGuide(g: any) {
  const nodes: JSX.Element[] = [];

  // Sections style
  if (Array.isArray(g.sections)) {
    g.sections.forEach((s: any, idx: number) => {
      const title = typeof s?.title === "string" ? s.title : `Section ${idx + 1}`;
      nodes.push(
        <div key={`sec-${idx}`} style={{ marginTop: 14 }}>
          <b>{title}</b>
        </div>
      );

      if (typeof s?.intro === "string" && s.intro.trim()) {
        nodes.push(<p key={`sec-intro-${idx}`}>{s.intro.trim()}</p>);
      }

      if (Array.isArray(s?.bullets) && s.bullets.length) {
        nodes.push(
          <ul key={`sec-bul-${idx}`}>
            {s.bullets.map((b: any, bi: number) => (
              <li key={bi}>{typeof b === "string" ? b : JSON.stringify(b)}</li>
            ))}
          </ul>
        );
      }

      if (Array.isArray(s?.questions) && s.questions.length) {
        s.questions.forEach((q: any, qi: number) => {
          const qText = typeof q?.q === "string" ? q.q : typeof q === "string" ? q : `Question ${qi + 1}`;
          const aText = typeof q?.a === "string" ? q.a : "";

          nodes.push(
            <div key={`q-${idx}-${qi}`} style={{ marginTop: 10 }}>
              <b>Q:</b> {qText}
            </div>
          );
          if (aText) nodes.push(<p key={`a-${idx}-${qi}`}><b>A:</b> {aText}</p>);
        });
      }
    });

    return nodes;
  }

  // Flat questions style
  if (Array.isArray(g.questions)) {
    g.questions.forEach((q: any, qi: number) => {
      const qText = typeof q?.q === "string" ? q.q : typeof q === "string" ? q : `Question ${qi + 1}`;
      const aText = typeof q?.a === "string" ? q.a : "";

      nodes.push(
        <div key={`q-${qi}`} style={{ marginTop: 10 }}>
          <b>Q:</b> {qText}
        </div>
      );
      if (aText) nodes.push(<p key={`a-${qi}`}><b>A:</b> {aText}</p>);
    });

    return nodes;
  }

  return renderText(JSON.stringify(g, null, 2));
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

  const extracted = extractInterviewGuide(docData);

  return (
    <PrintLayout title="Interview Guide" watermarkEnabled={wmEnabled}>
      <h1>Interview Preparation Guide</h1>
      <div className="hr" />
      {extracted.mode === "structured"
        ? renderStructuredGuide(extracted.structured)
        : renderText(extracted.text || "")}
    </PrintLayout>
  );
}
