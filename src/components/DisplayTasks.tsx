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
import CheckSvg from '@/components/svgs/CheckSvg';
import SpinnersRingsMultipleSvg from '@/components/svgs/SpinnersRingsMultipleSvg';
import ArrowUpSvg from '@/components/svgs/ArrowUpSvg';
import ArrowDownSvg from '@/components/svgs/ArrowDownSvg';
import XSvg from '@/components/svgs/XSvg';

// STORES
import { useSideBarStore } from '@/store/index.js';

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
  const [ deleteTaskActivityBtn, setDeleteTaskActivityBtn ] = useState<DeleteActivityBtn>({ activity: true, taskId: '1'})

  const { toggle, setToggle } = useSideBarStore();
  const tasksLiRefs = useRef<HTMLElement[]>([]);
  console.log('tasksLiRefs:', tasksLiRefs)


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
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, taskId } = e.currentTarget.dataset;

    switch (type) {
      case "delete_task_button_is_clicked":
        if (taskId) deleteTaskMutation.mutate(taskId);
        break;
      case 'toggle_sideBar_button_is_clicked':
        setToggle(!toggle)
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
          getRef(taskId)?.classList.add('task-completed');
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
    <section>
      <ul
        className="flex flex-col gap-4"
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
                  className="relative group/check px-2 text-md text-body bg-[var(--background-deep-light-color)] rounded-lg ml-2 z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1.5rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-light-color)] before:z-[10]"
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
          : tasks?.map((itm:any, i: number) => 
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
                  className="relative group/check px-2 text-md text-body z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]"
                >
                  <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover/check:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
                  <span>
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