// COMPONENTS
import ThemeSwitch from '@/components/switches/ThemeSwitch';
import PriorityHighRoundedSvg from '@/components/svgs/PriorityHighRoundedSvg';

// STORE
import { usePriorityPopupStore, useTaskInputStore } from '@/store/index';

export default function PriorityPopup ({ currentLanguage }: { currentLanguage: string }) {
  const isEn = currentLanguage === 'en';
  
  const setPriorityPopup = usePriorityPopupStore(status => status.setPriorityPopup);
  const priorityPopup = usePriorityPopupStore(status => status.priorityPopup);
  const setPriorityKey = usePriorityPopupStore(status => status.setPriorityKey);
  const { setFocus } = useTaskInputStore();

  const  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, priority } = e.currentTarget.dataset;

    switch (type) {
      case 'none_button_is_clicked':
      case 'normal_button_is_clicked':
      case 'important_button_is_clicked':
      case 'critical_button_is_clicked':
        setPriorityPopup(false);
        setPriorityKey(priority);
        setFocus(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 w-[100vw] h-[100vh]
        flex items-center 
        justify-center bg-[--shade-color] backdrop-blur-[2px] z-[200]
        transition-all duraiton-300 ease-in
        ${priorityPopup ? 'visible opacity-100 backdrop-blur-[2px]' : 'invisible opacity-0 backdrop-blur-[0]'}
      `}
    >
      <div
        className={`
          flex flex-col items-center bg-[--background-color] rounded-xl overflow-hidden shaddow-2xl
          transition-all duration-[0.5s] ease-[var(--bounce-bezier)]
          ${priorityPopup ? 'scale-[100%] w-[250px]' : 'scale-[70%] w-[200px]'}
        `}
      >
        <h2
          className="py-1 font-bold text-md text-body"
        >
          {isEn ? 'Set Priority' : 'اختر الاهميه'}
        </h2>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <div
          className="flex justify-between items-center w-[100%] py-2 px-4"
        >
          <button
            className="
              flex flex-col items-center p-1 hover:bg-[var(--background-light-color)] rounded-md
              transition-color ease-out duration-200
            "
            data-priority="none"
            data-type="none_button_is_clicked"
            onClick={handleClick}
          >
            <PriorityHighRoundedSvg className="" width="1.5em" height="1.5em" color="var(--none-priority-color)"/>
            <span
              className="text-xs font-bold text-[var(--none-priority-color)]"
            >
              {isEn ? 'none' : 'عادي'}
            </span>
          </button>
          <button
            className="
              flex flex-col items-center p-1 hover:bg-[var(--background-light-color)] rounded-md
              transition-color ease-out duration-200
            "
            data-priority="normal"
            data-type="normal_button_is_clicked"
            onClick={handleClick}
          >
            <PriorityHighRoundedSvg className="" width="1.5em" height="1.5em" color="var(--normal-priority-color)"/>
            <span
              className="text-xs font-bold text-[var(--normal-priority-color)]"
            >
              {isEn ? 'normal' : 'متوسط'}
            </span>
          </button>
          <button
            className="
              flex flex-col items-center p-1 hover:bg-[var(--background-light-color)] rounded-md
              transition-color ease-out duration-200
            "
            data-priority="important"
            data-type="important_button_is_clicked"
            onClick={handleClick}
          >
            <PriorityHighRoundedSvg className="" width="1.5em" height="1.5em" color="var(--important-priority-color)"/>
            <span
              className="text-xs font-bold text-[var(--important-priority-color)]"
            >
              {isEn ? 'important' : 'مهم'}
            </span>
          </button>
          <button
            className="
              flex flex-col items-center p-1 hover:bg-[var(--background-light-color)] rounded-md
              transition-color ease-out duration-200
            "
            data-priority="critical"
            data-type="critical_button_is_clicked"
            onClick={handleClick}
          >
            <PriorityHighRoundedSvg className="" width="1.5em" height="1.5em" color="var(--critical-priority-color)"/>
            <span
              className="text-xs font-bold text-[var(--critical-priority-color)]"
            >
              {isEn ? 'critical' : 'غايه الاهميه'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}