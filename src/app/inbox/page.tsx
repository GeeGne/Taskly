"use client"
// HOOKS
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// API
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';
import getBuckets from '@/api/getBuckets';
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

// STORES
import { useLanguageStore, useCurrentTabStore, useHomePageStore } from '@/store/index.js';

export default function Inbox () {

  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);
  const currentLanguage = useLanguageStore(status => status.currentLanguage);
  const isEn = currentLanguage === 'en';

  useEffect(() => {
    setCurrentTab('inbox')
    setIsHomePage(false);
  }, []);

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  const { data: buckets, isLoading: isBucketsLoading } = useQuery({
    queryKey: ['buckets'],
    queryFn: getBuckets
  });

  return (
    <MainWrapper>
      <Header tab={isEn ? 'Inbox' : 'الصندوق'} />
      <TaskInput currentLanguage={currentLanguage} />
      <DisplayTasks 
        tasks={tasks?.filter((itm: any) => !itm.is_completed)} 
        isTasksLoading={isTasksLoading} 
        currentLanguage={currentLanguage}
        title={isEn ? 'To Do' : 'قائمه المهام'}
        buckets={buckets}
      />
      <DisplayCompletedTasks 
        tasks={tasks?.filter((itm: any) => itm.is_completed)} 
        isTasksLoading={isTasksLoading} 
        currentLanguage={currentLanguage}
      />
    </MainWrapper>
  )
}
