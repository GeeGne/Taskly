"use client"
import Image from "next/image";
// import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import confetti from 'canvas-confetti';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import SignInForm from '@/app/SignInForm';
import SignUpForm from '@/app/SignUpForm';
import WireStyle from '@/components/WireStyle';
import LoadingScreen from '@/components/LoadingScreen';
import GoogleSvg from '@/components/svgs/GoogleSvg';
import FacebookSvg from '@/components/svgs/FacebookSvg';
import GithubSvg from '@/components/svgs/GithubSvg';
import MoonSlashSunSvg from '@/components/svgs/MoonSlashSunSvg';
import GrommetLanguageSvg from '@/components/svgs/GrommetLanguageSvg';

// ASSETS
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import githubIcon from "../../public/assets/github.svg";
// import eyeIcon from "../../public/assets/eye.svg";
// import eyeSlashIcon from "../../public/assets/eye-slash.svg";
// import mainLogoIcon from "../../public/assets/taskly-logo.png";
import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";
import bookIcon from "../../public/assets/book.svg";
// import pencilIcon from "../..public/assets/design-education.svg";
import lampIcon from "../../public/assets/lamp.svg";
import achivementIcon from "../../public/assets/achivement.svg";
// import achivement2Icon from "../../public/assets/achivement-2.svg";

// API
import handleOAuthSignIn from '@/api/handleOAuthSignIn';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';

// SUPABASE
// import { Session, User } from '@supabase/supabase-js';

// UTILS
import Redirector from '@/utils/Redirector';

