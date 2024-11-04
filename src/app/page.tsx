"use client"
import Image from "next/image";
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// COMPONENTS
import WireStyle from '@/components/WireStyle';

// ASSETS
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import githubIcon from "../../public/assets/github.svg";
import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
import mainLogoIcon from "../../public/assets/taskly-logo.png";
import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";

// API
import handleGitHubLogin from '@/api/handleGitHubLogin';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';

// SUPABASE
import { Session, User } from '@supabase/supabase-js';

// UTILS
import Redirector from '@/utils/Redirector';


export default function Home() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const redirect = new Redirector(router);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

  const handleGitHubMutation = useMutation({
    mutationFn: handleGitHubLogin
  })

  useEffect(() => {
    redirect.home(user);
  }, [user])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'signIn_github_button_is_clicked':
        handleGitHubMutation.mutate();
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
      <div
        className="flex flex-col md:flex-grow px-4 pt-4 pb-16 gap-4 bg-primary md:w-[50%] md:min-h-[100%] items-center"
      >
        <Image
          className="invert-[100%] h-[2rem] object-cover"
          src={main2LogoIcon}
          alt="Main Logo"
        />
        <h1 
          className="text-2xl font-bold text-heading-invert"
        >
          Stay Organized, Stay Focused!
        </h1>
        <h2 
          className="text-lg font-semibold text-heading-invert"
        >
          Organize your tasks, track your progress, and achieve your goals with ease.
        </h2>
      </div>
      <div
        className="md:w-[50%] z-[20]"
      >
        <form
          className="flex flex-col mt-[-2rem] md:mt-[0] gap-1 w-[100%] p-4 rounded-t-3xl"
        >
          <h2
            className="font-bold text-2xl text-heading mx-auto"
          >
            Create account
          </h2>
          <label 
            htmlFor="username"
            className="text-body font-semibold"
          >
            Username
          </label>
          <input 
            className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
            // placeholder="Example@gmail.com" 
            id="username"
          /><br/>
          <label 
            className="text-body font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input 
            className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
            // placeholder="Example@gmail.com"
            id="email"
          /><br/>
          <div
            className="flex flex-row flex-grow gap-8"
          >
            <div
              className="flex flex-col flex-grow"
            >
              <label 
                htmlFor="password"
                className="text-body font-semibold"
              >
                Password
              </label>
              <div
                className="relative"
              >
                <input 
                  className="w-[100%] p-2 bg-[hsl(0,0%,80%)] rounded-sm"
                  // placeholder="Example@gmail.com" 
                  id="password"
                  type="password"
                />
                <Image
                  className="absolute content-[''] top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]"
                  src={eyeIcon}
                  alt="Eye Icon"
                />
              </div>
            </div>
            <div
              className="relative flex flex-col flex-grow"
            >
              <label 
                htmlFor="confirm"
                className="text-body font-semibold"
              >
                Confirm
              </label>
              <div
                className="relative flex flex-col flex-grow"
              >
                <input 
                  className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
                  // placeholder="Example@gmail.com" 
                  id="confirm"
                  type="password"
                />
                <Image
                  className="absolute content-[''] top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]"
                  src={eyeIcon}
                  alt="Eye Icon"
                />
              </div>
            </div>
          </div><br/>
          <button 
            className="flex gap-2 items-center bg-primary cursor-pointer mx-auto text-heading-invert font-semibold px-8 py-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_github_button_is_clicked"
            onClick={handleClick}
          >
            Create account
          </button><br/>
          <a
            className=""
            id="login"
            href="google.com"
            target="_blank"
          >
            <span
              className="text-primary underline"
            >
              Already have an Account?
            </span>{' '}
            <span
              className="font-bold text-primary"
            >
              login
            </span>  
          </a>
        </form>
        <div
          className="relative font-bold text-heading-invert w-[100%] px-4 py-8 text-center z-[3] before:absolute before:content-[''] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%-4em)] before:h-[1px] before:bg-[var(--grey-color)] before:z-[1] after:content-['Or'] after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] after:text-[var(--grey-color)] after:text-sm after:p-2 after:z-[2] after:bg-white"
        >
        </div>
        <div
          className="flex flex-col flex-grow gap-4 w-[100%] py-8 items-center justify-center"
        >
          <button 
            className="flex gap-2 items-center border-solid border-[2px] border-[hsl(0,0%,40%)] cursor-pointer text-heading font-semibold p-2 rounded-[5rem] transition-opacity duration-150 ease-in hover:opacity-70"
            data-type="signIn_github_button_is_clicked"
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
            data-type="signIn_github_button_is_clicked"
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
            onClick={handleClick}
          >
            <span>Sign in with GitHub</span>
            <Image
              src={githubIcon}
              alt="GitHub Logo"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
