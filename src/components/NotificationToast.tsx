"use Client"

//HOOKS
import { useEffect, useRef, useState } from 'react'

// STORES
import { useNotificationToastStore } from '@/store/index';

export default function NotificationToast () {
  
  const { notificationToast, notificationText } = useNotificationToastStore();
  const [ mount, setMount ] = useState(false);
  const notificationToastRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mount) return setMount(true);

    notificationToastRef.current?.classList.remove('--notificationToast-ani', 'invisible');
    setTimeout(() => notificationToastRef.current?.classList.add('--notificationToast-ani'), 10);
  }, [notificationToast]);

  return (
    <button
      className="
      fixed invisible bottom-[3rem] left-[3rem]   
      p-2 bg-[var(--background-light-invert-color)] rounded-xl cursor-pointer 
      font-bold text-heading-invert text-sm z-[200] 
      transition-all duraiton-300 ease-out
      hover:bg-[var(--background-invert-color)]
      "
      ref={notificationToastRef}
    >
      <span>{ notificationText }</span>
      <span className="text-secondary"> Undo</span>
    </button>
  )
}