'use client'

import { useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCurrentTabStore } from '@/store/index';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import "@/app/globals.css";

// COMPONENTS
import ReactQueryProvider from '@/components/ReactQueryProvider';
import Alerts from '@/components/alerts/index';
import Popups from '@/components/popups/index';
import BackgroundActivity from '@/components/BackgroundActivity';
import dynamic from 'next/dynamic';
const SideBar = dynamic(
  () => import('@/components/SideBar'),
  { ssr: false }
) 

// STORES
import { 
  useThemeStore, useLanguageStore, useHomePageStore, 
  useControllersStore, useBackgroundActivityStore 
} from '@/store/index';

// CONFETTI 
import Photons from "react-canvas-confetti/dist/presets/snow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const theme = useThemeStore((status) => status.theme)
  const bodyRef = useRef<HTMLBodyElement>(null);
  const isHomepage = useHomePageStore(status => status.isHomePage);
  const backgroundConfettiToggle = useControllersStore(status => status.backgroundConfettiToggle);
  const backgroundActivityToggle = useBackgroundActivityStore(status => status.backgroundActivityToggle);
  const currentLanguage = useLanguageStore(status => status.currentLanguage);

  return (
    <html lang="en">
      <body 
        className={`
          ${theme} theme-transition
          ${currentLanguage}
        `}
        ref={bodyRef}
      >
        <ReactQueryProvider>
          <Suspense>
            <Alerts currentLanguage={currentLanguage} />
            <Popups currentLanguage={currentLanguage} />
            <BackgroundActivity />
            {isHomepage || backgroundConfettiToggle &&
              <Photons
                autorun={{ speed: 3 }}
                decorateOptions={defaultOptions =>
                  theme === 'light'
                    ? { ...defaultOptions, colors: ['#000000'] } // Fix #00000 typo to #000000 (black)
                    : { ...defaultOptions, colors: ['#ffffff'] } // Fix #fffff typo to #ffffff (white)
                }
              />
            }
            <div className="grid grid-cols-[1fr] md:grid-cols-[auto_1fr]">
              <SideBar currentLanguage={currentLanguage} />
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
