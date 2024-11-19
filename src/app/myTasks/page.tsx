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
import { useSideBarStore, useNotificationToastStore, useCurrentTabStore } from '@/store/index.js';

export default function MyTasks () {

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
  
  const { setCurrentTab } = useCurrentTabStore();
  const { toggle, setToggle } = useSideBarStore();
  const { notificationToast, setNotificationToast, setNotificationText } = useNotificationToastStore();

  const addTaskInpRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  });

  useEffect(() => {
    if (isLoading && !user) return;

    const redirect = new Redirector(router)
    redirect.home(user);
  }, [user]);

  useEffect(() => setCurrentTab('myTasks'), []);

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
      case "add_button_is_clicked":
        setIsFocus(true);
        if (newTask === '') return;
        addTaskMutation.mutate(newTask);
        break;
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
      <Header tab='My Tasks' />
      <section
        className={`
          flex flex-col border-solid border-2 p-2 rounded-2xl gap-2 transition-all duration-150 ease-out
          ${isFocus ? `border-[var(--background-deep-light-color)]` : `border-[var(--background-color)]`}
        `}
      >
        <input 
          className="peer task-input text-body outline-none bg-[var(--background-color)]"
          placeholder="What's on your mind?" 
          name="addTask"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={addTaskInpRef}
        />
        <hr/>
        <div
          className={`
            flex gap-4 ml-[auto] opacity-0 peer-focus:opacity-100 transition-all duration-150 ease-out
            ${isFocus ? `opacity-100` : `opacity-0`}
          `}
        >
          <button
            className="text-sm text-body-invert font-bold px-2 py-2 bg-[var(--background-light-invert-color)] p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            className="btn-a px-2 py-2 text-sm"
            data-type="add_button_is_clicked"
            onClick={handleClick}
          >
            {handleAddBtn('Add Task')}
          </button>
        </div>
      </section>
      <DisplayTasks tasks={tasks} isTasksLoading={isTasksLoading} />
      <DisplayCompletedTasks tasks={tasks} isTasksLoading={isTasksLoading} />
    </MainWrapper>
  )
}
