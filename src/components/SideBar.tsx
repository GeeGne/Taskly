'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API
import signOut from '@/api/signOut';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import SettingsPopup from '@/components/SettingsPopup';
import AddBucketPopup from '@/components/AddBucketPopup';
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import GearWideConnectedSvg from '@/components/svgs/GearWideConnectedSvg';
import InfoCircleSvg from '@/components/svgs/InfoCircleSvg';
import SunFillSvg from '@/components/svgs/SunFillSvg';
import ListTaskSvg from '@/components/svgs/ListTaskSvg';
import CalendarSvg from '@/components/svgs/CalendarSvg';
import InboxSvg from '@/components/svgs/InboxSvg';
import PlusSvg from '@/components/svgs/PlusSvg';
import BoxArrowRightSvg from '@/components/svgs/BoxArrowRightSvg';
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';

// STORES
import { 
  useSideBarStore, useCurrentTabStore,
  useSettingsPopupStore, useAddBucketPopupStore 
} from '@/store/index.js';

export default function SideBar () {

  const router = useRouter();
  const queryClient = useQueryClient();

  const { currentTab, setCurrentTab } = useCurrentTabStore();
  const { settingsPopup, setSettingsPopup } = useSettingsPopupStore();
  const setAddBucket = useAddBucketPopupStore(status => status.setAddBucket)

  const toggle = useSideBarStore(status => status.toggle);
  const setToggle = useSideBarStore(status => status.setToggle);
  const headerRef = useRef<HTMLButtonElement>(null);
  const myTasksBtnRef = useRef<HTMLButtonElement>(null);
  const usersBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const signOutBtnRef = useRef<HTMLLIElement>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  }) 

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setCurrentTab('home');
      queryClient.invalidateQueries({ queryKey: ['auth']})
    }
  })

  useEffect(() => {
    if (isLoading && !user) return;

    const redirect = new Redirector(router)
    redirect.home(user);
  }, [user])


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
        router.push(`/${key}`);
        window.scrollTo(0, 0);
        break;
      case 'signOut_button_is_clicked':
        signOutMutation.mutate();
        break;
      case 'toggle_sidebar_button_is_clicked':
        setToggle(!toggle);
        break;
      case 'settings_button_is_clicked':
        setSettingsPopup(true);
        break;
      case 'addBucket_button_is_clicked':
        setAddBucket(true);
        break;
      default:
        console.error('Unkown type: ', type);
    }
  }
  
  return (
    <header
      className={`
        fixed md:sticky top-0 w-[200px] h-[100vh] bg-[var(--background-color)] z-[100] 
        transition-all duraion-300 ease-in 
        before:content[''] before:absolute before:left-[100%] before:top-[50%] before:translate-y-[-50%] before:w-[1px] before:h-[100%] before:bg-[var(--background-light-color)]
        md:after:hidden after:content-[''] after:absolute after:top-[0] after:left-[0] after:w-[100vw] after:h-[100vh] after:bg-[var(--shade-color)] after:z-[-1] after:blur-[5px] after:transtion-all after:duration-[0.15s] after:ease-in
        ${toggle ? 'left-0 md:visble md:opacity-100 after:visible' : 'left-[-200px] md:invisible md:w-[0px] md:p-[0] md:opacity-0 after:invisible after:opacity-0'}
        ${user ? 'initial' : 'hidden'}
      `}
      ref={headerRef}
    >
      <AddBucketPopup />
      <SettingsPopup />
      <button
        className={`
          initial md:hidden absolute top-4 left-[calc(100%+1rem)] hover:left-[calc(100%+1rem-5px)] z-[100] p-2 bg-[var(--background-color)] hover:bg-[var(--background-light-color)] rounded-md transition-all duraion-200 ease-out
          ${toggle ? 'initial' : 'hidden'}
        `}
        data-type="toggle_sidebar_button_is_clicked"
        onClick={handleClick}
      >
        <ArrowBarLeftSvg width="1.5rem" height="1.5rem" color="var(--font-heading-color)" />
      </button>
      <nav
        className="flex flex-col h-[100%] bg-[--background-color] py-2 px-2" 
      >
        <ul
          className="flex flex-col"
        >
          <li
            className={`
              flex items-center gap-2 text-sm text-left p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md
              ${currentTab === 'myTasks' ? 'text-primary font-bold' : 'text-body-light font-normal'}
            `}
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            onClick={handleClick}
            // ref={myTasksBtnRef}
          >
            <ListTaskSvg color={`${currentTab === 'myTasks' ? 'var(--primary-color)' : 'var(--font-light-color'}`} />
            <span>
              My Tasks
            </span>
            <span
              className={`
                ml-auto text-xs font-bold px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'myTasks' ? 'text-primary' : 'text-body-extra-light'}
              `}
            >
              {tasks?.filter((itm: any) => !itm.is_completed).length}
            </span>
          </li>
          <li
            className={`
              flex items-center gap-2 text-sm text-left p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md
              ${currentTab === 'today' ? 'text-primary font-bold' : 'text-body-light font-normal'}
            `}
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="today"
            onClick={handleClick}
            // ref={usersBtnRef}
          >
            <CalendarSvg color={`${currentTab === 'today' ? 'var(--primary-color)' : 'var(--font-light-color'}`} />
            <span>
              today
            </span>
            <span
              className={`
                ml-auto font-bold text-xs px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'today' ? 'text-primary' : 'text-body-extra-light'}
              `}
            >
              0
            </span>
          </li>
          <li
            className={`
              flex items-center gap-2 text-sm text-left p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md
              ${currentTab === 'inbox' ? 'text-primary font-bold' : 'text-body-light font-normal'}
            `}
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="inbox"
            onClick={handleClick}
            // ref={myTasksBtnRef}
          >
            <InboxSvg color={`${currentTab === 'inbox' ? 'var(--primary-color)' : 'var(--font-light-color'}`} />
            <span>
              inbox
            </span>
            <span
              className={`
                ml-auto font-bold text-xs px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'inbox' ? 'text-primary' : 'text-body-extra-light'}
              `}
            >
              0
            </span>
          </li>
        </ul>
        <h2
          className="relative z-[5] py-2 text-body text-sm font-bold before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[100%] before:h-[1px] before:bg-body-light before:z-[-1]"
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
            className="flex items-center gap-2 text-body-light text-sm text-left p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
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
            <span
              className={`
                ml-auto font-bold text-xs text-body-extra-light px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
              `}
            >
              0
            </span>
          </li>
          <li
            className="flex items-center justify-center text-body-light text-sm text-left p-1 bg-[var(--background-light-color)] hover:bg-[var(--background-deep-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="addBucket_button_is_clicked"
            onClick={handleClick}
          >
            <PlusSvg color="var(--font-light-color)" />
            <span className="font-bold">
              Add
            </span>
          </li>
        </ul>
        <hr className="h-[1px] bg-[var(--background-light-color)] mt-[auto] mb-2" />
        <ul
          className="flex flex-row justify-between items-center"
        >
          <li 
            className="bg-[var(--background-light-color)] rounded-[100%] p-2 cursor-pointer"
          >
            <PersonFillSvg color="var(--font-body-color)" width="2rem" height="2rem" />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
            role="button"
            data-type="settings_button_is_clicked"
            onClick={handleClick}
          >
            <GearWideConnectedSvg color="var(--font-body-color)" />
          </li>
          <li
            className={`
              p-2 hover:bg-[var(--background-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]
              ${currentTab === 'about' ? 'bg-secondary' : 'bg-[transparent]'}
            `}
            role="button"
            data-key="about"
            data-type="about_button_is_clicked"
            onClick={handleClick}
          >
            <InfoCircleSvg 
              color={`${currentTab === 'about' ? "var(--font-heading-color)" : "var(--font-body-color)"}`} />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
            role="button"
            data-type="signOut_button_is_clicked"
            onClick={handleClick}
            ref={signOutBtnRef}
          >
            <BoxArrowRightSvg color="var(--font-body-color)" />
          </li>
        </ul>
      </nav>
    </header>
  )
}

