"use client"
// HOOKS
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// API
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';
import addTask from '@/api/addTask';
import deleteTask from '@/api/deleteTask';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import DisplayTasks from '@/components/DisplayTasks';
import DisplayCompletedTasks from '@/components/DisplayCompletedTasks';
import SpinnersRingSvg from '@/components/svgs/SpinnersRingSvg';
import SpinnersRingsMultipleSvg from '@/components/svgs/SpinnersRingsMultipleSvg';
import BoxArrowRightSvg from '@/components/svgs/BoxArrowRightSvg';
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';
import ArrowBarRightSvg from '@/components/svgs/ArrowBarRightSvg';
import CheckLgSvg from '@/components/svgs/CheckLgSvg';
import CheckSvg from '@/components/svgs/CheckSvg';
import ArrowUpSvg from '@/components/svgs/ArrowUpSvg';
import ArrowDownSvg from '@/components/svgs/ArrowDownSvg';
import XSvg from '@/components/svgs/XSvg';
import TripleBarActivity from '@/components/TripleBarActivity';

// STORES
import { useLanguageStore, useCurrentTabStore, useHomePageStore } from '@/store/index.js';

export default function today () {

  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  };
  
  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);
  const currentLanguage = useLanguageStore(status => status.currentLanguage);
  const isEn = currentLanguage === 'en';

  useEffect(() => {
    setCurrentTab('today');
    setIsHomePage(false);
  }, []);

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });
  
  return (
    <MainWrapper>
      <Header tab={isEn ? 'Today' : 'اليوم'} currentLanguage={currentLanguage} />
      <TaskInput currentLanguage={currentLanguage} />
      <DisplayTasks 
        tasks={tasks?.filter((itm: any) => !itm.is_completed)}
        isTasksLoading={isTasksLoading}
        currentLanguage={currentLanguage}
      />
      <DisplayCompletedTasks 
        tasks={tasks?.filter((itm: any) => itm.is_completed)}
        isTasksLoading={isTasksLoading}
        currentLanguage={currentLanguage}
      />
    </MainWrapper>
  )
}
