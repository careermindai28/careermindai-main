import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import path from "path";
import { signPdfUrl } from "@/lib/pdfSign";

export const runtime = "nodejs";

type PdfType = "resume" | "coverLetter" | "interviewGuide";

function mustString(v: any) {
  return typeof v === "string" ? v.trim() : "";
}

function safeFilename(type: PdfType) {
  if (type === "resume") return "CareerMindAI-Resume.pdf";
  if (type === "coverLetter") return "CareerMindAI-CoverLetter.pdf";
  return "CareerMindAI-Interview-Guide.pdf";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const type = mustString(body?.type) as PdfType;
    const id = mustString(body?.id);

    if (!type || !id) {
      return new Response(JSON.stringify({ ok: false, error: "Missing type or id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (!baseUrl) {
      return new Response(JSON.stringify({ ok: false, error: "Missing NEXT_PUBLIC_APP_URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Signed URL valid for 5 minutes
    const exp = Math.floor(Date.now() / 1000) + 300;
    const sig = signPdfUrl({ type, id, exp });

    let printUrl = "";
    if (type === "resume") {
      printUrl = `${baseUrl}/print/resume?builderId=${encodeURIComponent(id)}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else if (type === "coverLetter") {
      printUrl = `${baseUrl}/print/cover-letter?coverLetterId=${encodeURIComponent(id)}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else if (type === "interviewGuide") {
      printUrl = `${baseUrl}/print/interview-guide?guideId=${encodeURIComponent(id)}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Invalid type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ensure sparticuz chromium has inputDir for brotli bin files
    const inputDir = path.join(process.cwd(), "node_modules", "@sparticuz", "chromium", "bin");
    const executablePath = await chromium.executablePath(inputDir);

    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath,
      headless: true,
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });

      await page.goto(printUrl, { waitUntil: "networkidle2", timeout: 60_000 });

      // Generate PDF with NO header/footer (watermark is inside HTML print layout)
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
      });

      return new Response(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeFilename(type)}"`,
          "Cache-Control": "no-store",
        },
      });
    } finally {
      await browser.close();
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || "PDF export failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
