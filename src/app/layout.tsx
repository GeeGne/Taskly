'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentTabStore } from '@/store/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import "@/app/globals.css";
import signOut from '@/api/signOut';

// COMPONENTS
import ReactQueryProvider from '@/components/ReactQueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentTab, setCurrentTab } = useCurrentTabStore();
  console.log('currentTab: ', currentTab);

  const myTasksBtnRef = useRef<HTMLButtonElement>(null);
  const usersBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const signOutBtnRef = useRef<HTMLButtonElement>(null);

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth']})
    }
  })

  useEffect(() => {
    resetBtnTabStyles();
    switch (currentTab) {
      case 'myTasks':
        myTasksBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        myTasksBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      case 'users':
        usersBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        usersBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      case 'about':
        aboutBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        aboutBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      default:
        console.error('Unknown currentTab type: ', currentTab);
    }
  }, [ currentTab ])

  const resetBtnTabStyles = () => {
    myTasksBtnRef.current.removeAttribute('style');       
    usersBtnRef.current.removeAttribute('style');       
    aboutBtnRef.current.removeAttribute('style');       
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { type, key } = e.currentTarget.dataset;

    switch (type) {
      case 'myTasks_button_is_clicked':
      case 'users_button_is_clicked':
      case 'about_button_is_clicked':
        setCurrentTab(key!);
        router.push(`/${key}`);
        window.scrollTo(0, 0);
        break;
      case 'signOut_button_is_clicked':
        setCurrentTab();
        break;
      default:
        console.error('Unkown type: ', type);
    }
  }

  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          <div className="app-layout">
            <header
              className="drop-shadow-md"
            >
              <nav
                className="flex p-4 bg-secondary justify-around"
              >
                <button
                  className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"
                  data-type="myTasks_button_is_clicked"
                  data-key="myTasks"
                  onClick={handleClick}
                  ref={myTasksBtnRef}
  
                >
                  My Tasks
                </button>
                <span className="w-[1px] bg-body py-4" />
                <button
                  className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"
                  data-type="users_button_is_clicked"
                  data-key="users"
                  onClick={handleClick}
                  ref={usersBtnRef}
  
                >
                  Users
                </button>
                <span className="w-[1px] bg-body py-4" />
                <button
                  className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"
                  data-type="about_button_is_clicked"
                  data-key="about"
                  onClick={handleClick}
                  ref={aboutBtnRef}
  
                >
                  About
                </button>
                <span className="w-[1px] bg-body py-4" />
                <button
                  className="font-bold text-heading text-xl bg-red-400 hover:bg-red-600 hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"
                  data-type="signOut_button_is_clicked"
                  onClick={handleClick}
                  ref={signOutBtnRef}
                >
                  Sign out
                </button>
              </nav>
  
            </header>
            <main className="">
              {children}
            </main>
          </div>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
