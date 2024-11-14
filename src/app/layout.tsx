'use client'

import { useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCurrentTabStore } from '@/store/index';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import "@/app/globals.css";

// COMPONENTS
import ReactQueryProvider from '@/components/ReactQueryProvider';
import dynamic from 'next/dynamic';
const Header = dynamic(
  () => import('@/components/Header'),
  { ssr: false }
) 

// STORES
import { useThemeStore } from '@/store/index';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useThemeStore((status) => status.theme)
  const bodyRef = useRef<HTMLBodyElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.classList.add(theme);
  }, [theme])

  return (
    <html lang="en">
      <body ref={bodyRef}>
        <ReactQueryProvider>
          <Suspense>
              <div className="app-layout">
                <Header />
                <main className="">
                  {children}
                </main>
              </div>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
