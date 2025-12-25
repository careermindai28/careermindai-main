import { ResumeJSON } from "@/lib/resumeTypes";

export default function ExecutiveTemplate({ data }: { data: ResumeJSON }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="space-y-2">
        <div className="text-3xl font-semibold text-foreground">{data.headline || "Executive Resume"}</div>

      </div>

      <hr className="my-5 border-border" />

      {/* EXEC SUMMARY */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Executive Summary</h3>
        <div className="mt-3 text-sm text-foreground leading-6 space-y-2">
          {(data.professionalSummary || []).slice(0, 5).map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </div>
      </section>

      {/* KEY IMPACT */}
      {Array.isArray(data.achievements) && data.achievements.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Key Impact</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.achievements.slice(0, 8).map((a, i) => (
              <div key={i} className="text-sm text-foreground bg-background border border-border rounded-lg p-3">
                {a}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE (compressed older bullets by design) */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Professional Experience</h3>
          <div className="mt-3 space-y-5">
            {data.experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="text-sm font-semibold text-foreground">
                    {job.role} • {job.company}
                  </div>
                  <div className="text-xs text-text-secondary">{job.dates}</div>
                </div>
                {job.location ? <div className="text-xs text-text-secondary">{job.location}</div> : null}

                {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-foreground">
                    {job.bullets.slice(0, 4).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS (tight) */}
      {(data.coreSkills?.length || data.toolsAndTech?.length) ? (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Core Competencies</h3>
          <div className="mt-2 text-sm text-foreground leading-6">
            {(data.coreSkills || []).slice(0, 14).join(" • ")}
          </div>
          {data.toolsAndTech?.length ? (
            <div className="mt-2 text-xs text-text-secondary">
              Tools: {data.toolsAndTech.slice(0, 12).join(" • ")}
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EDUCATION */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Education</h3>
            <div className="mt-2 space-y-2 text-sm text-foreground">
              {data.education.map((e, i) => (
                <div key={i}>
                  <div className="font-medium">{e.degree}</div>
                  <div className="text-xs text-text-secondary">
                    {e.institution}{e.year ? ` • ${e.year}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {Array.isArray(data.certifications) && data.certifications.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Certifications</h3>
            <div className="mt-2 text-sm text-foreground leading-6">
              {data.certifications.slice(0, 12).join(" • ")}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
