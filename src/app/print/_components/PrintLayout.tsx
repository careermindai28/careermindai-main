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
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <style>{`
          :root{
            --fg:#0b0f19;
            --muted:#4b5563;
            --border:#e5e7eb;
          }
          *{ box-sizing:border-box; }
          body{
            margin:0;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            color: var(--fg);
            background:#fff;
          }
          .page{
            padding: 32px 36px;
          }
          h1,h2,h3{ margin:0 0 10px 0; }
          h1{ font-size: 22px; }
          h2{ font-size: 14px; margin-top: 18px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
          p{ margin: 0 0 10px 0; line-height: 1.45; }
          ul{ margin: 6px 0 0 18px; padding:0; }
          li{ margin: 0 0 6px 0; line-height: 1.45; }
          .hr{ height:1px; background: var(--border); margin: 14px 0; }
          .small{ font-size: 12px; color: var(--muted); }
          .grid2{ display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .row{ display:flex; justify-content:space-between; gap:12px; }
          .wm{
            position: fixed;
            inset:0;
            display:${watermarkEnabled ? "block" : "none"};
            pointer-events:none;
            z-index: 9999;
          }
          .wm span{
            position:absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%,-50%) rotate(-28deg);
            font-size: 54px;
            color: rgba(0,0,0,0.07);
            white-space: nowrap;
            font-weight: 700;
            letter-spacing: 0.08em;
          }
        `}</style>
      </head>

      <body>
        <div className="wm">
          <span>CareerMindAI</span>
        </div>

        <div className="page">{children}</div>
      </body>
    </html>
  );
}
