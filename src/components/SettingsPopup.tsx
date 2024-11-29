// COMPONENTS
import ThemeSwitch from '@/components/ThemeSwitch';
import ControllerSwitch from '@/components/ControllerSwitch';

// STORE
import { useSettingsPopupStore, useControllersStore } from '@/store/index';

export default function SettingsPopup () {
  
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
          General Settings
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
              Current Theme
            </span>
            <ThemeSwitch />
          </li>
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs max-w-[11rem] text-heading font-bold"
            >
              Display Celebration Confetti When Task is Completed
            </span>
            <ControllerSwitch className="shrink-0" toggle={taskCompleteCelebrateConfettiToggle} setToggle={setTaskCompleteCelebrateConfettiToggle} />
          </li>
          <li
            className="flex justify-between items-center"
          >
            <span
              className="text-xs text-heading font-bold"
            >
              Background Confetti
            </span>
            <ControllerSwitch toggle={backgroundConfettiToggle} setToggle={setBackgroundConfettiToggle} />
          </li>
        </ul>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <div
          className="
            relative flex flex-grow w-[100%] justify-around
            before:content[''] before:absolute before:top-[50%] before:left-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:h-[80%] before:w-[1px] before:bg-[var(--background-deep-color)]
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
            cancel
          </button>
          <button
            className="
              flex-grow w-[50%] py-1 text-sm text-body font-bold 
              hover:bg-secondary
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            save
          </button>
        </div>
      </div>
    </div>
  )
}