"use client";

import ClientErrorBoundary from "@/components/common/ClientErrorBoundary";
import ResumeAuditInteractive from "./components/ResumeAuditInteractive";

export default function ClientPage() {
  return (
    <ClientErrorBoundary label="Resume Audit Tool">
      <ResumeAuditInteractive />
    </ClientErrorBoundary>
  );
}
