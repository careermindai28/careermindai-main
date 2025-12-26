export function pdfStatusLine(type: "resume" | "coverLetter" | "interviewGuide") {
  const label =
    type === "resume" ? "Resume PDF" :
    type === "coverLetter" ? "Cover Letter PDF" :
    "Interview Guide PDF";

  return `CareerMindAI is generating your ${label}…`;
}
