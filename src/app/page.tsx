"use client"
import Image from "next/image";
import Link from 'next/link';
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import gitHubIcon from "../../public/assets/github.svg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      className="flex h-[100vh] w-[100vw]"
    >
      <div 
        className="flex flex-col mb-auto gap-8 rounded-lg w-[100%] "
      >
        <div
          className="flex flex-col gap-4 p bg-primary w-[100%] items-center "
        >
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
          className="flex flex-col gap-1 w-[100%] p-4 bg-white rounded-3xl"
        >
          <h2
            className="font-bold text-2xl text-heading mx-auto"
          >
            Sign in
          </h2>
          <label 
            className="text-body font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input 
            className="p-2 bg-[hsla(0, 0%, 40%, 0.4)]"
            placeholder="Example@gmail.com"
            id="email"
          /><br/>
          <label 
            htmlFor="password"
            className="text-body font-semibold"
          >
            Password
          </label>
          <input 
            className="p-2 bg-[hsla(0, 0%, 40%, 0.4)]"
            placeholder="Example@gmail.com" 
            id="password"
          /><br/>
        </div>
        <div
          className="relative font-bold text-heading-invert w-[100%] px-4 text-center z-[3] before:absolute before:content-[''] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[100%] before:h-[2px] before:bg-white before:z-[1] after:content-['OR'] after:absolute after:top-[50%] after:left-[50%] after:translate-y-[-50%] after:translate-x-[-50%] after:p-2 after:z-[2] after:bg-primary"
        >
        </div>
        <button 
          className="flex gap-2 items-center bg-secondary cursor-pointer text-heading font-semibold p-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
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
          className="flex gap-2 items-center bg-secondary cursor-pointer text-heading font-semibold p-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
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
          className="flex gap-2 items-center bg-secondary cursor-pointer text-heading font-semibold p-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
          data-type="signIn_github_button_is_clicked"
          onClick={handleClick}
        >
          <span>Sign in with GitHub</span>
          <Image
            src={gitHubIcon}
            alt="GitHub Logo"
          />
        </button>
      </div>
    </div>
  );
}
