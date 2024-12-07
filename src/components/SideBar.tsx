'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

// API
import signOut from '@/api/signOut';
import getUserProfilePictureURL from '@/api/getUserProfilePictureURL';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';
import getBuckets from '@/api/getBuckets';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import DisplayBuckets from '@/components/DisplayBuckets';;
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import GearWideConnectedSvg from '@/components/svgs/GearWideConnectedSvg';
import InfoCircleSvg from '@/components/svgs/InfoCircleSvg';
import SunFillSvg from '@/components/svgs/SunFillSvg';
import ListTaskSvg from '@/components/svgs/ListTaskSvg';
import CalendarSvg from '@/components/svgs/CalendarSvg';
import InboxSvg from '@/components/svgs/InboxSvg';
import PlusSvg from '@/components/svgs/PlusSvg';
import MagicBroomSvg from '@/components/svgs/MagicBroomSvg';
import BoxArrowRightSvg from '@/components/svgs/BoxArrowRightSvg';
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';
import ArrowBarRightSvg from '@/components/svgs/ArrowBarRightSvg';

// STORES
import { 
  useSideBarStore, useLanguageStore, 
  useCurrentTabStore, useSettingsPopupStore, 
  useAddBucketPopupStore, useActivateDeleteBucketsStore
} from '@/store/index.js';

type UserProfile = {
  picture_url?: string;
  [key: string]: unknown;
}

