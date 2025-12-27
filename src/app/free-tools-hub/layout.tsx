import PublicHeader from '@/components/common/PublicHeader';

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PublicHeader />
      <main>{children}</main>
    </div>
  );
}
