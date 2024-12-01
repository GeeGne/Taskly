// HOOKS
import { useRef, useEffect } from 'react';

type Props = {
  title?: string,
  description?: string,
  percantageText?: string,
  percantage?: number
}

export default function CircularProgressBox ({ 
  percantageText = '-- / --',
  title="no title", 
  description = "no description",
  percantage = 50
}: Props) {

  const circularProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circularProgressRef.current) 
      circularProgressRef.current.style.setProperty('--circular-progress', String(percantage));
  }, [percantage]);

  return (
    <div     
      className="flex flex-col items-center gap-4 w-[12rem]"     
    >
      <div
        className="relative"
      >
        <div
          className="circular-progress"
          ref={circularProgressRef}
        />             
        <span
            className="
              absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] 
              text-xl text-body font-bold
            "
          >
            {percantageText}
        </span>
      </div>
      <h3
        className="text-sm font-bold text-heading"
      >
        {title}
      </h3>
      <h4
        className="text-xs font-think italic text-body-light"
      >
        "{description}"
      </h4>
    </div>
  )
}