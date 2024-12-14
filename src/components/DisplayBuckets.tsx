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
import DeleteSvg from '@/components/svgs/DeleteSvg';
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
  useDeleteBucketPopupStore, useCurrentTabStore,
  useSettingsPopupStore, useAddBucketPopupStore 
} from '@/store/index.js';

export default function DisplayBuckets ({buckets, tasks, isLoading, activateDeleteBucketToggle, currentLanguage = 'en'}: any) {
  const emptyArray = [1, 2, 3, 4];
  const isEn = currentLanguage === 'en';
  const currentTab = useCurrentTabStore(status => status.currentTab);
  const { 
    deleteBucketPopupDetails, setDeleteBucketPopupDetails,
    deleteBucketPopupToggle ,setDeleteBucketPopupToggle
  } = useDeleteBucketPopupStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, bucketId } = e.currentTarget.dataset;
    const getBucket = (id: number) => buckets?.find((itm: any) => itm.id === id);

    switch (type) { 
      case 'delete_bucket_button_is_clicked':
        setDeleteBucketPopupDetails(getBucket( Number(bucketId) ));
        setDeleteBucketPopupToggle(true);

        // DEBUG
        // console.log('getBucket: ', getBucket(Number(bucketId)));
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // isLoading = true;

  return (
    <ul
      className="flex flex-col gap-1" 
    >
      { isLoading
        ? emptyArray.map((itm: any, i: number) => 
            <li
              key={i}
              className="--flirk p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
              role="button"
            > 
              <Link 
                className={`
                  flex items-center gap-2 text-sm text-left text-transparent
                `}
                href={`/bucket/${itm.name}`}
              >
                <span
                  className="bg-[var(--background-light-color)]"
                >
                  ✨
                </span>
                <span
                  className="bg-[var(--background-light-color)]"
                >
                  some-name-rand
                </span>
                <span
                  className={`
                    ml-auto font-bold text-xs px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                    ${isEn ? 'ml-auto' : 'mr-auto'}
                  `}
                >
                  0
                </span>
              </Link>
            </li>
          )
        : buckets?.map((itm: any, i: number) => 
          <li
            key={itm.id}
            className="flex shrink-0 overflow-hidden p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="bucketList_button_is_clicked"
            data-bucket-name={itm.name}
          > 
            <button
              className={`
                flex items-center justify-center h-[100%] bg-red-500 hover:bg-red-600 shrink-0 
                transition-all duration-300 ease-in-out
                ${activateDeleteBucketToggle ? `w-10 ${isEn ? 'mr-2' : 'ml-2'}` : 'w-0'}
              `}
              style={{ transitionDelay: `${i / 10}s`}}
              data-bucket-id={itm.id}
              data-type="delete_bucket_button_is_clicked"
              onClick={handleClick}
            >
              <DeleteSvg 
                color="var(--font-heading-invert-color)"
              />
            </button>
            <Link 
              className={`
                flex items-center gap-2 text-sm text-left w-[100%] shrink-0
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
                  font-bold text-xs px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
                  ${currentTab === (itm.name) ? 'text-primary' : 'text-body-light'}
                  ${isEn ? 'ml-auto' : 'mr-auto'}
                `}
              >
                {tasks?.filter((task: any) => !task.is_completed && task.bucket_id === itm.id).length || 0}
              </span>
            </Link>
          </li>
        )
      }
    </ul> 
  )
}