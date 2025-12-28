import React from "react";

export default function PrintLayout({
  title,
  watermarkEnabled,
  children,
}: {
  title: string;
  watermarkEnabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <style>{`
          @page { size: A4; margin: 14mm; }
          html, body { padding: 0; margin: 0; }
          body {
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            color: #111827;
            font-size: 12.5px;
            line-height: 1.45;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #fff;
          }
          .page { position: relative; min-height: 100%; }
          .wm {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 0;
          }
          .wm span {
             transform: rotate(-30deg);
             font-size: 48px;
              font-weight: 700;
              letter-spacing: 1.5px;
              color: rgba(17, 24, 39, 0.06);
              user-select: none;
              white-space: nowrap;
          }
          .content { position: relative; z-index: 1; }
        `}</style>
      </head>
      <body>
        <div className="page">
          {watermarkEnabled && (
            <div className="wm">
              <span>{(typeof window !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue("--pdf-watermark").trim()) || "CareerMindAI"}</span>
            </div>
          )}
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
