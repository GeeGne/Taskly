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
import { useSideBarStore, useNotificationToastStore, useCurrentTabStore, useHomePageStore } from '@/store/index.js';

export default function Inbox () {

  const queryClient = useQueryClient();
  const router = useRouter();
  
  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  };

  const [ newTask, setNewTask ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);
  const [ addTaskActivityBtn, setAddTaskActivityBtn ] = useState<boolean>(false);
  const [ deleteTaskActivityBtn, setDeleteTaskActivityBtn ] = useState<DeleteActivityBtn>({ activity: true, taskId: '1'})
  
  const { toggle, setToggle } = useSideBarStore();
  const { notificationToast, setNotificationToast, setNotificationText } = useNotificationToastStore();

  const addTaskInpRef = useRef<HTMLInputElement>(null);
  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);

  useEffect(() => {
    setCurrentTab('inbox')
    setIsHomePage(false);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  });

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onMutate: () => {
      setAddTaskActivityBtn(true);
    },
    onSettled: () => {
      setAddTaskActivityBtn(false);
      setIsFocus(false);
      if (addTaskInpRef.current) addTaskInpRef.current.value = ''
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNotificationText('New Task is Added');
      setNotificationToast(Date.now());
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: (taskId) => {
      setDeleteTaskActivityBtn({ activity: true, taskId });
    },
    onSettled: () => {
      setDeleteTaskActivityBtn({ activity: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewTask(value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, taskId } = e.currentTarget.dataset;
    switch (type) {
      case 'toggle_sideBar_button_is_clicked':
        setToggle(!toggle)
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  };

  const handleWelcomeTag = (text: string) => {
    if (isLoading) {
      return 'Loading...';
    }

    return text;
  };

  const handleAddBtn = (text: string) => {
    if (addTaskActivityBtn) return (
       <>
         <span className="opacity-0">{text}</span>
         <TripleBarActivity />
       </>
    ); 

    return <span>{text}</span>;
  };

  const handleDeleteBtn = (taskId: string) => {
    if (deleteTaskActivityBtn.activity && (deleteTaskActivityBtn.taskId === taskId)) 
      return <SpinnersRingsMultipleSvg
        className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"
      />
    ;

    return <XSvg 
      className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"
    />;
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'addTask':
        console.log('focus');
        setIsFocus(true);
        break;
      default:
        console.error('Unknown Name: ', name);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'addTask':
        console.log('blur')
        setIsFocus(false);

        break;
      default:
        console.error('Unknown Name: ', name);
    }
  };

  return (
    <MainWrapper>
      <Header tab='Inbox' />
      <TaskInput />
      <DisplayTasks tasks={tasks?.filter((itm: any) => !itm.is_completed)} isTasksLoading={isTasksLoading} />
      <DisplayCompletedTasks tasks={tasks?.filter((itm: any) => itm.is_completed)} isTasksLoading={isTasksLoading} />
    </MainWrapper>
  )
}
