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

// DAYJS
import dayjs from 'dayjs';

export default function today () {
  
  const date = dayjs();
  const yesterday = date.subtract(1, 'day');
  const isToday = (createdAt: string) => date.isSame(createdAt, 'day');
  const isYesterday = (createdAt: string) =>  date.subtract(1, 'day').isSame(createdAt, 'day');
  const isPastWeek = (createdAt: string) =>  
    !isToday(createdAt)
    && !isYesterday(createdAt)
    && date.subtract(7, 'day').isBefore(createdAt, 'day')
  ;

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

  const { data: buckets, isLoading: isBucketsLoading } = useQuery({
    queryKey: ['buckets'],
    queryFn: getBuckets
  });
  
  //DEBUG
  console.log('date: ', date);
  console.log('is same as Today: ', isToday);
  console.log('is same as yesterday: ', isYesterday);
  console.log('yesterday: ', yesterday);
  // const createdAt = '2024-12-13 11:39:46.480279+00';

  return (
    <MainWrapper>
      <Header tab={isEn ? 'Today' : 'اليوم'} currentLanguage={currentLanguage} />
      <TaskInput currentLanguage={currentLanguage} />
      <DisplayTasks 
        title={isEn ? 'For Today' : 'لليوم'}
        currentLanguage={currentLanguage}
        tasks={tasks?.filter((itm: any) => !itm.is_completed && isToday(itm.created_at))}
        isTasksLoading={isTasksLoading}
        buckets={buckets}
      />
      <DisplayTasks 
        title={isEn ? 'Yesterday' : 'امس'}
        currentLanguage={currentLanguage}
        tasks={tasks?.filter((itm: any) => !itm.is_completed && isYesterday(itm.created_at))}
        isTasksLoading={isTasksLoading}
        buckets={buckets}
      />
      <DisplayTasks 
        title={isEn ? 'Past Week' : 'ضمن الاسبوع'}
        currentLanguage={currentLanguage}
        tasks={tasks?.filter((itm: any) => !itm.is_completed && isPastWeek(itm.created_at))}
        isTasksLoading={isTasksLoading}
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
