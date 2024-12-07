// HOOKS
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// COMPONENTS
import ThemeSwitch from '@/components/ThemeSwitch';
import ControllerSwitch from '@/components/ControllerSwitch';
import SpinnerRingSvg from '@/components/svgs/SpinnersRingSvg'

// STORE
import { 
  useDeleteBucketPopupStore, useNotificationToastStore, 
  useErrorAlertStore, useActivateDeleteBucketsStore 
} from '@/store/index';

// API
import deleteBucket from '@/api/deleteBucket';

export default function DeleteBucketPopup ({ currentLanguage = 'en' }: { currentLanguage?: string ;}) {
  const isEn = currentLanguage === 'en';
  
  const queryClient = useQueryClient();
  const [ deleteActivity, setDeleteActivity ] = useState<boolean>(false);

  const deleteBucketPopupToggle = useDeleteBucketPopupStore(status => status.deleteBucketPopupToggle);
  const deleteBucketPopupDetails = useDeleteBucketPopupStore(status => status.deleteBucketPopupDetails);
  const setDeleteBucketPopupToggle = useDeleteBucketPopupStore(status => status.setDeleteBucketPopupToggle);
  const setActivateDeleteBucketToggle = useActivateDeleteBucketsStore(status => status.setActivateDeleteBucketToggle);
  const { setErrorText, setErrorAlert } = useErrorAlertStore();
  const { setNotificationText, setNotificationToast } = useNotificationToastStore();

  const deleteBucketMutation = useMutation({
    mutationFn: deleteBucket,
    onSettled: () => {
      setDeleteActivity(false);
    },
    onMutate: () => {
      setDeleteActivity(true);
    },
    onError: error => {
      setErrorText(error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['buckets']});
      setNotificationText('bucket deleted');
      setNotificationToast(Date.now());
      setDeleteBucketPopupToggle(false);
      setActivateDeleteBucketToggle(false);
    },
  })

  const  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setDeleteBucketPopupToggle(false);
        break;
      case 'delete_button_is_clicked':
        deleteBucketMutation.mutate(deleteBucketPopupDetails.id);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG
  // console.log('deleteBucketPopupDetails: ', deleteBucketPopupDetails);

  return (
    <div
      className={`
        fixed top-0 left-0 w-[100vw] h-[100vh]
        flex items-center 
        justify-center bg-[--shade-color] backdrop-blur-[2px] z-[200]
        transition-all duraiton-300 ease-in
        ${deleteBucketPopupToggle ? 'visible opacity-100 backdrop-blur-[2px]' : 'invisible opacity-0 backdrop-blur-[0]'}
      `}
    >
      <div
        className={`
          flex flex-col items-center bg-[--background-color] rounded-xl overflow-hidden shaddow-2xl
          transition-all duration-[0.5s] ease-[var(--bounce-bezier)]
          ${deleteBucketPopupToggle ? 'scale-[100%] w-[300px]' : 'scale-[70%] w-[200px]'}
        `}
      >
        <h2
          className="py-1 font-bold text-md text-body"
        >
          Confirmation Needed
        </h2>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <div
          className="flex flex-col gap-2 p-4"
        
        >
          <h3
            className="text-xs text-heading font-bold"
          >
            Are you sure you want to delete this {' '} 
            <span
              className="text-primary"
            >
              {deleteBucketPopupDetails.name} 
            </span>{' '}
            bucket? 
          </h3>
          <h4 
            className="text-xs text-body font-thin"
          >
            All contents will be permanently removed, but you can create a new one anytime.
          </h4>
        </div>
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
              flex items-center justify-center flex-grow w-[50%] py-1 text-sm text-body font-bold 
              hover:bg-red-400 dark:hover:bg-red-600
            "
            data-type="delete_button_is_clicked"
            onClick={handleClick}
          >
            { deleteActivity
              ? <SpinnerRingSvg className="text-body" />
              : 'Delete'
            }
          </button>
        </div>
      </div>
    </div>
  )
}