'use client';

import { Providers } from '@/context/Providers';
import { Header } from '@/components';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <Providers>
      <div className="min-h-full">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </Providers>
  );
};