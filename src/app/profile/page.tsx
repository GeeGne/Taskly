"use client"

// HOOKS
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';
import CameraSvg from '@/components/svgs/CameraSvg';
import TaskInput from '@/components/TaskInput';
import DisplayTasks from '@/components/DisplayTasks';
import DisplayCompletedTasks from '@/components/DisplayCompletedTasks';

// API
import getTasksByBucketId from '@/api/getTasksByBucketId';
import getBuckets from '@/api/getBuckets';

// STORES
import { useCurrentTabStore, useHomePageStore } from '@/store/index.js';

// ASSETS
import pfpImg from '@/../public/assets/pfp.jpg'

type NameParams = {
  name: string
}

export default function ProfilePage () {

  const { name } = useParams<NameParams>();
  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);

  useEffect(() => {
    setCurrentTab(name)
    setIsHomePage(false);
  }, []);


  return (
    <MainWrapper>
      <Header tab='Profile' />
      <div
        className="flex flex-col"
      >
        <section
          className="
            flex flex-col items-center
            w-[100%] p-4 backdrop-blur-[3px] bg-[hsla(0,0%,80%,0.5)] dark:bg-[hsla(0,0%,20%,0.5)] rounded-xl"

        >
          <div
            className="relative rounded-[10rem] overflow-hidden cursor-pointer"
          >
            <Image
              src={pfpImg}
              alt=""
              className="w-[10rem]"
            />

            <button
              className="
                absolute bottom-4 left-[50%] translate-x-[-50%]
                flex flex-row gap-2
                px-2 py-1 bg-[hsla(0,0%,100%,0.6)] dark:bg-[hsla(0,0%,0%,0.6)] hover:bg-[hsla(0,0%,100%,1)] dark:hover:bg-[hsla(0,0%,0%,1)] 
                text-xs font-bold text-body hover:text-heading rounded-lg whitespace-nowrap
              "
            >
              <CameraSvg color="var(--font-heading-color)" />
              <span>
                Change Image
              </span>
            </button>
          </div>
        </section>
      </div>
    </MainWrapper>
  )
}
