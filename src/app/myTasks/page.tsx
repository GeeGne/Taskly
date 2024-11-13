"use client"
// HOOKS
import { useState, useEffect, useRef } from 'react';
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
import BoxArrowRightSvg from '@/components/svgs/BoxArrowRightSvg';
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';
import ArrowBarRightSvg from '@/components/svgs/ArrowBarRightSvg';
import CheckLgSvg from '@/components/svgs/CheckLgSvg';
import CheckSvg from '@/components/svgs/CheckSvg';

export default function Tasks () {

  const queryClient = useQueryClient();
  const router = useRouter();
  const imitateTasks = [1, 2, 3, 4, 5];

  const [ addActivityBtn, setAddActivityBtn ] = useState<boolean>(false);

  type DeleteActivityBtn = {
    activity: boolean,
    taskId?: string
  }
  const [ deleteActivityBtn, setDeleteActivityBtn ] = useState<DeleteActivityBtn>({ activity: false, taskId: ''})
  const [ newTask, setNewTask ] = useState('');

  const addTaskInpRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

  useEffect(() => {
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
      setAddActivityBtn(true);
    },
    onSettled: () => {
      setAddActivityBtn(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: (taskId) => {
      setDeleteActivityBtn({ activity: true, taskId });
    },
    onSettled: () => {
      setDeleteActivityBtn({ activity: false });
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
        if (newTask === '') return;
        addTaskMutation.mutate(newTask);
        break;
      case "delete_task_button_is_clicked":
        if (taskId) deleteTaskMutation.mutate(taskId);
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
    if (addActivityBtn) return 'ADDING...';

    return text;
  }

  const handleDeleteBtn = (text: string, taskId: string) => {
    if (deleteActivityBtn.activity && deleteActivityBtn.taskId === taskId) return '...';

    return text;
  }

  // console.log('user: ', user);

  return (
    <div
      className="flex flex-col px-4 py-2 gap-4"
    >
      <nav
        className="flex flex-row items-center gap-2"
      >
        <button>
          <ArrowBarLeftSvg color="var(--font-heading-color)" width="1.5em" height="1.5em" />
        </button>
        <h1
          className="text-heading font-bold text-lg"
        >
          My Tasks
        </h1>
      </nav>
      <section
        className="flex flex-col border-solid border-[var(--background-deep-color)] border-2 p-2 rounded-2xl gap-2"
      >
        <input placeholder="What's on your mind?" />
        <div
          className="flex gap-4 ml-[auto]"
        >
          <button
            className="text-sm text-body-invert font-bold bg-[var(--background-light-invert-color)] p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            className="text-sm text-body-invert font-bold bg-primary p-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </section>
      <section>
        <ul
          className="flex flex-col gap-4"
        >
          <li
            className=""
          >
            <input 
              id="task3"
              type="checkbox"
              className="opacity-0"
            />
            <label
              htmlFor="task3"
              className="relative group px-2 text-md text-body z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]"
            >
              <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
              Wash the Dishes.
            </label>
            <hr
              className="h-[1px] bg-[var(--background-light-color)]"
            />
          </li>
          <li
            className=""
          >
            <input 
              id="task3"
              type="checkbox"
              className="opacity-0"
            />
            <label
              htmlFor="task3"
              className="relative group px-2 text-md text-body z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]"
            >
              <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
              Wash the Dishes.
            </label>
            <hr
              className="h-[1px] bg-[var(--background-light-color)]"
            />
          </li>
          <li
            className=""
          >
            <input 
              id="task3"
              type="checkbox"
              className="opacity-0"
            />
            <label
              htmlFor="task3"
              className="relative group px-2 text-md text-body z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]"
            >
              <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
              Wash the Dishes.
            </label>
            <hr
              className="h-[1px] bg-[var(--background-light-color)]"
            />
          </li>
          <li
            className=""
          >
            <input 
              id="task3"
              type="checkbox"
              className="opacity-0"
            />
            <label
              htmlFor="task3"
              className="relative group px-2 text-md text-body z-[5] hover:cursor-pointer before:content-[''] before:absolute before:top-[50%] before:left-[-1rem] before:translate-y-[-50%] before:w-4 before:h-4 before:bg-[var(--background-light-color)] before:rounded-[100%] before:border-solid before:border-[1px] before:border-[var(--background-deep-color)] before:z-[10]"
            >
              <CheckSvg className="absolute top-[50%] left-[-1rem] translate-y-[-50%] opacity-0 group-hover:opacity-100 z-[15]" width="1rem" height="1rem" color="var(--font-light-color)" />
              Wash the Dishes.
            </label>
            <hr
              className="h-[1px] bg-[var(--background-light-color)]"
            />
          </li>

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