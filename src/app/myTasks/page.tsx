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
import Header from '@/components/Header';
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
import { useSideBarStore } from '@/store/index.js';

export default function Tasks () {

  const queryClient = useQueryClient();
  const router = useRouter();
  const imitateTasks = [1, 2, 3, 4, 5];

  
  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  }
  const [ newTask, setNewTask ] = useState('');
  const [ isFocus, setIsFocus ] = useState(false);
  const [ addTaskActivityBtn, setAddTaskActivityBtn ] = useState<boolean>(false);
  const [ deleteTaskActivityBtn, setDeleteTaskActivityBtn ] = useState<DeleteActivityBtn>({ activity: true, taskId: '1'})

  const { toggle, setToggle } = useSideBarStore();

  const addTaskInpRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

  useEffect(() => {
    if (isLoading && !user) return;

    const redirect = new Redirector(router)
    redirect.home(user);
  }, [user])

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

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
    }
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNewTask(value);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, taskId } = e.currentTarget.dataset;
    switch (type) {
      case "add_button_is_clicked":
        setIsFocus(true);
        if (newTask === '') return;
        addTaskMutation.mutate(newTask);
        break;
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

  const handleWelcomeTag = (text: string) => {
    if (isLoading) {
      return 'Loading...';
    }

    return text;
  }

  const handleAddBtn = (text: string) => {
    if (addTaskActivityBtn) return (
       <>
         <span className="opacity-0">{text}</span>
         <TripleBarActivity />
       </>
    ); 

    return <span>{text}</span>;
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
  }
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
  }

  // console.log('user: ', user);

  return (
    <div
      className="flex flex-col h-[100%] px-4 py-2 gap-4 bg-[var(--background-color)]"
    >
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
            : tasks?.map((itm:any, i) => 
                <li
                  className="relative group flex flex-row before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-[0] before:h-[1px] before:w-[100%] before:bg-[var(--background-light-color)]"
                  key={i}
                >
                  <input 
                    id="task3"
                    type="checkbox"
                    className="opacity-0"
                  />
                  <label
                    htmlFor="task3"
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
    </div>
  )
}

/* <div
      className="px-4"
    >
      <h1
        className="flex font-bold text-3xl text-primary width-[100%] justify-center py-8 drop-shadow-md"
      >
        {handleWelcomeTag(`Welcome ${user?.user_metadata.full_name} ✨`)}
      </h1>
      <div
        className="flex flex-col w-[calc(100%-2rem)] md:w-[750px] my-auto mx-auto bg-secondary items-center rounded-lg pb-4 mx-4 md:mx-auto drop-shadow-md"
      >
        <h2
          className="font-bold text-heading text-3xl py-8"
        >
          Your Tasks 📒
        </h2>
        <input 
          className="py-2 px-4 rounded-md w-[calc(100%-2rem)]"
          placeholder="What's on your mind?.."
          onChange={handleChange}
          ref={addTaskInpRef}
        />
        <button
          className="py-2 my-4 bg-primary w-[calc(100%-2rem)] rounded-md text-heading-invert font-semibold text-lg hover:opacity-70"
          onClick={handleClick}
          data-type="add_button_is_clicked"
        >
          {handleAddBtn('ADD')}
        </button>
        <ul
          className="w-[100%] flex flex-col"
        >
          {isTasksLoading
            ? imitateTasks.map((itm, i) =>
              <li
              className={`--flirk flex items-center text-body w-[100%] py-2 px-4 ${i % 2 === 0 ? 'bg-[hsl(0,0%,75%)]' : 'bg-[hsl(0,0%,95%)]'}`}
              key={i}
              >
                <span
                  className="bg-[hsl(0,0%,55%)] rounded-md text-[hsla(0,0%,0%,0)]"
                >
                  this is a long text pretending to be a task.
                </span>
                <button 
                  className="ml-auto bg-[hsl(0,0%,55%)] text-[hsla(0,0%,0%,0)] p-2 font-bold drop-shadow-xl rounded-md hover:opacity-70"
                >
                  X
                </button>
              </li>
            )
            // : tasks?.map((itm: { id: string, title: string }, i: number) => 
            : tasks?.map((itm: any, i) => 
              <li
                className={`flex items-center text-body w-[100%] py-2 px-4 ${i % 2 === 0 ? 'bg-[hsl(0,0%,75%)]' : 'bg-secondary'}`}
                key={i}
              >
                <span>
                  {itm.title}
                </span>
                <button 
                  className="ml-auto bg-primary p-2 text-heading-invert font-bold drop-shadow-xl rounded-md hover:opacity-70"
                  data-type="delete_task_button_is_clicked"
                  data-task={itm.title}
                  data-task-id={itm.id}
                  onClick={handleClick}
                >
                  {handleDeleteBtn('X', String(itm.id))}
                </button>
              </li>
            )
          }
        </ul>
      </div>
    </div> */