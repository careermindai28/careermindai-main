'use client';

import DashboardSidebar from '@/components/common/DashboardSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import SettingsInteractive from './components/SettingsInteractive';
import ProtectedPage from '@/components/auth/ProtectedPage';

export default function UserSettingsPage() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 lg:ml-72">
          <div className="sticky top-0 z-50 bg-surface border-b border-border px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb />
          </div>
          
          <SettingsInteractive />
        </main>
      </div>
    </ProtectedPage>
  );
}