"use client"
import Image from "next/image";
import Link from 'next/link';
import gitHubIcon from "../../public/assets/github.svg";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useEffect, useState } from 'react';

// API
import handleGitHubLogin from '@/api/handleGitHubLogin';
import checkAuth from '@/api/checkAuth';

// supabase
import { Session, User } from '@supabase/supabase-js';

export default function Home() {

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth
  })

  const handleGitHubMutation = useMutation({
    mutationFn: handleGitHubLogin
  })

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
      className="flex flex-col max-w-[750px] my-auto mx-auto bg-primary items-center gap-8 rounded-lg p-8 mx-4 md:mx-auto"
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
  );
}
