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

// COMPONENTS
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import GearWideConnectedSvg from '@/components/svgs/GearWideConnectedSvg';
import InfoCircleSvg from '@/components/svgs/InfoCircleSvg';
import SunFillSvg from '@/components/svgs/SunFillSvg';
import ListTaskSvg from '@/components/svgs/ListTaskSvg';
import CalendarSvg from '@/components/svgs/CalendarSvg';
import InboxSvg from '@/components/svgs/InboxSvg';
import PlusSvg from '@/components/svgs/PlusSvg';

export default function Header () {

  const router = useRouter();
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
    const redirect = new Redirector(router);
    redirect.home(user);
    if (headerRef.current) headerRef.current.style.display = `${user ? 'initial' : 'none'}`;
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
      case 'home':
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLInputElement | HTMLLIElement>) => {
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
      className="relative w-[200px] p-4 bg-[var(--background-color)] before:content-[''] before:absolute before:left-[100%] before:top-[50%] before:translate-y-[-50%] before:w-[1px] before:h-[100%] before:bg-[var(--background-light-color)]"
      ref={headerRef}
    >
      <nav
        className="flex flex-col h-[100%]"
      >
        <ul
          className="flex flex-col gap-1"
        >
          <li
            className="flex items-center gap-2 text-primary text-sm text-left font-bold px-2 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={myTasksBtnRef}
          >
            <ListTaskSvg color="var(--primary-color)" />
            <span>
              My Tasks
            </span>
          </li>
          <li
            className="flex items-center gap-2 text-body-light text-sm text-left px-2 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={usersBtnRef}
          >
            <CalendarSvg color="var(--font-light-color)" />
            <span>
              today
            </span>
          </li>
          <li
            className="flex items-center gap-2 text-body-light text-sm text-left px-2 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={myTasksBtnRef}
          >
            <InboxSvg color="var(--font-light-color)" />
            <span>
              inbox
            </span>
          </li>
        </ul>
        <h2
          className="relative z-[5] py-2 text-body text-sm font-bold before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[100%] before:h-[0.1px] before:bg-body-light before:z-[-1]"
        >
          <span
            className="px-1 ml-4 bg-[var(--background-color)] text-body-light"
          >
            Buckets
          </span>
        </h2>
        <ul
          className="flex flex-col gap-1"
        >
          <li
            className="flex items-center gap-2 text-body-light text-sm text-left px-2 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={usersBtnRef}
          >
            <span>
              &#128221;
            </span>
            <span>
              Study
            </span>
          </li>
          <li
            className="flex items-center justify-center gap-2 text-body-light text-sm text-left px-2 bg-[var(--background-light-color)] hover:bg-[var(--background-deep-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={myTasksBtnRef}
          >
            <PlusSvg color="var(--font-light-color)" />
            <span className="font-bold">
              Add
            </span>
          </li>
        </ul>
        <th className="h-[1px] bg-[var(--background-light-color)] mt-[auto] mb-2" />
        <ul
          className="flex flex-row justify-between items-center"
        >
          <li 
            className="bg-[var(--background-deep-color)] rounded-[100%] p-2 cursor-pointer"
          >
            <PersonFillSvg color="var(--font-body-color)" width="2rem" height="2rem" />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-deep-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
          >
            <GearWideConnectedSvg color="var(--font-body-color)" />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-deep-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
          >
            <SunFillSvg color="var(--font-body-color)" />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-deep-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
          >
            <InfoCircleSvg color="var(--font-body-color)" />
          </li>
        </ul>
      </nav>
    </header>
  )
}