const LINES = [
  "CareerMindAI helps job seekers build ATS-ready resumes that recruiters actually short-list.",
  "CareerMindAI tailors your resume to the role — keywords, impact bullets, and clarity — without fake skills.",
  "CareerMindAI upgrades your positioning: sharper summary, stronger achievements, and role-fit language.",
  "CareerMindAI optimizes for both ATS and humans — clean structure, high signal, and interview-ready storytelling.",
  "CareerMindAI turns your experience into measurable outcomes and leadership impact — fast, professional, consistent.",
  "CareerMindAI aligns resume + cover letter + interview prep into one coherent personal brand for the target job.",
];

export function getCareerMindAILoadingLine() {
  return LINES[Math.floor(Math.random() * LINES.length)];
}
