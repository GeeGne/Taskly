// HOOKS
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import XSvg from '@/components/svgs/XSvg';

// STORES
import { useErrorAlertStore } from '@/store/index';

export default function ErrorAlert () {
  
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
        font-bold text-heading-invert text-sm z-[200]
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
        className="p2 bg-[var(--background-deep-light-invert-color)] rounded-[100%]"
        color="var(--font-heading-invert-color)" 
      />
    </button>
  )
}