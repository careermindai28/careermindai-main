'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import ResumeAuditInteractive from './components/ResumeAuditInteractive';
import ProtectedPage from '@/components/auth/ProtectedPage';

export default function ResumeAuditToolPage() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />

        <main className="flex-1 lg:ml-72">
          <div className="sticky top-0 z-50 bg-surface border-b border-border px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Resume Audit Tool</h1>
                <Breadcrumb className="mt-2" />
              </div>
            </div>
          </div>

          <ResumeAuditInteractive />
        </main>
      </div>
    </ProtectedPage>
  );
}