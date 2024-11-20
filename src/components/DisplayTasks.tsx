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
import updateIsCompletedFromTasks from '@/api/updateIsCompletedFromTasks';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import CheckSvg from '@/components/svgs/CheckSvg';
import IcRoundArrowRightSvg from '@/components/svgs/IcRoundArrowRightSvg';
import SpinnersRingsMultipleSvg from '@/components/svgs/SpinnersRingsMultipleSvg';
import ArrowUpSvg from '@/components/svgs/ArrowUpSvg';
import ArrowDownSvg from '@/components/svgs/ArrowDownSvg';
import XSvg from '@/components/svgs/XSvg';

// STORES
import { useSideBarStore, useNotificationToastStore, useErrorAlertStore  } from '@/store/index.js';

type Tasks = {
  tasks?: any[] | null;
  isTasksLoading?: boolean
}

export default function DisplayTasks ({ tasks = null, isTasksLoading = true }: Tasks) {

  const queryClient = useQueryClient();
  const router = useRouter();
  const imitateTasks = [1, 2, 3, 4, 5];

  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  }

  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { setErrorAlert, setErrorText } = useErrorAlertStore();
  const [ deleteTaskActivityBtn, setDeleteTaskActivityBtn ] = useState<DeleteActivityBtn>({ activity: true, taskId: '1'})
  const [ toggle, setToggle ] = useState<boolean>(true);
  

  const tasksLiRefs = useRef<HTMLElement[]>([]);
  console.log('tasksLiRefs:', tasksLiRefs)

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: taskId => {
      setDeleteTaskActivityBtn({ activity: true, taskId });
    },
    onSettled: () => {
      setDeleteTaskActivityBtn({ activity: false });
    },
    onError: error => {
      setErrorText('Error while updating task: ' + error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']});
      setNotificationText('task deleted');
      setNotificationToast(Date.now());
    }
  });

  const updateIsCompletedTaskMutation = useMutation({
    mutationFn: updateIsCompletedFromTasks,
    onError: error => {
      setErrorText('Error while updating task: ' + error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      tasksLiRefs.current.forEach(el => el?.classList.remove('task-completed'));
      queryClient.invalidateQueries({queryKey: ['tasks']});
      setNotificationText('task completed');
      setNotificationToast(Date.now());
    }
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const { type, taskId } = e.currentTarget.dataset;

    switch (type) {
      case "delete_task_button_is_clicked":
        if (taskId) deleteTaskMutation.mutate(taskId);
        break;
      case "toggle_div_is_clicked":
        setToggle(!toggle);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { taskId } = e.currentTarget.dataset;

    const getRef = (taskId?: string) => tasksLiRefs.current.find((el) => el.dataset.taskId === taskId);    

    switch (name) {
      case 'task':
        if (e.currentTarget.checked) {
          const boolNum = 1;
          getRef(taskId)?.classList.add('task-completed');
          updateIsCompletedTaskMutation.mutate({ boolNum, taskId: Number(taskId)})
        } else {
          getRef(taskId)?.classList.remove('task-completed');
        }
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleDeleteBtn = (taskId: string) => {
    if (deleteTaskActivityBtn.activity && (deleteTaskActivityBtn.taskId === taskId)) 
      return <SpinnersRingsMultipleSvg
        className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"
      />
    ;

    return <XSvg 
      className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"
    />;
  }

  return (
    <section
      className="flex flex-col gap-1"
    >
      <div 
        className="flex items-center cursor-pointer"
        role="button"
        data-type="toggle_div_is_clicked"
        onClick={handleClick}
      >
        <IcRoundArrowRightSvg 
          className={`
            ${isTasksLoading && 'bg-[var(--background-light-color)] rounded-lg'}
            ${toggle ? 'rotate-[90deg]' : 'rotate-0'}
          `}
          color={isTasksLoading ? 'transparent' : 'var(--font-body-color)'}
        />
        <h2
          className={`
            font-bold text-sm text-body
            ${isTasksLoading ? '--flirk text-transparent bg-[var(--background-light-color)] rounded-lg' : ''}
          `}
        >
          To Do
        </h2>
        <span
          className={`
            font-bold text-sm text-body-extra-light px-2
          `}
        
        >
          {tasks?.length}
        </span>
      </div>
      <ul
        className={`
          flex-col gap-4 px-4
          ${toggle ? 'flex' : 'hidden'}
        `}
      >
        {isTasksLoading
          ? imitateTasks.map((itm ,i) => 
              <li
                className="--flirk relative flex flex-row before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-[0] before:h-[1px] before:w-[100%] before:bg-[var(--background-light-color)]"
                key={i}
              >
                <input 
                  id="task3"
                  type="checkbox"
                  className="opacity-0"
                />
                <label
                  htmlFor="task3"
                  className="relative group/check px-2 text-sm text-body bg-[var(--background-light-color)] rounded-lg ml-2 z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1.5rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-light-color)] before:z-[10]"
                >
                  <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover/check:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
                  <span className="opacity-0">
                    Wash the Dishes And hangout with friends.
                  </span>
                </label>
                <nav
                  className="flex ml-auto gap-2 ease-out transition-all duration-150"
                >
                  <ArrowUpSvg 
                    className="p-1 bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--background-light-color)"  
                  />                  
                  <ArrowDownSvg 
                    className="p-1 bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--background-light-color)"  
                  />            
                  <XSvg 
                    className="p-1 bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--background-light-color)"  
                  />            
                </nav>
              </li>
            )
          : tasks?.filter((itm) => !itm.is_completed).map((itm:any, i: number) => 
              <li
                className="relative group flex flex-row before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-[0] before:h-[1px] before:w-[100%] before:bg-[var(--background-light-color)]"
                key={i}
                data-task-id={itm.id}
                ref={(el: any) => tasksLiRefs.current[i] = el}
              >
                <input 
                  className="opacity-0"
                  id={itm.id}
                  type="checkbox"
                  name="task"
                  data-task-id={itm.id}
                  onChange={handleChange}
                />
                <label
                  htmlFor={itm.id}
                  className="
                    relative group/check px-2 z-[5] hover:cursor-pointer 
                    before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]
                  "
                >
                  <CheckSvg 
                    className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover/check:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" 
                  />             
                  <span
                    className="text-sm text-body"
                  >
                    {itm.title}
                  </span>
                </label>
                <nav
                  className="flex ml-auto gap-2 opacity-0 group-hover:opacity-100 ease-out transition-all duration-150"
                >
                  <ArrowUpSvg 
                    className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"  
                  />                  
                  <ArrowDownSvg 
                    className="p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer" width="1.5rem" height="1.5rem" color="var(--font-body-color)"  
                  />
                  <button
                    role="button"
                    data-type="delete_task_button_is_clicked"
                    data-task={itm.title}
                    data-task-id={itm.id}
                    onClick={handleClick}  
                  >
                    {handleDeleteBtn(String(itm.id))}
                  </button>            
                </nav>
              </li>
            )
        }
      </ul>
    </section>

  )
}