// STORES
import { 
  useErrorAlertStore, 
  useThemeStore, 
  useHomePageStore,
  useLanguageStore
} from '@/store/index';

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const loginParam = Number(searchParams.get('login'));
  // const signupParam = Number(searchParams.get('signup'));

  // const queryClient = useQueryClient();
  const [ loadingScreen, setLoadingScreen ] = useState<boolean>(true);
  const [ mount, setMount ] = useState<boolean>(false);
  const { setErrorAlert, setErrorText } = useErrorAlertStore();
  const { theme, setTheme } = useThemeStore();
  const { currentLanguage, setCurrentLanguage } = useLanguageStore();
  const isEn = currentLanguage === 'en';
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser,
  })

  const handleOAuthMutation = useMutation({
    mutationFn: handleOAuthSignIn,
    onError: (error) => {
      setErrorAlert(Date.now());
      setErrorText('Auth error: ' + error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'tasks', 'buckets'] })
    }
  });

  useEffect(() => {
    // if (!mount) return setMount(true);
    setIsHomePage(true);
    if (!isLoading) setTimeout(() => setLoadingScreen(false), 2000)
    if (isLoading && !user) return;

    const redirect = new Redirector(router);
    redirect.home(user);
  }, [user, isLoading]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    
    const { type, provider } = e.currentTarget.dataset;

    switch (type) {
      case 'signIn_google_button_is_clicked':
      case 'signIn_facebook_button_is_clicked':
      case 'signIn_github_button_is_clicked':
        if (provider) handleOAuthMutation.mutate(provider);
        break;
      case 'theme_button_is_clicked':
        const isThemeLight = theme === 'light'
        setTheme(isThemeLight ? 'dark' : 'light');
        break;
      case 'language_button_is_clicked':
        setCurrentLanguage(isEn ? 'ar' : 'en');
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row w-[100%] min-h-[100vh] bg-[var(--background-color)]"
    >
      {/* {loadingScreen && <LoadingScreen className={`${loadingScreen ? 'visible opacity-100' : 'invisible opacity-0'}`} />} */}
      <LoadingScreen className={`${loadingScreen ? 'visible opacity-100' : 'invisible opacity-0'}`} />
      <WireStyle/>
      <section
        className="flex flex-col md:flex-grow px-4 pt-4 pb-16 md:py-4 md:px-12 gap-4 bg-primary dark:bg-[#16432C] md:w-[50%] md:min-h-[100%] items-center"
      >
        <Image
          className="invert-[100%] h-[2rem] object-cover"
          src={main2LogoIcon}
          alt="Main Logo"
        />
        <h1 
          className="text-2xl font-bold text-heading-invert dark:text-heading"
        >
          <span className="text-secondary dark:text-[#6A9C89]">{isEn ? 'S' : 'ا'}</span>{isEn ? 'tay Organized, Stay Focused!' : 'بق منظما, و ابق مركزا!'}
        </h1>
        <ul
          className="flex flex-col justify-center gap-8 h-[100%] w-[100%]"
        >
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert dark:text-heading text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:before:bg-[#6A9C89] before:blur-[1px]"
          >
            <Image 
              className="--float-ani w-12 z-[10]"
              alt="Icon"
              src={lampIcon}
            />
            <span>{isEn ? 'Organize your tasks.' : 'رتب مهامك'}</span>
            <div 
              className={`
                --float-shadow-ani absolute bottom-[-6px] w-10 h-2 bg-[hsla(0,0%,10%,0.5)] rounded-[100%] blur-[2px]
                ${isEn ? 'left-[0.3rem]' : 'right-[0.3rem]'}
              `}
            />
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert dark:text-heading text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:before:bg-[#6A9C89] before:blur-[1px]"
          >
            <Image 
              className="--float-ani delay--1s w-12 z-[10]"
              alt="Icon"
              src={bookIcon}
            />
            <span>{isEn ? 'track your progress.' : 'تابع تتطورك'}</span>
            <div 
              className={`
                --float-shadow-ani delay--1s absolute bottom-[-6px] w-10 h-2 bg-[hsla(0,0%,10%,0.5)] rounded-[100%] blur-[2px]
                ${isEn ? 'left-[0.3rem]' : 'right-[0.3rem]'}
              `}
            />
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert dark:text-heading text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:before:bg-[#6A9C89] before:blur-[1px]"
          >
            <Image 
              className="--float-ani delay--05s w-12 z-[10]"
              alt="Icon"
              src={achivementIcon}
            />
            <span>{isEn ? 'achieve your goals with ease.' : 'احرز اهدافك بكل سهوله'}</span>
            <div 
              className={`
                --float-shadow-ani delay--05s absolute bottom-[-6px] w-10 h-2 bg-[hsla(0,0%,10%,0.5)] rounded-[100%] blur-[2px]
                ${isEn ? 'left-[0.3rem]' : 'right-[0.3rem]'}
              `}
            />
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert dark:text-heading text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:before:bg-[#6A9C89] before:blur-[1px]"
          >
            <div
              className="p-1 hover:bg-[hsla(0,0%,20%,0.7)] rounded-[100%] transition-colors duration-200 ease-out"
              data-type="theme_button_is_clicked"
              onClick={handleClick}
            >
              <MoonSlashSunSvg 
                className="--float-ani .delay--1s-05s w-12 cursor-pointer z-[10]"
                width="3rem" height="3rem" color="hsl(0, 0%, 90%)"
              />
            </div>
            <span>{isEn ? 'Pick your style in a' : 'حدد نمطك'}</span>{' '}
            <span 
              className="text-[#6A9C89] font-bold underline cursor-pointer"
              data-type="theme_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'click' : 'بنقره'}
            </span>{'.'}
            <div 
              className={`
                --float-shadow-ani .delay--1s-05s absolute bottom-[-6px] w-10 h-2 bg-[hsla(0,0%,10%,0.5)] rounded-[100%] blur-[2px]
                ${isEn ? 'left-[0.5rem]' : 'right-[0.5rem]'}
              `}
            />
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert dark:text-heading text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:before:bg-[#6A9C89] before:blur-[1px]"
          >
            <div
              className="p-1 hover:bg-[hsla(0,0%,20%,0.7)] rounded-[100%] transition-colors duration-200 ease-out"
              data-type="language_button_is_clicked"
              onClick={handleClick}
            >
              <GrommetLanguageSvg 
                className="--float-ani .delay--1s w-12 cursor-pointer z-[10]"
                width="2.8rem" height="2.8rem" color="hsl(0, 0%, 90%)"
              />
            </div>
            <span>{isEn ? 'Your journey is cruical' : 'رحلتك تهمنا'}</span>{' '}
            <span 
              className="text-[#6A9C89] font-bold underline cursor-pointer"
              data-type="language_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'pick' : 'اختر لغتك'}
            </span>{'.'}
            <div 
              className={`
                --float-shadow-ani .delay--1s absolute bottom-[-6px] w-10 h-2 bg-[hsla(0,0%,10%,0.5)] rounded-[100%] blur-[2px]
                ${isEn ? 'left-[0.5rem]' : 'right-[0.5rem]'}
              `}
            />
          </li>
          <li
            className="relative flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:dark:before:bg-[#6A9C89] before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:dark:before:bg-[#6A9C89] before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:dark:before:bg-[#6A9C89] before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:dark:before:bg-[#6A9C89] before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary dark:dark:before:bg-[#6A9C89] before:blur-[1px] after:content-['.'] after:opacity-0"
          />
        </ul>
      </section>
      <section
        className="md:flex md:flex-col md:max md:w-[50%] md:items-center z-[20]"
      >
        {loginParam 
          ? <SignInForm currentLanguage={currentLanguage} />
          : <SignUpForm currentLanguage={currentLanguage} />
        }
        <div
          className={`
            relative font-bold text-heading-invert w-[100%] px-4 py-8 text-center z-[3] before:absolute before:content-[''] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%-7rem)] md:before:max-w-[calc(600px-7rem)] before:h-[1px] before:bg-[var(--grey-color)] before:z-[1] 
            after:content-['Or'] after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] after:text-[var(--grey-color)] after:text-sm after:p-2 after:z-[2] after:bg-[var(--background-color)]
            ${isEn ? `after:content-['Or']` : `after:content-['او']` }
          `}
        >
        </div>
        <section
          className="flex flex-col flex-grow gap-4 w-[100%] md:max-width-[600px] py-8 items-center justify-center"
        >
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_google_button_is_clicked"
            data-provider='google'
            onClick={handleClick}
          >
            <span>{isEn ? 'Sign in with Google' : 'سجل الدخول بواسطه جوجل'}</span>
            <GoogleSvg color="var(--font-heading-color)"/>
          </button>
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_facebook_button_is_clicked"
            data-provider='facebook'
            onClick={handleClick}
          >
            <span>{isEn ? 'Sign in with Faceboo' : 'سجل الدخول بواسطه فيسبوك'}</span>
            <FacebookSvg color="var(--font-heading-color)"/>
          </button>
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_github_button_is_clicked"
            data-provider='github'
            onClick={handleClick}
          >
            <span>{isEn ? 'Sign in with GitHub' : 'سجل الدخول بواسطه جيت هاب'}</span>
            <GithubSvg color="var(--font-heading-color)"/>
          </button>
        </section>
      </section>
    </div>
  );
}
