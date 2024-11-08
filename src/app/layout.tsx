'use client'
// import { useEffect, useState, useRef } from 'react';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ReactQueryProvider>
        <Suspense>
          <body>
            <div className="app-layout">
              <Header />
              <main className="">
                {children}
              </main>
            </div>
          </body>
        </Suspense>
      </ReactQueryProvider>
    </html>
  );
}
