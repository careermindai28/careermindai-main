"use client";

import dynamicImport from "next/dynamic";
import ClientErrorBoundary from "@/components/common/ClientErrorBoundary";

export const dynamic = "force-dynamic";

const ResumeAuditInteractive = dynamicImport(
  () => import("./components/ResumeAuditInteractive"),
  { ssr: false }
);

export default function Page() {
  return (
    <ClientErrorBoundary label="Resume Audit Tool">
      <ResumeAuditInteractive />
    </ClientErrorBoundary>
  );
}
