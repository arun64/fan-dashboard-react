import { ReactNode } from 'react';

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {sidebar}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
