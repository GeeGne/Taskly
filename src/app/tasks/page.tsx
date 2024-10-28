"use client"
import React, { useState, useRef, useEffect } from 'react';


export default function Tasks () {
  const [ tasks, setTasks ] = useState([]);
  const [ newTask, setNewTask ] = useState('');
  const addTaskInpRef = useRef(null);

  const handleChange = e => {
    const { value } = e.currentTarget;
    setNewTask(value);
  }

  const handleClick = e => {
    const { type, task } = e.currentTarget.dataset ;

    switch (type) {
      case "add_button_is_clicked":
        if (newTask === '') return;

        setTasks(list => [newTask, ...list]);
        addTaskInpRef.current.value = '';
        setNewTask('');
        break;
      case "delete_task_button_is_clicked":
        setTasks(list => list.filter(item => item !== task))
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <div
      className="flex flex-col w-[calc(100%-2rem)] md:w-[750px] my-auto mx-auto bg-secondary items-center rounded-lg pb-4 mx-4 md:mx-auto"
    >
      <h1
        className="font-bold text-heading text-3xl py-8"
      >
        Your Tasks
      </h1>
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
        ADD
      </button>
      <ul
        className="w-[100%] flex flex-col"
      >
        {tasks.map((itm, i) => 
          <li
            className={`flex items-center text-body w-[100%] py-2 px-4 ${i % 2 === 0 ? 'bg-[hsl(0,0%,75%)]' : 'bg-secondary'}`}
            key={i}
          >
            <span>
              {itm}
            </span>
            <button 
              className="ml-auto bg-primary p-2 text-heading-invert font-bold drop-shadow-xl rounded-md hover:opacity-70"
              data-type="delete_task_button_is_clicked"
              data-task={itm}
              onClick={handleClick}
            >
              X
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}