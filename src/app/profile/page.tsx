"use client"

// HOOKS
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from 'next/image';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';
import CircularProgressBox from '@/components/CircularProgressBox';
import CameraSvg from '@/components/svgs/CameraSvg';
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import TaskInput from '@/components/TaskInput';
import DisplayTasks from '@/components/DisplayTasks';
import DisplayCompletedTasks from '@/components/DisplayCompletedTasks';

// API
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getBuckets from '@/api/getBuckets';

// STORES
import { useCurrentTabStore, useHomePageStore } from '@/store/index.js';

// ASSETS
import pfpImg from '@/../public/assets/pfp.jpg'

type NameParams = {
  name: string
}

export default function ProfilePage () {
  const isPfp = false;
  
  const { name } = useParams<NameParams>();
  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);

  useEffect(() => {
    setCurrentTab(name)
    setIsHomePage(false);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser,
  })


  return (
    <MainWrapper>
      <Header tab='Profile' />
      <div
        className="flex flex-col gap-4"
      >
        <section
          className="
            flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8
            w-[100%] p-4 backdrop-blur-[3px] bg-[hsla(0,0%,80%,0.5)] dark:bg-[hsla(0,0%,20%,0.5)] rounded-xl
          "
        >
          <div
            className="group relative rounded-[10rem] overflow-hidden cursor-pointer"
          >              
            { isPfp
              ? <Image
                src={pfpImg}
                alt="User Profile Picture"
                className="w-[10rem] aspect-[1/1] object-cover object-center"
              />
              : <PersonFillSvg width="10rem" height="10rem" color="var(--font-heading-color)" 
                className="w-[10rem] p-8 aspect-[1/1] object-cover object-center bg-[var(--background-deep-color)]"
              />
            }
            <button
              className="
                absolute bottom-8 left-[50%] translate-x-[-50%]
                flex flex-row gap-2
                px-2 py-1 bg-[hsla(0,0%,100%,0.6)] dark:bg-[hsla(0,0%,0%,0.6)] group-hover:bg-[hsla(0,0%,100%,0.8)] dark:hover:bg-[hsla(0,0%,0%,0.8)] 
                text-xs font-bold text-body hover:text-heading rounded-lg whitespace-nowrap
                transition-all duration-200 ease-out
              "
            >
              <CameraSvg color="var(--font-heading-color)" 
                className="opacity-70 group-hover:opacity-100"
              />
              <span>
                Change Image
              </span>
            </button>
          </div>
          <div
            className="flex flex-col items-center justify-center w-[100%] md:w-auto"
          >
            <span
              className="text-heading text-md font-bold"
            >
              Geegne
            </span><hr/>    
            <span
              className="text-body-light text-sm"
            >
              bluewhalexweb@outlook.com
            </span>                              
          </div>
        </section>
        <section
          className="
            flex flex-col md:flex-row items-center md:items-start md:justify-center gap-4 md:gap-8
            w-[100%] p-4 backdrop-blur-[3px] bg-[hsla(0,0%,80%,0.5)] dark:bg-[hsla(0,0%,20%,0.5)] rounded-xl
          "
        >
          <CircularProgressBox 
            title="Accomplished Goals" 
            description="Celebrate the tasks you've successfully completed, each one a step closer to your larger ambitions." 
          />
          <CircularProgressBox
            title="Done & Dusted" 
            description="Reflect on your hard work and enjoy the satisfaction of checking things off your list."       
          />
        </section>
      </div>
    </MainWrapper>
  )
}
