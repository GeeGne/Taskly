'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentTabStore } from '@/store/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import "@/app/globals.css";

// COMPONENTS
import ReactQueryProvider from '@/components/ReactQueryProvider';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          <div className="app-layout">
            <Header />
            <main className="">
              {children}
            </main>
          </div>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
