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
import { useCurrentTabStore } from '@/store/index.js';

export default function MyTasks () {

  const { setCurrentTab } = useCurrentTabStore();
  useEffect(() => setCurrentTab('myTasks'), []);

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  return (
    <MainWrapper>
      <Header tab='My Tasks' />
      <TaskInput />
      <DisplayTasks tasks={tasks?.filter((itm: any) => !itm.is_completed && !itm.bucket_id)} isTasksLoading={isTasksLoading} />
      <DisplayCompletedTasks tasks={tasks?.filter((itm: any) => itm.is_completed && !itm.bucket_id)} isTasksLoading={isTasksLoading} />
    </MainWrapper>
  )
}
