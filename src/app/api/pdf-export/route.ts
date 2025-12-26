import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
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
    const body = await req.json();

    const type = mustString(body?.type) as PdfType;
    const id = mustString(body?.id);

    if (!type || !id) {
      return new Response(JSON.stringify({ ok: false, error: "Missing type or id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      return new Response(JSON.stringify({ ok: false, error: "Missing NEXT_PUBLIC_APP_URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // signed URL valid for 5 minutes
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

    const executablePath = await chromium.executablePath();

const browser = await puppeteer.launch({
  args: [...chromium.args, "--font-render-hinting=medium"],
  executablePath,
  headless: true,
});


    try {
      const page = await browser.newPage();

      // better rendering consistency
      await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });

      await page.goto(printUrl, { waitUntil: "networkidle2", timeout: 60_000 });

      // quick guard: if print route rendered an auth/error page
      const html = await page.content();
      if (
        html.toLowerCase().includes("unauthorized") ||
        html.toLowerCase().includes("not found") ||
        html.toLowerCase().includes("forbidden")
      ) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: "Print page returned Unauthorized/Not Found/Forbidden",
            debug: { printUrl, htmlSnippet: html.slice(0, 400) },
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "18mm", right: "14mm", bottom: "18mm", left: "14mm" },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size:10px;width:100%;text-align:center;color:#8a8a8a;">
            CareerMindAI
          </div>`,
        footerTemplate: `
          <div style="font-size:10px;width:100%;text-align:center;color:#8a8a8a;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>`,
      });

      // ✅ TS-safe body type
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
