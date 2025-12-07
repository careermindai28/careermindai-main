'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import LinkedInOptimizationInteractive from './components/LinkedInOptimizationInteractive';
import ProtectedPage from '@/components/auth/ProtectedPage';

export default function LinkedInOptimizationPage() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 lg:ml-72">
          <div className="border-b border-border bg-surface sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Breadcrumb />
            </div>
          </div>
          
          <LinkedInOptimizationInteractive />
        </main>
      </div>
    </ProtectedPage>
  );
}