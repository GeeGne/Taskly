"use client"
import Image from "next/image";
// import Link from 'next/link';
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


// COMPONENTS
import SignInForm from '@/app/SignInForm';
import SignUpForm from '@/app/SignUpForm';
import WireStyle from '@/components/WireStyle';

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


export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const loginParam = Number(searchParams.get('login'));
  // const signupParam = Number(searchParams.get('signup'));

  // const queryClient = useQueryClient();
  const redirect = new Redirector(router);

  const { data: user } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

  const handleOAuthMutation = useMutation({
    mutationFn: handleOAuthSignIn
  })

  useEffect(() => {
    redirect.home(user);
  }, [user])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    
    const { type, provider } = e.currentTarget.dataset;

    switch (type) {
      case 'signIn_google_button_is_clicked':
      case 'signIn_facebook_button_is_clicked':
      case 'signIn_github_button_is_clicked':
        if (provider) handleOAuthMutation.mutate(provider);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div 
      className="flex flex-col md:flex-row w-[100%] min-h-[100vh] bg-yellow "
    >
      <WireStyle/>
      <section
        className="flex flex-col md:flex-grow px-4 pt-4 pb-16 md:py-4 md:px-12 gap-4 bg-primary md:w-[50%] md:min-h-[100%] items-center"
      >
        <Image
          className="invert-[100%] h-[2rem] object-cover"
          src={main2LogoIcon}
          alt="Main Logo"
        />
        <h1 
          className="text-2xl font-bold text-heading-invert"
        >
          <span className="text-secondary">S</span>tay Organized, Stay Focused!
        </h1>
        <ul
          className="flex flex-col justify-center gap-8 h-[100%] w-[100%]"
        >
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px]"
          >
            <Image 
              className="--float-ani w-12"
              alt="Icon"
              src={lampIcon}
            />
            <span>Organize your tasks.</span>
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px]"
          >
            <Image 
              className="--float-ani delay--1s w-12"
              alt="Icon"
              src={bookIcon}
            />
            <span>track your progress.</span>
          </li>
          <li
            className="relative flex flex-row items-end gap-2 text-heading-invert text-xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px]"
          >
            <Image 
              className="--float-ani delay--05s w-12"
              alt="Icon"
              src={achivementIcon}
            />
            <span>achieve your goals with ease.</span>
          </li>
          <li
            className="relative flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="relative hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px] after:content-['.'] after:opacity-0"
          />
          <li
            className="absloute hidden md:flex flex-row gap-2 text-heading-invert text-2xl before:content-[''] before:absolute before:top-[calc(100%+0.5rem)] before:left-[0%] before:w-[100%] before:h-[2px] before:bg-secondary before:blur-[1px] after:content-['.'] after:opacity-0"
          />
        </ul>
      </section>
      <section
        className="md:flex md:flex-col md:max md:w-[50%] md:items-center z-[20]"
      >
        {loginParam 
          ? <SignInForm />
          : <SignUpForm />
        }
        <div
          className="relative font-bold text-heading-invert w-[100%] px-4 py-8 text-center z-[3] before:absolute before:content-[''] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%-7rem)] md:before:max-w-[calc(600px-7rem)] before:h-[1px] before:bg-[var(--grey-color)] before:z-[1] after:content-['Or'] after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] after:text-[var(--grey-color)] after:text-sm after:p-2 after:z-[2] after:bg-white"
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
            <span>Sign in with Google</span>
            <Image
              src={googleIcon}
              alt="Google Logo"
            />
          </button>
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_facebook_button_is_clicked"
            data-provider='facebook'
            onClick={handleClick}
          >
            <span>Sign in with Facebook</span>
            <Image
              src={facebookIcon}
              alt="Facebook Logo"
            />
          </button>
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_github_button_is_clicked"
            data-provider='github'
            onClick={handleClick}
          >
            <span>Sign in with GitHub</span>
            <Image
              src={githubIcon}
              alt="GitHub Logo"
            />
          </button>
        </section>
      </section>
    </div>
  );
}
