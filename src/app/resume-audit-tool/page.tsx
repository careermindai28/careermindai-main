"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const ResumeAuditInteractive = dynamicImport(
  () => import("./components/ResumeAuditInteractive"),
  { ssr: false }
);

export default function Page() {
  return <ResumeAuditInteractive />;
}
