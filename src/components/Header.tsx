'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentTabStore } from '@/store/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API
import signOut from '@/api/signOut';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';

// UTILS
import Redirector from '@/utils/Redirector';

export default function Header () {

  const router = useRouter();
  const redirect = new Redirector(router);
  const queryClient = useQueryClient();
  const { currentTab, setCurrentTab } = useCurrentTabStore();

  const headerRef = useRef<HTMLButtonElement>(null);
  const myTasksBtnRef = useRef<HTMLButtonElement>(null);
  const usersBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const signOutBtnRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setCurrentTab('home');
      queryClient.invalidateQueries({ queryKey: ['auth']})
    }
  })

  useEffect(() => {
    redirect.home(user);
    if (headerRef.current) headerRef.current.style.display = `${user ? 'initial' : 'none'}`;
    console.log('user: ', user);
  }, [user])

  useEffect(() => {
    resetBtnTabStyles();
    switch (currentTab) {
      case 'myTasks':
        if (myTasksBtnRef.current) myTasksBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        if (myTasksBtnRef.current) myTasksBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      case 'users':
        if (usersBtnRef.current) usersBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        if (usersBtnRef.current) usersBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      case 'about':
        if(aboutBtnRef.current) aboutBtnRef.current.style.backgroundColor = 'var(--primary-color)' ;
        if(aboutBtnRef.current) aboutBtnRef.current.style.color = 'var(--font-heading-invert-color)' ;
        break;
      default:
        console.error('Unknown currentTab type: ', currentTab);
    }
  }, [ currentTab ])

  const resetBtnTabStyles = () => {
    if (myTasksBtnRef.current) myTasksBtnRef.current.removeAttribute('style');       
    if (usersBtnRef.current) usersBtnRef.current.removeAttribute('style');       
    if (aboutBtnRef.current) aboutBtnRef.current.removeAttribute('style');       
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
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
        signOutMutation.mutate();
        break;
      default:
        console.error('Unkown type: ', type);
    }
  }
  
  return (
    <header
      className="drop-shadow-md"
      ref={headerRef}
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
  )
}

