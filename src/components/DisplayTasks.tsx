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
import PriorityHighRoundedSvg from '@/components/svgs/PriorityHighRoundedSvg';
import IcRoundArrowRightSvg from '@/components/svgs/IcRoundArrowRightSvg';
import SpinnersRingsMultipleSvg from '@/components/svgs/SpinnersRingsMultipleSvg';
import ArrowUpSvg from '@/components/svgs/ArrowUpSvg';
import ArrowDownSvg from '@/components/svgs/ArrowDownSvg';
import XSvg from '@/components/svgs/XSvg';

// STORES
import { 
  useSideBarStore, useNotificationToastStore, useErrorAlertStore, 
  useControllersStore, useHightlightTaskBasedOnPriorityStore  
} from '@/store/index.js';

// CONFETTI 
import Pride from "react-canvas-confetti/dist/presets/pride";

// DAYJS
import dayjs from 'dayjs';

type Tasks = {
  tasks?: any[] | null;
  isTasksLoading?: boolean;
  currentLanguage?: string;
  title?: string;
  buckets?: any[] | null;
}

export default function DisplayTasks ({ 
  title = 'To Do',
  currentLanguage = 'en',
  tasks = null, 
  isTasksLoading = true, 
  buckets = null
}: Tasks) {
 
  const queryClient = useQueryClient();
  const router = useRouter();
  const imitateTasks = [1, 2, 3];
  const isEn = currentLanguage === 'en';

  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  }

  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { setErrorAlert, setErrorText } = useErrorAlertStore();
  const taskCompleteCelebrateConfettiToggle = useControllersStore(status => status.taskCompleteCelebrateConfettiToggle);
  const hightlightTaskBasedOnPriorityToggle = useHightlightTaskBasedOnPriorityStore(status => status.hightlightTaskBasedOnPriorityToggle);
  const [ deleteTaskActivityBtn, setDeleteTaskActivityBtn ] = useState<DeleteActivityBtn>({ activity: true, taskId: '1'})
  const [ toggle, setToggle ] = useState<boolean>(true);
  
  const [ showPrideConfetti, setShowPrideConfetti ] = useState<boolean>(false);
  const confettiTimerId = useRef<any>(null);
  
  const tasksLiRefs = useRef<HTMLElement[]>([]);

  const isTaskHaveBucket = (bucket_id: number) => buckets?.some((bucket: any) => bucket.id === bucket_id);
  const getBucket = (bucket_id: number) =>  buckets?.find((bucket:any) => bucket.id === bucket_id)
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: taskId => {
      setDeleteTaskActivityBtn({ activity: true, taskId });
    },
    onSettled: () => {
      setDeleteTaskActivityBtn({ activity: false });
    },
    onError: error => {
      setErrorText( isEn ? 'Error while updating task: ' : ' :حصل خطأ خلال تعديل المهمه' + error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']});
      setNotificationText(isEn ? 'task deleted' : 'تم مسح المهمه');
      setNotificationToast(Date.now());
    }
  });

  const updateIsCompletedTaskMutation = useMutation({
    mutationFn: updateIsCompletedFromTasks,
    onError: error => {
      setErrorText(isEn ? 'Error while updating task: ' : ': حصل خطأ خلال تعديل المهمه' + error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      tasksLiRefs.current.forEach(el => el?.classList.remove('task-completed'));
      queryClient.invalidateQueries({queryKey: ['tasks']});
      setNotificationText(isEn ? 'task completed' : 'تم انجاز المهمه');
      setNotificationToast(Date.now());
      displayPrideConfetti();
    }
  })

  const getPriorityColor = (key: string) => {
    switch (key) {
      case 'none':
        return 'var(--none-priority-color)';
      case 'normal':
        return 'var(--normal-priority-color)';
      case 'important':
        return 'var(--important-priority-color)';
      case 'critical':
        return 'var(--critical-priority-color)';
      default:
        console.error('Unknown Key: ', key);
    }
  }

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

  const displayPrideConfetti = () => {
    setShowPrideConfetti(true);

    clearTimeout(confettiTimerId.current);
    confettiTimerId.current = setTimeout(() => {
      setShowPrideConfetti(false);
    }, 5000)
  }

  const hanldeTranslate = (priorityKey: string) => {
    
    if (isEn) return priorityKey;

    switch (priorityKey) {
      case 'normal':
        return 'متوسط';
      case 'important':
        return 'مهم';
      case 'critical':
        return 'غايه الاهميه';
      default:
        console.error('Unknown priorityKey: ', priorityKey);
        return '--';
    }
  }

  // DEBUG & UI
  // isTasksLoading = true;
  // console.log('hightlightTaskBasedOnPriorityToggle: ', hightlightTaskBasedOnPriorityToggle);
  // console.log('tasks: ', tasks);

  return (
    <section
      className="flex flex-col gap-1"
    >
      { taskCompleteCelebrateConfettiToggle 
        && showPrideConfetti 
        && <Pride autorun={{ speed: 3, duration: 1000 }} />
      }
      <div 
        className={`
          flex items-center cursor-pointer
          ${isTasksLoading && 'gap-2'}
        `}
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
          {title}
        </h2>
        <span
          className={`
            font-bold text-sm text-body-extra-light px-2
            ${isTasksLoading ? 'hidden' : 'initial'}
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
                  className={`
                    relative group/check px-2 text-sm text-body bg-[var(--background-light-color)] rounded-lg ml-2 z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-light-color)] before:z-[10]
                    ${isEn ? 'before:left-[-1.5rem]' : 'before:right-[-1.5rem]'}
                  `}
                >
                  <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
                  <span className="opacity-0">
                    Wash the Dishes And hangout with friends.
                  </span>
                </label>
                <nav
                  className={`
                    flex gap-2 ease-out transition-all duration-150"
                    ${isEn ? 'ml-auto' : 'mr-auto'}
                  `}
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
                className="
                  relative group flex flex-col
                  before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-[0] before:h-[1px] before:w-[100%] before:bg-[var(--background-light-color)]
                "
                key={itm.id}
                data-task-id={itm.id}
                ref={(el: any) => tasksLiRefs.current[i] = el}
              >
                <label
                  htmlFor={itm.id}
                  className={`
                    relative group/check 
                    flex items-center 
                    px-2 z-[5] hover:cursor-pointer 
                    before:content-[''] before:absolute before:top-[50%] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]
                    ${isEn ? 'before:left-[-1rem]' : 'before:right-[-1rem]'}
                  `}
                >
                  <input 
                    className="opacity-0"
                    id={itm.id}
                    type="checkbox"
                    name="task"
                    data-task-id={itm.id}
                    onChange={handleChange}
                  />
                  <CheckSvg 
                    className={`
                      absolute top-[50%] translate-y-[-50%] 
                      text-body-extra-light opacity-0 group-hover/check:opacity-100 z-[15]                      
                      ${isEn ? 'left-[-1rem]' : 'right-[-1rem]'}
                    `} 
                    width="1rem" 
                    height="1rem"
                  />             
                  <span
                    className={`relative text-sm text-body ${isEn ? 'mr-auto' : 'ml-auto'}`}
                  >
                    {itm.title}
                    <div
                      className={`
                        absolute content-[''] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] 
                        w-[calc(100%+1.5rem)] h-2 
                        z-[1] blur-[0px] overflow-hidden opacity-30 
                        ${itm.priority !== 'normal' || !hightlightTaskBasedOnPriorityToggle || 'bg-[var(--normal-priority-color)]'}                                                      
                        ${itm.priority !== 'important' || !hightlightTaskBasedOnPriorityToggle || 'bg-[var(--important-priority-color)]'}                                                      
                        ${itm.priority !== 'critical' || !hightlightTaskBasedOnPriorityToggle || 'bg-[var(--critical-priority-color)]'}                                                    
                      `}
                    >
                      <div
                        className="absolute top-1 left-[-1.5rem] w-10 h-10 rotate-[45deg] bg-[var(--background-color)]"
                      />                      
                      <div
                        className="absolute bottom-1 right-[-1.5rem] w-10 h-10 rotate-[-45deg] bg-[var(--background-color)]"
                      />                        
                    </div>
                  </span>
                  <div
                    className={`
                      flex flex-wrap whitespace-nowrap justify-end gap-3 shink-0 px-2 opacity-70 font-bold
                    `}
                  >
                    { itm.priority === 'none' ||
                      <span
                        className={`
                          text-xs 
                          ${itm.priority !== 'normal' || 'text-[var(--normal-priority-color)]'}                                                      
                          ${itm.priority !== 'important' || 'text-[var(--important-priority-color)]'}                                                      
                          ${itm.priority !== 'critical' || 'text-[var(--critical-priority-color)]'}                                                    

                        `}
                      >
                        {'!' + hanldeTranslate(itm.priority)}
                      </span>
                    }
                    { itm.for_today &&
                      <span
                        className="text-xs text-[var(--today-label-invert-color)]"
                      >
                        @{isEn ? 'today' : 'اليوم'} 
                      </span>
                    }
                    { isTaskHaveBucket(itm.bucket_id) &&
                      <span
                        className="text-body text-xs text-primary"
                       >
                        {'#' + getBucket(itm.bucket_id).name}
                      </span>
                    }
                  </div>
                </label>
                <nav
                  className={`
                    flex shrink-0 items-end enter gap-2 opacity-0 h-0 px-2 group-hover:h-[2rem] group-hover:opacity-100 
                    ease-out transition-all duration-150
                  `}
                >
                  <span
                    className="text-xs text-body-extra-light"
                  >
                    {dayjs(itm.created_at).format('YY-MM-DD hh:mma')}
                  </span>
                  <div
                    className={`
                      group relative overflow-hidden hover:overflow-visible"
                      ${isEn ? 'ml-auto' : 'mr-auto'}
                    `}
                  >
                    <PriorityHighRoundedSvg 
                      className="
                        p-1 hover:bg-[var(--background-light-color)] ease-out transition-all duration-150 rounded-[100%] cursor-pointer
                      " 
                      width="1.5rem" 
                      height="1.5rem"
                      color={getPriorityColor(itm.priority)}
                    />
                    <div
                      className="
                        absolute bottom-[calc(100%+0.5rem)] left-[50%] translate-x-[-50%] 
                        bg-[var(--background-light-invert-color)] text-sm text-heading-invert font-bold p-1 rounded-md
                      "
                    >
                      {itm.priority}
                    </div>
                  </div>
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