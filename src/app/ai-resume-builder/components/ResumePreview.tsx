"use client";

type ResumeJSON = {
  headline: string;
  professionalSummary: string[];
  coreSkills: string[];
  toolsAndTech: string[];
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{ degree: string; institution: string; year?: string }>;
  certifications: string[];
  projects: Array<{ title: string; bullets: string[] }>;
  achievements: string[];
  keywordPack: string[];
};

function SectionTitle({ children }: { children: string }) {
  return <h3 className="text-sm font-semibold text-foreground tracking-wide">{children}</h3>;
}

function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground whitespace-pre-wrap break-words">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

export default function ResumePreview({ result }: { result: ResumeJSON }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground whitespace-pre-wrap break-words">
          {result.headline}
        </h2>
      </div>

      <div className="space-y-2">
        <SectionTitle>Professional Summary</SectionTitle>
        <Bullets items={result.professionalSummary} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <SectionTitle>Core Skills</SectionTitle>
          <div className="text-sm text-foreground whitespace-pre-wrap break-words">
            {(result.coreSkills || []).join(" • ")}
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle>Tools & Tech</SectionTitle>
          <div className="text-sm text-foreground whitespace-pre-wrap break-words">
            {(result.toolsAndTech || []).join(" • ")}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-4">
          {(result.experience || []).map((e, idx) => (
            <div key={idx} className="border border-border rounded-lg p-4 bg-background">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div className="font-semibold text-foreground whitespace-pre-wrap break-words">
                  {e.role} — {e.company}
                </div>
                <div className="text-xs text-text-secondary whitespace-pre-wrap break-words">
                  {e.dates}{e.location ? ` • ${e.location}` : ""}
                </div>
              </div>
              <div className="mt-2">
                <Bullets items={e.bullets || []} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <SectionTitle>Education</SectionTitle>
          <ul className="space-y-1 text-sm text-foreground whitespace-pre-wrap break-words">
            {(result.education || []).map((ed, i) => (
              <li key={i}>
                <span className="font-medium">{ed.degree}</span> — {ed.institution}
                {ed.year ? ` (${ed.year})` : ""}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <SectionTitle>Certifications</SectionTitle>
          <Bullets items={result.certifications || []} />
        </div>
      </div>

      {(result.projects || []).length > 0 && (
        <div className="space-y-3">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-4">
            {result.projects.map((p, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-background">
                <div className="font-semibold text-foreground whitespace-pre-wrap break-words">{p.title}</div>
                <div className="mt-2">
                  <Bullets items={p.bullets || []} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(result.achievements || []).length > 0 && (
        <div className="space-y-2">
          <SectionTitle>Achievements</SectionTitle>
          <Bullets items={result.achievements} />
        </div>
      )}

      {(result.keywordPack || []).length > 0 && (
        <div className="space-y-2">
          <SectionTitle>Keyword Pack</SectionTitle>
          <div className="text-xs text-text-secondary whitespace-pre-wrap break-words">
            {result.keywordPack.join(" • ")}
          </div>
        </div>
      )}
    </div>
  );
}
