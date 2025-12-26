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
    const enabled = snap.exists ? !!snap.data()?.pdfWatermarkEnabled : true;
    return enabled;
  } catch {
    return true;
  }
}

export default async function PrintResumePage({
  searchParams,
}: {
  searchParams: { builderId?: string; sig?: string; exp?: string };
}) {
  const builderId = (searchParams.builderId || "").trim();
  const sig = (searchParams.sig || "").trim();
  const exp = mustInt(searchParams.exp || null);

  if (!builderId || !sig || !exp) {
    return (
      <PrintLayout title="Unauthorized" watermarkEnabled={false}>
        <h1>Unauthorized</h1>
        <p className="small">Missing parameters.</p>
      </PrintLayout>
    );
  }

  const ok = verifyPdfUrl({ type: "resume", id: builderId, exp, sig });
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

  const snap = await db.collection("builders").doc(builderId).get();
  if (!snap.exists) {
    return (
      <PrintLayout title="Not Found" watermarkEnabled={wmEnabled}>
        <h1>Not found</h1>
        <p className="small">Builder document not found.</p>
      </PrintLayout>
    );
  }

  const doc = snap.data() as any;
  const r = doc.result || {};
  const inputs = doc.inputs || {};

  const headline = (r.headline || inputs.targetRole || "CareerMindAI Resume").toString();
  const skills: string[] = Array.isArray(r.coreSkills) ? r.coreSkills : [];
  const tools: string[] = Array.isArray(r.toolsAndTech) ? r.toolsAndTech : [];
  const summary: string[] = Array.isArray(r.professionalSummary) ? r.professionalSummary : [];

  const experience = Array.isArray(r.experience) ? r.experience : [];
  const education = Array.isArray(r.education) ? r.education : [];
  const certs: string[] = Array.isArray(r.certifications) ? r.certifications : [];
  const projects = Array.isArray(r.projects) ? r.projects : [];
  const achievements: string[] = Array.isArray(r.achievements) ? r.achievements : [];

  return (
    <PrintLayout title="Resume" watermarkEnabled={wmEnabled}>
      <h1>{headline}</h1>
      <div className="small">
        Target Role: {(inputs.targetRole || "").toString()}
        {inputs.companyName ? ` • Company: ${inputs.companyName}` : ""}
        {inputs.region ? ` • Region: ${inputs.region}` : ""}
      </div>

      <div className="hr" />

      {summary.length > 0 && (
        <>
          <h2>Professional Summary</h2>
          <ul>
            {summary.map((x: string, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </>
      )}

      {(skills.length > 0 || tools.length > 0) && (
        <>
          <h2>Skills</h2>
          {skills.length > 0 && <p><b>Core:</b> {skills.join(", ")}</p>}
          {tools.length > 0 && <p><b>Tools:</b> {tools.join(", ")}</p>}
        </>
      )}

      {experience.length > 0 && (
        <>
          <h2>Experience</h2>
          {experience.map((job: any, i: number) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="row">
                <div>
                  <b>{job.role || ""}</b>
                  {job.company ? ` — ${job.company}` : ""}
                  {job.location ? `, ${job.location}` : ""}
                </div>
                <div className="small">{job.dates || ""}</div>
              </div>
              {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                <ul>
                  {job.bullets.map((b: string, bi: number) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {(education.length > 0 || certs.length > 0) && (
        <>
          <h2>Education & Certifications</h2>
          {education.length > 0 && (
            <ul>
              {education.map((e: any, i: number) => (
                <li key={i}>
                  <b>{e.degree || ""}</b>
                  {e.institution ? ` — ${e.institution}` : ""}
                  {e.year ? ` (${e.year})` : ""}
                </li>
              ))}
            </ul>
          )}
          {certs.length > 0 && <p><b>Certifications:</b> {certs.join(", ")}</p>}
        </>
      )}

      {projects.length > 0 && (
        <>
          <h2>Projects</h2>
          {projects.map((p: any, i: number) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <b>{p.title || ""}</b>
              {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                <ul>
                  {p.bullets.map((b: string, bi: number) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {achievements.length > 0 && (
        <>
          <h2>Achievements</h2>
          <ul>
            {achievements.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </>
      )}
    </PrintLayout>
  );
}
