import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import path from "path";
import { signPdfUrl } from "@/lib/pdfSign";

import { getAdminApp, getFirestore } from "@/lib/firebaseAdmin";
import { getEntitlements } from "@/lib/entitlements";

export const runtime = "nodejs";

type PdfType = "resume" | "coverLetter" | "interviewGuide";
type Plan = "FREE" | "PAID" | "ADMIN";

function mustString(v: any) {
  return typeof v === "string" ? v.trim() : "";
}

function safeFilename(type: PdfType) {
  if (type === "resume") return "CareerMindAI-Resume.pdf";
  if (type === "coverLetter") return "CareerMindAI-CoverLetter.pdf";
  return "CareerMindAI-Interview-Guide.pdf";
}

function ymd(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function getUserPlanAndUsage(uid: string) {
  const db = getFirestore();
  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();

  const data = snap.exists ? (snap.data() as any) : {};
  const plan: Plan = (data?.plan as Plan) || "FREE";
  const isAdmin = Boolean(data?.isAdmin);
  const finalPlan: Plan = isAdmin ? "ADMIN" : plan;

  const today = ymd();
  const exports = data?.exports || {};
  const exportsDate = exports?.date || "";
  const exportsCount = Number(exports?.count || 0);
  const todaysCount = exportsDate === today ? exportsCount : 0;

  return { ref, finalPlan, today, todaysCount };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type = mustString(body?.type) as PdfType;
    const id = mustString(body?.id);

    // 🔐 Auth header
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify Firebase ID token
    let uid = "";
    let email: string | null = null;

    try {
      const adm = getAdminApp();
      const decoded = await adm.auth().verifyIdToken(token);
      uid = decoded.uid;
      email = typeof (decoded as any).email === "string" ? (decoded as any).email : null;
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Unauthorized (invalid session). Please sign out and sign in again.",
          detail: err?.code || err?.message || "verifyIdToken_failed",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

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

    // ✅ Monetization rules
    const { ref, finalPlan, today, todaysCount } = await getUserPlanAndUsage(uid);
    const ent = getEntitlements(finalPlan, email);

    if (todaysCount >= ent.exportLimitPerDay) {
      return new Response(
        JSON.stringify({
          ok: false,
          code: "EXPORT_LIMIT_REACHED",
          error: "Daily export limit reached. Upgrade to export unlimited PDFs.",
          plan: ent.plan,
          limit: ent.exportLimitPerDay,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      );
    }

    const watermarkEnabled = ent.watermarkOnExports;
    const wm = watermarkEnabled ? "1" : "0";

    // Signed URL valid for 5 minutes
    const exp = Math.floor(Date.now() / 1000) + 300;
    const sig = signPdfUrl({ type, id, exp });

    let printUrl = "";
    if (type === "resume") {
      printUrl = `${baseUrl}/print/resume?builderId=${encodeURIComponent(
        id
      )}&wm=${wm}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else if (type === "coverLetter") {
      printUrl = `${baseUrl}/print/cover-letter?coverLetterId=${encodeURIComponent(
        id
      )}&wm=${wm}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else if (type === "interviewGuide") {
      printUrl = `${baseUrl}/print/interview-guide?guideId=${encodeURIComponent(
        id
      )}&wm=${wm}&exp=${exp}&sig=${encodeURIComponent(sig)}`;
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Invalid type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Puppeteer + chromium
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

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
      });

      // ✅ increment only on success
      await ref.set({ exports: { date: today, count: todaysCount + 1 } }, { merge: true });

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
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "PDF export failed." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