export default function SideBar ({ currentLanguage }: { currentLanguage: string }) {

  const router = useRouter();
  const queryClient = useQueryClient();

  const { currentTab, setCurrentTab } = useCurrentTabStore();
  const { settingsPopup, setSettingsPopup } = useSettingsPopupStore();
  const { activateDeleteBucketToggle, setActivateDeleteBucketToggle } = useActivateDeleteBucketsStore();
  const setAddBucket = useAddBucketPopupStore(status => status.setAddBucket);
  const isEn = currentLanguage === 'en';

  const toggle = useSideBarStore(status => status.toggle);
  const setToggle = useSideBarStore(status => status.setToggle);
  const headerRef = useRef<HTMLDivElement>(null);
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
    queryFn: getTasks,
    enabled: !!user
  }); 

  const { data: userProfileUrl, isLoading: isProfileUrlLoading } = useQuery<UserProfile | any>({
    queryKey: ['user-profile-picture'],
    queryFn: getUserProfilePictureURL,
    enabled: !!user
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setCurrentTab('home');
      queryClient.invalidateQueries({ queryKey: ['auth']})
    }
  })

  const { data: buckets, isLoading: isBucketsLoading } = useQuery({
    queryKey: ['buckets'],
    queryFn: getBuckets,
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLInputElement | HTMLLIElement | HTMLDivElement>) => {
    const { type, key } = e.currentTarget.dataset;

    switch (type) {
      case 'myTasks_button_is_clicked':
      case 'users_button_is_clicked':
      case 'about_button_is_clicked':
      case 'profile_button_is_clicked':
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
      case 'clean_buckets_button_is_clicked':
        setActivateDeleteBucketToggle(!activateDeleteBucketToggle);
      break;
      default:
        console.error('Unkown type: ', type);
    }
  }
  
  // DEBUG & UI
  // console.log('activateDeleteBucketToggle: ', activateDeleteBucketToggle);
  // console.log('toggle && !isEn: ', toggle && !isEn);
  // const isBucketsLoading = true;

  return (
    <div
      className={`
        fixed md:sticky top-0 h-[100vh] z-[100]
        transition-all duraion-300 ease-in 
        before:content[''] before:absolute before:left-[100%] before:top-[50%] before:translate-y-[-50%] before:w-[1px] before:h-[100%] before:bg-[var(--background-light-color)]
        @shade-background md:after:hidden after:content-[''] after:absolute after:top-[0] after:w-[100vw] after:h-[100vh] after:bg-[var(--shade-color)] after:z-[-1] after:blur-[5px] after:transtion-all after:duration-[0.15s] after:ease-in
        ${isEn ? 'before:left-[100%] after:left-[0]' : 'before:right-[100%] after:right-[0]'}
        ${toggle 
          ? `${isEn ? 'left-0' : 'right-0'} md:visble md:opacity-100 after:visible` 
          : `${isEn ? 'left-[-200px]' : 'right-[-200px]'} md:invisible md:w-[0px] md:p-[0] md:opacity-0 after:invisible after:opacity-0`}
        ${user ? 'visible w-[200px]' : 'invisible w-[0px] overflow-hidden'}
      `}
      ref={headerRef}
    >
      <button
        className={`
          initial md:hidden absolute top-4 hover:translate-x-1 z-[100] p-2 bg-[var(--background-color)] hover:bg-[var(--background-light-color)] rounded-md transition-all duraion-200 ease-out
          ${isEn ? 'left-[calc(100%+1rem)]' : 'right-[calc(100%+1rem)]'}

          ${toggle ? 'initial' : 'hidden'}
        `}
        data-type="toggle_sidebar_button_is_clicked"
        onClick={handleClick}
      >
        {isEn 
          ? <ArrowBarLeftSvg width="1.5rem" height="1.5rem" color="var(--font-heading-color)" />
          : <ArrowBarRightSvg width="1.5rem" height="1.5rem" color="var(--font-heading-color)" />
        }
      </button>
      <nav
        className="flex flex-col h-[100%] py-2 px-2 bg-[var(--background-color)] md:bg-transparent backdrop-blur-[20px]" 
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
              {isEn ? 'My Tasks' : 'مهامي'}
            </span>
            <span
              className={`
                ${isEn ? 'ml-auto' : 'mr-auto'} text-xs font-bold px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'myTasks' ? 'text-primary' : 'text-body-light'}
              `}
            >
              {tasks?.filter((itm: any) => !itm.is_completed && !itm.bucket_id).length || 0}
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
              {isEn ? 'today' : 'اليوم'}
            </span>
            <span
              className={`
                ${isEn ? 'ml-auto' : 'mr-auto'} text-xs font-bold px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'today' ? 'text-primary' : 'text-body-light'}
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
              {isEn ? 'inbox' : 'الصندوق'}
            </span>
            <span
              className={`
                ${isEn ? 'ml-auto' : 'mr-auto'} text-xs font-bold px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                ${currentTab === 'inbox' ? 'text-primary' : 'text-body-light'}
              `}
            >
              {tasks?.filter((itm: any) => !itm.is_completed ).length || 0}
            </span>
          </li>
        </ul>
        <div
          className="relative flex items-center justify-around z-[5] py-2 text-body before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[100%] before:h-[1px] before:bg-body-light before:z-[-1]"
        >
          <h2
            className="inline px-1 ml-4 bg-[var(--background-color)] text-sm font-bold text-body-light"
          >
            {isEn? 'Buckets' : 'المجموعات'}
          </h2>
          <button
            className="group flex gap-1 px-1 ml-4 bg-[var(--background-color)]"
            data-type="clean_buckets_button_is_clicked"
            onClick={handleClick}
          >
            <MagicBroomSvg width="0.8rem" height="0.8rem" 
              className={`
                ${activateDeleteBucketToggle ? 'text-primary' : 'text-body-extra-light group-hover:text-body'}
              `}
            />
            <span
              className={`
                text-xs
                ${activateDeleteBucketToggle ? 'text-primary' : 'text-body-extra-light group-hover:text-body'}
              `}
            >
              {isEn ? 'Clean' : 'مسح'}
            </span>
          </button>
        </div>
        <DisplayBuckets 
          buckets={buckets} 
          tasks={tasks} 
          activateDeleteBucketToggle={activateDeleteBucketToggle}
          isLoading={isBucketsLoading} 
          currentLanguage={currentLanguage}
        />
        <button
          className="flex items-center justify-center text-body-light text-sm text-left p-1 my-1 bg-[var(--background-light-color)] hover:bg-[var(--background-deep-light-color)] transition-colors duration-200 ease-out rounded-md"
          role="button"
          data-type="addBucket_button_is_clicked"
          onClick={handleClick}
        >
          <PlusSvg color="var(--font-light-color)" />
          <span className="font-bold">
            {isEn ? 'Add' : 'اضف '}
          </span>
        </button>
        <hr className="h-[1px] bg-[var(--background-light-color)] mt-[auto] mb-2" />
        <ul
          className="flex flex-row justify-between items-center"
        >
          <li 
            className="relative bg-[var(--background-light-color)] rounded-[100%] p-2 cursor-pointer overflow-hidden"
            role="button"
            data-key="profile"
            data-type="profile_button_is_clicked"
            onClick={handleClick}
          >
            { userProfileUrl &&
              <Image 
                src={userProfileUrl?.picture_url}
                alt="User Profile Picture"
                width={48}
                height={48}
                className="
                  absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] 
                  w-12 aspect-[1/1] object-cover object-center
                "
              />
            }
            <PersonFillSvg color="var(--font-body-color)" width="2rem" height="2rem" />
          </li>
          <li
            className="p-2 hover:bg-[var(--background-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]"
            role="button"
            data-type="settings_button_is_clicked"
            onClick={handleClick}
          >
            <GearWideConnectedSvg className={settingsPopup ? 'text-primary' : 'text-body'} />
          </li>
          <li
            className={`
              p-2 hover:bg-[var(--background-light-color)] transition-colors ease-out duration-150 cursor-pointer rounded-[100%]
            `}
            role="button"
            data-key="about"
            data-type="about_button_is_clicked"
            onClick={handleClick}
          >
            <InfoCircleSvg 
              className={`${currentTab === 'about' ? "text-primary" : "text-body"}`} />
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
    </div>
  )
}

