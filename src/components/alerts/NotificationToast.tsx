"use Client"

//HOOKS
import { useEffect, useRef, useState } from 'react'

// STORES
import { useNotificationToastStore } from '@/store/index';

export default function NotificationToast ({ currentLanguage = 'en' }: { currentLanguage?: string }) {
  const isEn = currentLanguage === 'en';
  const { notificationToast, notificationText } = useNotificationToastStore();
  const [ mount, setMount ] = useState(false);
  const notificationToastRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mount) return setMount(true);

    notificationToastRef.current?.classList.remove('--notificationToast-ani', 'invisible');
    setTimeout(() => notificationToastRef.current?.classList.add('--notificationToast-ani'), 10);
  }, [notificationToast]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'toast_button_is_clicked':
        e.currentTarget.classList.add('invisible');
        break;
      default:
        console.error('Unknwon type: ', type);
    }
  }

  return (
    <button
      className="
      fixed invisible bottom-[3rem] left-[3rem]   
      p-2 bg-[var(--background-light-invert-color)] rounded-xl cursor-pointer 
      font-bold text-heading-invert text-sm z-[200] 
      transition-all duraiton-300 ease-out
      hover:bg-[var(--background-invert-color)]
      "
      data-type="toast_button_is_clicked"
      onClick={handleClick}
      ref={notificationToastRef}
    >
      <span>{ notificationText }</span>{' '}
      <span className="text-secondary">{isEn ? 'Close' : 'الغاء'}</span>
    </button>
  )
}