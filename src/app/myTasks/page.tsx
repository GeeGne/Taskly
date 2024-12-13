"use client"
// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// API
import getTasks from '@/api/getTasks';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import DisplayTasks from '@/components/DisplayTasks';
import DisplayCompletedTasks from '@/components/DisplayCompletedTasks';

// STORES
import { useCurrentTabStore, useHomePageStore, useLanguageStore } from '@/store/index.js';

export default function MyTasks () {

  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);
  const currentLanguage = useLanguageStore(status => status.currentLanguage);
  const isEn = currentLanguage === 'en';

  useEffect(() => {
    setCurrentTab('myTasks')
    setIsHomePage(false);
  }, []);

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  return (
    <MainWrapper>
      <Header tab={isEn ? 'My Tasks' : 'مهماتي'} currentLanguage={currentLanguage}/>
      <TaskInput currentLanguage={currentLanguage} />
      <DisplayTasks 
        tasks={tasks?.filter((itm: any) => !itm.is_completed && !itm.bucket_id)} 
        isTasksLoading={isTasksLoading} 
        currentLanguage={currentLanguage}
        title={isEn ? 'To Do' : 'قائمه المهام'}
      />
      <DisplayCompletedTasks 
        tasks={tasks?.filter((itm: any) => itm.is_completed && !itm.bucket_id)} 
        isTasksLoading={isTasksLoading} 
        currentLanguage={currentLanguage}
      />
    </MainWrapper>
  )
}
