import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

// API
import signOut from '@/api/signOut';
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import getTasks from '@/api/getTasks';
import getBuckets from '@/api/getBuckets';

// UTILS
import Redirector from '@/utils/Redirector';

// COMPONENTS
import SettingsPopup from '@/components/SettingsPopup';
import AddBucketPopup from '@/components/AddBucketPopup';
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import GearWideConnectedSvg from '@/components/svgs/GearWideConnectedSvg';
import InfoCircleSvg from '@/components/svgs/InfoCircleSvg';
import SunFillSvg from '@/components/svgs/SunFillSvg';
import ListTaskSvg from '@/components/svgs/ListTaskSvg';
import CalendarSvg from '@/components/svgs/CalendarSvg';
import InboxSvg from '@/components/svgs/InboxSvg';
import PlusSvg from '@/components/svgs/PlusSvg';
import BoxArrowRightSvg from '@/components/svgs/BoxArrowRightSvg';
import ArrowBarLeftSvg from '@/components/svgs/ArrowBarLeftSvg';

// STORES
import { 
  useSideBarStore, useCurrentTabStore,
  useSettingsPopupStore, useAddBucketPopupStore 
} from '@/store/index.js';

export default function DisplayBuckets ({buckets, tasks, isLoading}: any) {

  const currentTab = useCurrentTabStore(status => status.currentTab);
  console.log(currentTab);

  return (
    <ul
      className="flex flex-col gap-1" 
    >
      { buckets?.map((itm: any, i: number) => 
          <li
            key={itm.id}
            className="p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="bucketList_button_is_clicked"
            data-bucket-name={itm.name}
          > 
            <Link 
              className={`
                flex items-center gap-2 text-sm text-left
                ${currentTab === (itm.name) ? 'text-primary font-bold' : 'text-body-light font-normal'}
              `}
              href={`/bucket/${itm.name}`}
            >
              <span>
                {itm.emoji}
              </span>
              <span>
                {itm.name}
              </span>
              <span
                className={`
                  ml-auto font-bold text-xs px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                  ${currentTab === (itm.name) ? 'text-primary' : 'text-body-light'}
                `}
              >
                {tasks?.filter((task: any) => !task.is_completed && task.bucket_id === itm.id).length}
              </span>
            </Link>
          </li>
        )
      }
    </ul> 
  )
}