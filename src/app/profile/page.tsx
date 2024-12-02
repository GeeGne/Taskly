"use client"

// HOOKS
import { useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from 'next/image';

// COMPONENTS
import MainWrapper from '@/components/MainWrapper';
import Header from '@/components/Header';
import CircularProgressBox from '@/components/CircularProgressBox';
import CameraSvg from '@/components/svgs/CameraSvg';
import PersonFillSvg from '@/components/svgs/PersonFillSvg';
import TaskInput from '@/components/TaskInput';
import DisplayTasks from '@/components/DisplayTasks';
import DisplayCompletedTasks from '@/components/DisplayCompletedTasks';

// API
import checkAuthAndGetUser from '@/api/checkAuthAndGetUser';
import uploadProfilePictureToStorage from '@/api/uploadProfilePictureToStorage';
import updateUserProfilePictureURL from '@/api/updateUserProfilePictureURL';
import getUserProfilePictureURL from '@/api/getUserProfilePictureURL';
import getTasks from '@/api/getTasks';
import getBuckets from '@/api/getBuckets';

// STORES
import { 
  useCurrentTabStore, useHomePageStore, 
  useNotificationToastStore, useErrorAlertStore,
  useBackgroundActivityStore
} from '@/store/index.js';

// ASSETS
import pfpImg from '@/../public/assets/pfp.jpg'

// UTILS
import calTasks from '@/utils/calTasks';
import calRemainingTasks from '@/utils/calRemainingTasks';
import calCompletedTasks from '@/utils/calCompletedTasks';

// TYPES
type NameParams = {
  name: string
}

interface UserProfile {
  picture_url?: string;
  [key: string]: unknown;
}

export default function ProfilePage () {
  
  const queryClient = useQueryClient();
  const isPfp: boolean = false;
  
  const { name } = useParams<NameParams>();

  const setCurrentTab = useCurrentTabStore(status => status.setCurrentTab);
  const setIsHomePage = useHomePageStore(status => status.setIsHomePage);

  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { setErrorAlert, setErrorText } = useErrorAlertStore();
  const setBackgroundActivityToggle = useBackgroundActivityStore(status => status.setBackgroundActivityToggle);

  const pfpInputRef = useRef<HTMLInputElement>(null);
  const profilePicture = useRef<any>(null);

  useEffect(() => {
    setCurrentTab(name)
    setIsHomePage(false);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAndGetUser,
  })

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    enabled: !!user
  })

  const { data: userProfileUrl } = useQuery<UserProfile | any>({
    queryKey: ['user-profile-picture'],
    queryFn: getUserProfilePictureURL,
    enabled: !!user
  });

  const uploadProfilePictureMutation = useMutation({
    mutationFn: uploadProfilePictureToStorage,
    onSettled: () => {
      setBackgroundActivityToggle(false);
    },
    onMutate: () => {
      setBackgroundActivityToggle(true);
    },
    onError: (error) => {
      setErrorText(error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: (url) => {
      updateProfilePicturURLMutation.mutate(url);
    }
  });

  const updateProfilePicturURLMutation = useMutation({
    mutationFn: updateUserProfilePictureURL,
    onSettled: () => {
      setBackgroundActivityToggle(false);
    },
    onMutate: () => {
      setBackgroundActivityToggle(true);
    },
    onError: (error) => {
      setErrorText(error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user-profile-picture']});
      setNotificationText('Profile Picture is added');
      setNotificationToast(Date.now());
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'changePicture_button_is_clicked':
        pfpInputRef.current?.click();
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'pfpPicture':
        const file: any = e.currentTarget.files[0];
        uploadProfilePictureMutation.mutate(file);
        break;
      default:
        console.error('Unknown type: ', name);
    }
  }

  // DEBUG
  // console.log('user: ', user);
  // console.log('file', pfpInputRef.current?.files[0])
  // console.log('userProfileUrl: ', userProfileUrl?.picture_url);
  console.log('total tasks: ', calTasks(tasks));
  console.log('completed tasks: ', calCompletedTasks(tasks));
  console.log('remaining tasks: ', calRemainingTasks(tasks));

  return (
    <MainWrapper>
      <Header tab='Profile' />
      <div
        className="flex flex-col gap-4"
      >
        <section
          className="
            flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8
            w-[100%] p-4 backdrop-blur-[3px] bg-[hsla(0,0%,80%,0.5)] dark:bg-[hsla(0,0%,20%,0.5)] rounded-xl
          "
        >
          <label
            className="group relative rounded-[10rem] overflow-hidden cursor-pointer"
            htmlFor="pfpPicture"
          > 
            <input 
              className="absolute top-0 left-0 w-1 h-1 opacity-0"
              type="file"
              accept="image/*"
              name="pfpPicture"
              id="pfpPicture"
              onChange={handleChange}            
              ref={pfpInputRef}
            />         
            { userProfileUrl
              ? <Image
                src={userProfileUrl?.picture_url}
                width={160}
                height={160}
                alt="User Profile Picture"
                className="w-[10rem] aspect-[1/1] object-cover object-center"
              />
              : <PersonFillSvg width="10rem" height="10rem" color="var(--font-heading-color)" 
                className="w-[10rem] p-8 aspect-[1/1] object-cover object-center bg-[var(--background-deep-color)]"
              />
            }
            <button
              className="
                absolute bottom-8 left-[50%] translate-x-[-50%]
                flex flex-row gap-2
                px-2 py-1 bg-[hsla(0,0%,100%,0.6)] dark:bg-[hsla(0,0%,0%,0.6)] group-hover:bg-[hsla(0,0%,100%,0.8)] dark:group-hover:bg-[hsla(0,0%,0%,0.8)] 
                text-xs font-bold text-body hover:text-heading rounded-lg whitespace-nowrap
                transition-all duration-200 ease-out
              "
              data-type="changePicture_button_is_clicked"
              onClick={handleClick}
            >
              <CameraSvg color="var(--font-heading-color)" 
                className="opacity-70 group-hover:opacity-100"
              />
              <span>
                Change Image
              </span>
            </button>
          </label>
          <div
            className="flex flex-col items-center justify-center w-[100%] md:w-auto"
          >
            <span
              className="text-heading text-md font-regular"
            >
              Geegne
            </span><hr/>    
            <span
              className="text-body-light text-sm"
            >
              {user?.email}
            </span>                              
          </div>
        </section>
        <section
          className="
            flex flex-col md:flex-row md:flex-wrap items-center md:items-start md:justify-center gap-4 md:gap-8
            w-[100%] p-4 backdrop-blur-[3px] bg-[hsla(0,0%,80%,0.5)] dark:bg-[hsla(0,0%,20%,0.5)] rounded-xl
          "
        >
          <CircularProgressBox
            percantageText={`${calRemainingTasks(tasks)} / ${calTasks(tasks)}`}
            percantage={(calCompletedTasks(tasks) * 100) / calTasks(tasks)}          
            title="On the Horizon 📌" 
            description="Look forward to upcoming tasks that keep you moving toward your goals."       
          />
          <CircularProgressBox 
            percantageText={`${calCompletedTasks(tasks)} / ${calTasks(tasks)}`}
            percantage={(calCompletedTasks(tasks) * 100) / calTasks(tasks)}          
            title="Accomplished Goals 🎖️" 
            description="Celebrate the tasks you've successfully completed, each one a step closer to your larger ambitions." 
          />
          <CircularProgressBox
            title="Done & Dusted ✨" 
            description="Reflect on your hard work and enjoy the satisfaction of checking things off your list."       
          />
          <CircularProgressBox
            title="Task Universe" 
            description="View the complete galaxy of all tasks you’ve ever created—your productivity universe!"       
          />
          <CircularProgressBox
            percantageText="19 / 399"
            title="Pending Goals"
            description="Keep track of tasks that still need your attention and plan your next steps."
            percantage={10}
          />
        </section>
      </div>
    </MainWrapper>
  )
}
