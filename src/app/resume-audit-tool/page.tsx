import ClientPage from './ClientPage';
import RequireAuth from '@/components/auth/RequireAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <RequireAuth>
      <ClientPage />
    </RequireAuth>
  );
}
