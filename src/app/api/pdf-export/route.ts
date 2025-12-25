import { NextRequest } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { type, id } = await req.json();

  if (!type || !id) {
    return new Response("Missing parameters", { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  let url = "";

  if (type === "resume") url = `${baseUrl}/print/resume?builderId=${id}`;
  if (type === "coverLetter") url = `${baseUrl}/print/cover-letter?coverLetterId=${id}`;
  if (type === "interviewGuide") url = `${baseUrl}/print/interview-guide?guideId=${id}`;

  if (!url) {
    return new Response("Invalid PDF type", { status: 400 });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:10px;width:100%;text-align:center;color:#888;">
        CareerMindAI
      </div>
    `,
    footerTemplate: `
      <div style="font-size:10px;width:100%;text-align:center;color:#888;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    printBackground: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=CareerMindAI-${type}.pdf`,
    },
  });
}
