// src/lib/resumeTextExtractor.ts
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export function sanitizeResumeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/\u0000/g, "")              // remove null bytes
    .replace(/[^\S\r\n]+/g, " ")         // collapse weird spacing
    .replace(/\n{3,}/g, "\n\n")          // avoid huge gaps
    .trim();
}

export function assertReadableResumeText(text: string) {
  const cleaned = sanitizeResumeText(text);
  const nonSpace = cleaned.replace(/\s/g, "");
  if (nonSpace.length < 300) {
    throw new Error(
      "We couldn't extract readable text from your resume. Please upload a text-based PDF or DOCX (not scanned images)."
    );
  }
  return cleaned;
}

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result?.value ?? "";
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data?.text ?? "";
}
