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
import PriorityPopup from '@/components/PriorityPopup';
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
    useTaskInputStore, usePriorityPopupStore 
  } from '@/store/index.js';

export default function TaskInput () {

  const queryClient = useQueryClient();

  const [ newTask, setNewTask ] = useState('');
  // const [ focus, setFocus ] = useState(true);
  const [ addTaskActivityBtn, setAddTaskActivityBtn ] = useState<boolean>(false);
  
  const { toggle, setToggle } = useSideBarStore();
  const { setPriorityPopup, priorityKey, setPriorityKey } = usePriorityPopupStore();
  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { focus, setFocus } = useTaskInputStore();

  const addTaskInpRef = useRef<HTMLInputElement>(null);

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
      setFocus(false);
      if (addTaskInpRef.current) addTaskInpRef.current.value = ''
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNotificationText('New Task is Added');
      setNotificationToast(Date.now());
      setPriorityKey(null);
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
        addTaskMutation.mutate({newTask, priorityKey});
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

  return (
    <section>
      <PriorityPopup />
      <label
        className={`
          flex flex-col border-solid border-2 p-2 rounded-2xl gap-2 transition-all duration-150 ease-out
          ${focus ? `border-[var(--background-deep-light-color)]` : `border-[var(--background-color)]`}
        `}
        htmlFor="addTask"
      >
        <input 
          className="peer task-input text-body outline-none bg-[var(--background-color)] px-2 text-md text-body"
          placeholder="What's on your mind?" 
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
            <span>
              Priority
            </span>
            <XSvg className="
              border-solid rotate-[45deg] border-body group-hover:border-heading border-[1px] rounded-[2rem] ml-2
            " 
            color="var(--font-body-color)" />
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
                className={`text-xs text-[${getPriorityColor()}] font-bold`}
              >
                {priorityKey}
              </span>
              <XSvg className="border-solid border-body-extra-light group-hover:border-heading border-[1px] rounded-sm ml-2" color="var(--font-body-color)" />
            </button>
          }
          {/* <button
            className="text-xs text-body-invert font-bold ml-auto px-2 py-2 bg-[var(--background-light-invert-color)] rounded-md"
          >
            Cancel
          </button> */}
          <button
            className="ml-auto btn-a m-0 grow-0 px-2 py-2 text-xs"
            data-type="add_button_is_clicked"
            onClick={handleClick}
          >
            {handleAddBtn('Add Task')}
          </button>
        </div>
      </label>
    </section>
  )
}
