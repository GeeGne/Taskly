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
import PriorityPopup from '@/components/popups/PriorityPopup';
import PriorityHighRoundedSvg from '@/components/svgs/PriorityHighRoundedSvg';
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
import { 
  useSideBarStore, useNotificationToastStore,
  useTaskInputStore, usePriorityPopupStore,
  useTodayLabelStore
} from '@/store/index.js';

type TaskInput = {
  bucket_id?: number | null ;
  currentLanguage?: string
}

export default function TaskInput ({ currentLanguage = 'en', bucket_id = null }: TaskInput) {

  const queryClient = useQueryClient();
  const isEn = currentLanguage === 'en';
  
  const [ newTask, setNewTask ] = useState('');
  const [ addTaskActivityBtn, setAddTaskActivityBtn ] = useState<boolean>(false);
  
  const { toggle, setToggle } = useSideBarStore();
  const { setPriorityPopup, priorityKey, setPriorityKey } = usePriorityPopupStore();
  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { focus, setFocus } = useTaskInputStore();
  const { todayLabelToggle, setTodayLabelToggle } = useTodayLabelStore();

  const addTaskInpRef = useRef<HTMLInputElement>(null);

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onMutate: () => {
      setAddTaskActivityBtn(true);
    },
    onSettled: () => {
      setAddTaskActivityBtn(false);
      setFocus(false);
      if (addTaskInpRef.current) addTaskInpRef.current.value = ''
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNotificationText('New Task is Added');
      setNotificationToast(Date.now());
      setPriorityKey(null);
      setTodayLabelToggle(false);
    }
  });

  const getPriorityColor = () => {
    switch (priorityKey) {
      case 'none':
        return 'var(--none-priority-color)';
      case 'normal':
        return 'var(--normal-priority-color)';
      case 'important':
        return 'var(--important-priority-color)';
      case 'critical':
        return 'var(--critical-priority-color)';
      default:
        console.error('Unknown Key: ', priorityKey);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNewTask(value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, taskId } = e.currentTarget.dataset;
    switch (type) {
      case "add_button_is_clicked":
        setFocus(true);
        if (newTask === '') return;
        const for_today = todayLabelToggle;
        addTaskMutation.mutate({newTask, priorityKey, bucket_id, for_today});
        break;
      case 'toggle_sideBar_button_is_clicked':
        setToggle(!toggle)
        break;
      case 'priority_button_is_clicked':
        setPriorityPopup(true);
        break;
      case 'priorityKey_button_is_clicked':
        setPriorityKey(null);
        break;
      case 'forToday_button_is_clicked':
        setTodayLabelToggle(!todayLabelToggle);
        setFocus(true);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
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

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'addTask':
        setFocus(true);
        break;
      default:
        console.error('Unknown Name: ', name);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'addTask':
        setFocus(false);
        break;
      default:
        console.error('Unknown Name: ', name);
    }
  };

  // DEBUG
  // const [ focus, setFocus ] = useState(true);
  // const toggle = true;
  // const focus = true;
  // const todayLabelToggle = true;

  return (
    <section>
      <label
        className={`
          flex flex-col border-solid border-2 p-2 rounded-2xl gap-2 transition-all duration-150 ease-out
          ${focus ? `border-[var(--background-deep-light-color)]` : `border-[var(--background-color)]`}
        `}
        htmlFor="addTask"
      >
        <input 
          className="peer task-input text-body outline-none bg-[var(--background-color)] px-2 text-md text-body"
          placeholder={isEn ? "What's on your mind?": "ايا افكار ببالك؟"} 
          id="addTask"
          name="addTask"
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={addTaskInpRef}
        />
        <hr/>
        <div
          className={`
            flex gap-4 opacity-0 peer-focus:opacity-100 transition-all duration-150 ease-out
            ${focus ? `opacity-100` : `opacity-0`}
          `}
        >
          <button
            className="
              flex items-center text-xs text-body-light hover:text-heading font-bold 
              px-2 rounded-md cursor-pointer
              border-solid border-body-light hover:border-heading border-[1px]
            "
            data-type="priority_button_is_clicked"
            onClick={handleClick}
          >
            <PriorityHighRoundedSvg color="var(--font-body-color)" />
            <span className="px-1">
              {isEn ? 'Priority' : 'الاهميه'}
            </span>
            <XSvg className="
              border-solid rotate-[45deg] border-body group-hover:border-heading border-[1px] rounded-[2rem] 
            " 
            color="var(--font-body-color)" />
          </button>
          <button
            className={`
              relative flex items-center text-xs hover:text-heading font-bold 
              border-solid border-body-light border-[1px] px-2 rounded-md cursor-pointer
              hover:border-heading overflow-hidden
              ${todayLabelToggle ? 'bg-transparent text-heading border-transparent' : 'bg-transparent text-body-light border-body-light'}
            `}
            data-type="forToday_button_is_clicked"
            onClick={handleClick}
          >
            <div 
              className={`
                absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                bg-[var(--today-label-color)] z-[1] rounded-[2em]
                ${todayLabelToggle ? '--fill-center' : '--fill-center-invert'}
              `}
            />
            <span
              className="z-[2]"
            >
              @
            </span>
            <span className="px-1 z-[2]">
              {isEn ? 'Today' : 'لليوم'}
            </span>
            {todayLabelToggle 
              ? <CheckSvg 
                  className={`
                  text-heading-invert bg-green-600 dark:bg-green-400  group-hover:border-heading rounded-[2rem] shadow-md z-[2]
                    --scale delay-04s
                  `} 
                />
              : <XSvg 
                  className="
                    text-body border-solid rotate-[45deg] border-body group-hover:border-heading border-[1px] rounded-[2rem] 
                  " 
                />
            }
          </button>
          { priorityKey &&
            <button
              className="
                group flex items-center bg-[var(--background-light-color)] px-1 cursor-pointer
              "
              data-type="priorityKey_button_is_clicked"
              onClick={handleClick}
            >
              <PriorityHighRoundedSvg color={getPriorityColor()} />
              <span
                className={`text-xs text-[${getPriorityColor()}] font-bold px-1`}
              >
                {priorityKey}
              </span>
              <XSvg className="border-solid border-body-extra-light group-hover:border-heading border-[1px] rounded-sm" color="var(--font-body-color)" />
            </button>
          }
          {/* <button
            className="text-xs text-body-invert font-bold ml-auto px-2 py-2 bg-[var(--background-light-invert-color)] rounded-md"
          >
            Cancel
          </button> */}
          <button
            className={`${isEn ? 'ml-auto' : 'mr-auto'} btn-a m-0 grow-0 px-2 py-2 text-xs`}
            data-type="add_button_is_clicked"
            onClick={handleClick}
          >
            {handleAddBtn(`${isEn ? 'Add Task' : 'اضف المهمه'}`)}
          </button>
        </div>
      </label>
    </section>
  )
}
