// HOOKS
import { useBackgroundActivityStore } from '@/store/index';
import SpinnersBlocksShuffleSvg from '@/components/svgs/SpinnersBlocksShuffleSvg'


export default function BackgroundActivity () {
  const backgroundActivityToggle = useBackgroundActivityStore(status => status.backgroundActivityToggle);
  
  return (
    <div
      className={`
        fixed top-0 left-0 w-[100vw] h-[100vh] 
        bg-[var(--shade-color)] backdrop-blur-[3px] z-[1000]
        transition-all duration-300 ease-out
        ${backgroundActivityToggle ? 'visible opacity-100' : 'invisible opacity-0'}
      `}
    >
      <SpinnersBlocksShuffleSvg 
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        width="4rem"                  
        height="4rem"
        color="var(--font-heading-color)"      
      />
    </div>
  )
}