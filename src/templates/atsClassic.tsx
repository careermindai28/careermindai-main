import { ResumeJSON } from "@/lib/resumeTypes";

export default function ATSClassicTemplate({ data }: { data: ResumeJSON }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="space-y-1">
        <div className="text-xl font-semibold text-foreground">{data.headline || "Resume"}</div>

      </div>

      <hr className="my-4 border-border" />

      {/* SUMMARY */}
      {Array.isArray(data.professionalSummary) && data.professionalSummary.length > 0 && (
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Summary</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-foreground">
            {data.professionalSummary.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>
      )}

      {/* SKILLS */}
      {(data.coreSkills?.length || data.toolsAndTech?.length) ? (
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Skills</h3>
          <div className="mt-2 text-sm text-foreground leading-6">
            {data.coreSkills?.length ? (
              <div>
                <span className="font-medium">Core: </span>
                {data.coreSkills.join(", ")}
              </div>
            ) : null}
            {data.toolsAndTech?.length ? (
              <div className="mt-1">
                <span className="font-medium">Tools: </span>
                {data.toolsAndTech.join(", ")}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* EXPERIENCE */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Experience</h3>
          <div className="mt-2 space-y-4">
            {data.experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="text-sm font-semibold text-foreground">
                    {job.role} — {job.company}
                  </div>
                  <div className="text-xs text-text-secondary">{job.dates}</div>
                </div>
                {job.location ? <div className="text-xs text-text-secondary">{job.location}</div> : null}
                {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-foreground">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mb-5">
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
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Certifications</h3>
          <div className="mt-2 text-sm text-foreground leading-6">
            {data.certifications.join(" • ")}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {Array.isArray(data.projects) && data.projects.length > 0 && (
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Projects</h3>
          <div className="mt-2 space-y-3">
            {data.projects.map((p, i) => (
              <div key={i}>
                <div className="text-sm font-semibold text-foreground">{p.title}</div>
                {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-foreground">
                    {p.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {Array.isArray(data.achievements) && data.achievements.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Achievements</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-foreground">
            {data.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
