'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

export default function DisplayBuckets ({buckets, isLoading}: any) {
  
  return (
    <ul
      className="flex flex-col gap-1" 
    >
      { buckets?.map((itm: any, i: number) => 
          <li
            className="flex items-center gap-2 text-body-light text-sm text-left p-1 hover:bg-[var(--background-light-color)] transition-colors duration-200 ease-out rounded-md"
            role="button"
            data-type="myTasks_button_is_clicked"
            data-key="myTasks"
            key={i}
          >
            <span>
              {itm.emoji}
            </span>
            <span>
              {itm.name}
            </span>
            <span
              className={`
                ml-auto font-bold text-xs text-body-extra-light px-2 py-1 bg-[var(--background-light-color)] rounded-[2rem]
              `}
            >
              0
            </span>
          </li>
        )
      }
    </ul> 
  )
}