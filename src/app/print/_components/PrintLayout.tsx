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
          .page {
            position: relative;
            min-height: 100%;
          }
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
            transform: rotate(-28deg);
            font-size: 72px;
            font-weight: 800;
            letter-spacing: 2px;
            color: rgba(17, 24, 39, 0.07); /* subtle watermark */
            user-select: none;
            white-space: nowrap;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          h1 { font-size: 20px; margin: 0 0 10px; }
          h2 { font-size: 14px; margin: 14px 0 8px; }
          p  { margin: 0 0 8px; }
          ul { margin: 6px 0 10px 18px; padding: 0; }
          li { margin: 0 0 6px; }
          .hr { height: 1px; background: #e5e7eb; margin: 10px 0 12px; }
          .muted { color: #6b7280; font-size: 11.5px; }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #e5e7eb;
            border-radius: 999px;
            font-size: 11px;
            color: #374151;
            background: #f9fafb;
          }
        `}</style>
      </head>
      <body>
        <div className="page">
          {watermarkEnabled && (
            <div className="wm">
              <span>CareerMindAI</span>
            </div>
          )}
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
