import { ResumeJSON } from "@/lib/resumeTypes";

export default function ModernProfessionalTemplate({ data }: { data: ResumeJSON }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold text-foreground">{data.headline || "Resume"}</div>
        </div>

        {(data.coreSkills?.length || data.toolsAndTech?.length) ? (
          <div className="md:max-w-sm">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Key Skills</div>
            <div className="mt-2 text-sm text-foreground leading-6">
              {data.coreSkills?.slice(0, 12).join(", ")}
            </div>
            {data.toolsAndTech?.length ? (
              <div className="mt-2 text-xs text-text-secondary">
                Tools: {data.toolsAndTech.slice(0, 10).join(", ")}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <hr className="my-5 border-border" />

      {/* SUMMARY */}
      {Array.isArray(data.professionalSummary) && data.professionalSummary.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground">Professional Summary</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.professionalSummary.slice(0, 6).map((x, i) => (
              <div key={i} className="text-sm text-foreground bg-background border border-border rounded-lg p-3">
                {x}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground">Experience</h3>
          <div className="mt-3 space-y-5">
            {data.experience.map((job, i) => (
              <div key={i} className="border border-border rounded-xl p-4 bg-background">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="text-sm font-semibold text-foreground">{job.role}</div>
                  <div className="text-xs text-text-secondary">{job.dates}</div>
                </div>
                <div className="text-xs text-text-secondary">
                  {job.company}{job.location ? ` • ${job.location}` : ""}
                </div>

                {Array.isArray(job.bullets) && job.bullets.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-foreground">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EDUCATION */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-foreground">Education</h3>
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
            <h3 className="text-sm font-semibold text-foreground">Certifications</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-foreground">
              {data.certifications.slice(0, 10).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* ACHIEVEMENTS */}
      {Array.isArray(data.achievements) && data.achievements.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-foreground">Highlights</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.achievements.slice(0, 10).map((a, i) => (
              <span key={i} className="text-xs text-foreground border border-border rounded-full px-3 py-1 bg-background">
                {a}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
