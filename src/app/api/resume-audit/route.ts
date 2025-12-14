import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ct = req.headers.get("content-type") || "";

  // HARD FAIL if frontend is still sending JSON
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json(
      {
        error:
          "Resume audit endpoint expects multipart/form-data (FormData upload). Your frontend is still sending JSON.",
        debug: {
          receivedContentType: ct,
          fix: "Update the Resume Audit page to use FormData and append('resumeFile', file). Do NOT set Content-Type header manually.",
        },
      },
      { status: 415 } // Unsupported Media Type
    );
  }

  return NextResponse.json(
    { ok: true, message: "Multipart received. Now wire extraction + OpenAI." },
    { status: 200 }
  );
}
