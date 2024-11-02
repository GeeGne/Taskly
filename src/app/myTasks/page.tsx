"use client"
// HOOKS
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';
import addTask from '@/api/addTask';
import deleteTask from '@/api/deleteTask';

export default function Tasks () {
  const imitateTasks = [1, 2, 3, 4, 5];
  const [ addActivityBtn, setAddActivityBtn ] = useState<boolean>(false);
  const [ deleteActivityBtn, setDeleteActivityBtn ] = useState<any>({ activity: false, taskId: ''})
  const [ newTask, setNewTask ] = useState('');
  const addTaskInpRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser
  })

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
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
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
    const { type, task, taskId } = e.currentTarget.dataset;
    switch (type) {
      case "add_button_is_clicked":
        if (newTask === '') return;
        addTaskMutation.mutate(newTask);
        break;
      case "delete_task_button_is_clicked":
        deleteTaskMutation.mutate(taskId);
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
    <>
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
            : tasks?.map((itm, i) => 
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
    </>
  )
}