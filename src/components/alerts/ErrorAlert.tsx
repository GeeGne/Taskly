// HOOKS
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import XSvg from '@/components/svgs/XSvg';

// STORES
import { useErrorAlertStore } from '@/store/index';

export default function ErrorAlert ({ currentLanguage = 'en' }: { currentLanguage?: string } ) {
  const isEn = currentLanguage === 'en'
  const { errorAlert, errorText } = useErrorAlertStore();
  const [ mount, setMount ] = useState(false);
  const errorAlertRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mount) return setMount(true);

    errorAlertRef.current?.classList.remove('--errorAlert-ani', 'invisible');
    setTimeout(() => errorAlertRef.current?.classList.add('--errorAlert-ani') , 10);
  }, [errorAlert]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.add('invisible');
  }
  
  return (
    <button
      className="
        fixed invisible flex items-center gap-2
        top-[5rem] left-[50%] translate-x-[-50%]
        p-2 bg-red-500 rounded-xl cursor-pointer
        font-bold text-[hsl(0,0%,90%)] text-sm z-[200]
        transition-all duraiton-300 ease-out
        hover:bg-red-600
      "
      onClick={handleClick}
      ref={errorAlertRef}
    >
      <span>
        {errorText}
      </span>
      <XSvg 
        className="shrink-0 text-[hsl(0,0,90%)] bg-[hsl(0,0,20%)] rounded-[100%]"
      />
    </button>
  )
}