'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import InterviewPreparationInteractive from './components/InterviewPreparationInteractive';
import RequireAuth from '@/components/auth/RequireAuth';

export default function InterviewPreparationPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />

        <main className="flex-1 lg:ml-72">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <Breadcrumb />
            </div>

            <InterviewPreparationInteractive />
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
