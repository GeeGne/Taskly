"use client"

// NEXT
import Image from 'next/image';

// COMPONENTS
import TripleBarActivity from '@/components/TripleBarActivity';
import SpinnersRingSvg from '@/components/svgs/SpinnersRingSvg';
import SpinnersBlocksSvg from '@/components/svgs/SpinnersBlocksSvg';

export default function LoadingScreen ({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${className} fixed flex gap-2 items-center justify-center top-0 left-0 w-[100vw] h-[100vh] bg-[var(--background-light-color)] z-[1000] transition-all duration-[0.5s] ease-in`}
    >
      <div
        className="absolute flex w-[1000px] justify-center items-center"
      >
        <Image
          className="invert-[100%]" 
          alt="logo"
          src="/assets/taskly-logo-2.svg"
          width="700"
          height="700"
        />
        <div
          className="absolute z-[-1] center top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
        >
          <SpinnersBlocksSvg width="15rem" height="15rem" color='#16432C' />
        </div>
      </div>
    </div>
  )
}

// className={`${className} fixed top-0 left-0 w-[100vw] h-[100vh] bg-[var(--background-light-color)] z-[1000] transition-all duration-[0.5s] ease-in`}
