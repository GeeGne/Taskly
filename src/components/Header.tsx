// COMPONENTS
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';
import ArrowBarRightSvg from '@/components/svgs/ArrowBarRightSvg';

// STORES
import { useSideBarStore, useCurrentTabStore } from '@/store/index';

export default function Header ({ tab, currentLanguage = 'en' }: { tab?: string; currentLanguage?: string ;}) {
  const isEn = currentLanguage === 'en';
  const { toggle, setToggle } = useSideBarStore();
  const { currentTab } = useCurrentTabStore();

  const handleCurrentTab = () => {
    switch (currentTab) {
      case 'myTasks':
        return 'My Tasks';
      default:
        console.error('Unknown Tab: ', currentTab);
        return '--';
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'toggle_sideBar_button_is_clicked':
        setToggle(!toggle);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <nav
      className="flex flex-row items-center gap-2"
    >
      <button
        data-type="toggle_sideBar_button_is_clicked"
        onClick={handleClick}
      >
        {toggle 
          ? <ArrowBarLeftSvg className={isEn ? 'rotate-0' : 'rotate-180'} color="var(--font-heading-color)" width="1.5em" height="1.5em" /> 
          : <ArrowBarRightSvg className={isEn ? 'rotate-0' : 'rotate-180'} color="var(--font-heading-color)" width="1.5em" height="1.5em" />
        }
      </button>
      <h1
        className="text-heading font-bold text-lg"
      >
        { tab }
      </h1>
    </nav>
  )
}