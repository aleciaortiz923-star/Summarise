'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noSidebarRoutes = ["/subscription", "/"];

  return (
    <>
      {noSidebarRoutes.includes(pathname) ? (
        <main>{children}</main>
      ) : (
        <div className="layout-container">
          <Sidebar />
          <main className="layout-main-content">{children}</main>
        </div>
      )}
    </>
  );
}
