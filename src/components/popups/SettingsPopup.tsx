// COMPONENTS
import ThemeSwitch from '@/components/switches/ThemeSwitch';
import LanguageSwitch from '@/components/switches/LanguageSwitch';
import ControllerSwitch from '@/components/switches/ControllerSwitch';

// STORE
import { useSettingsPopupStore, useControllersStore } from '@/store/index';

export default function SettingsPopup ({ currentLanguage }: { currentLanguage: string }) {
  const isEn = currentLanguage === 'en';
  
  const setSettingsPopup = useSettingsPopupStore(status => status.setSettingsPopup);
  const settingsPopup = useSettingsPopupStore(status => status.settingsPopup);
  const { backgroundConfettiToggle, setBackgroundConfettiToggle } = useControllersStore();
  const { taskCompleteCelebrateConfettiToggle, setTaskCompleteCelebrateConfettiToggle } = useControllersStore();

  const  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setSettingsPopup(false)
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
        ${settingsPopup ? 'visible opacity-100 backdrop-blur-[2px]' : 'invisible opacity-0 backdrop-blur-[0]'}
      `}
    >
      <div
        className={`
          flex flex-col items-center bg-[--background-color] rounded-xl overflow-hidden shaddow-2xl
          transition-all duration-[0.5s] ease-[var(--bounce-bezier)]
          ${settingsPopup ? 'scale-[100%] w-[300px]' : 'scale-[70%] w-[200px]'}
        `}
      >
        <h2
          className="py-1 font-bold text-md text-body"
        >
          {isEn ? 'General Settings' : 'الاعدادت العامه'}
        </h2>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <ul
          className="flex flex-col gap-4 w-[100%] py-4 px-4"
        >
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs text-heading font-bold"
            >
              {isEn ? 'Current Theme' : 'الوضع الحالي'}
            </span>
            <ThemeSwitch />
          </li>
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs text-heading font-bold"
            >
              {isEn ? 'Current language' : 'اللغه الحاليه'}
            </span>
            <LanguageSwitch />
          </li>
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs max-w-[11rem] text-heading font-bold"
            >
              {isEn 
                ? 'Display Celebration Confetti When Task is Completed'
                : 'عرض فقاقيع الاحتفال عند انجاز المهمه'
              }
            </span>
            <ControllerSwitch className="shrink-0" toggle={taskCompleteCelebrateConfettiToggle} setToggle={setTaskCompleteCelebrateConfettiToggle} />
          </li>
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs text-heading font-bold"
            >
              {isEn ? 'Background Confetti' : 'التاثيرات الخلفيه'}
            </span>
            <ControllerSwitch toggle={backgroundConfettiToggle} setToggle={setBackgroundConfettiToggle} />
          </li>
        </ul>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <div
          className="
            relative flex flex-grow w-[100%] justify-around
          "
        >
          <button
            className="
              flex-grow w-[50%] py-1 text-sm text-body font-bold  
              hover:bg-[var(--background-light-color)]
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            {isEn ? 'close' : 'الغاء'}
          </button>
        </div>
      </div>
    </div>
  )
}