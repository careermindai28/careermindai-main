import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// GET to confirm route exists in prod
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/resume-audit" }, { status: 200 });
}

// POST to confirm multipart request reaches backend
export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const isMultipart = ct.includes("multipart/form-data");

    if (!isMultipart) {
      return NextResponse.json(
        { error: "Expected multipart/form-data", receivedContentType: ct },
        { status: 415 }
      );
    }

    const form = await req.formData();
    const file = form.get("resumeFile") as File | null;

    return NextResponse.json(
      {
        ok: true,
        received: {
          contentType: ct,
          hasResumeFile: !!file,
          fileName: file?.name || null,
          fileType: file?.type || null,
          fileSize: file?.size || null,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Route crashed" },
      { status: 500 }
    );
  }
}
