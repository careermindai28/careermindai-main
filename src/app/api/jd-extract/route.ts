import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function cleanText(s: string) {
  return (s || "")
    .replace(/\u0000/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("multipart/form-data")) {
      return jsonError("Expected multipart/form-data.", 415);
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return jsonError("Missing file in form-data under key: file", 400);
    }

    const fileName = file.name || "upload";
    const fileType = file.type || "";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // TXT
    if (
      fileType.includes("text/plain") ||
      fileName.toLowerCase().endsWith(".txt")
    ) {
      const text = buffer.toString("utf8");
      return NextResponse.json(
        { ok: true, jdText: cleanText(text), fileName, fileType },
        { status: 200 }
      );
    }

    // DOCX
    if (
      fileType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
      fileName.toLowerCase().endsWith(".docx")
    ) {
      const mammothMod: any = await import("mammoth");
      const mammoth = mammothMod?.default || mammothMod;
      const result = await mammoth.extractRawText({ buffer });
      const jdText = cleanText(result?.value || "");
      if (!jdText) return jsonError("Could not extract text from DOCX.", 422);

      return NextResponse.json(
        { ok: true, jdText, fileName, fileType },
        { status: 200 }
      );
    }

    // PDF
    if (fileType.includes("application/pdf") || fileName.toLowerCase().endsWith(".pdf")) {
      const pdfParseMod: any = await import("pdf-parse");
      const pdfParse = pdfParseMod?.default || pdfParseMod; // handles ESM/CJS differences safely
      const parsed = await pdfParse(buffer);
      const jdText = cleanText(parsed?.text || "");
      if (!jdText) return jsonError("Could not extract text from PDF.", 422);

      return NextResponse.json(
        { ok: true, jdText, fileName, fileType },
        { status: 200 }
      );
    }

    return jsonError(
      "Unsupported file type. Upload PDF, DOCX, or TXT.",
      415
    );
  } catch (e: any) {
    return jsonError(e?.message || "JD extraction failed.", 500);
  }
}
