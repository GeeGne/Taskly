// HOOKS
import { useState, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

// COMPONENTS
import ThemeSwitch from '@/components/ThemeSwitch';
import EmojiPicker from 'emoji-picker-react';
import Theme from 'emoji-picker-react';
import AddowDownSvg from '@/components/svgs/ArrowDownSvg'
import IcRoundArrowRightSvg from '@/components/svgs/IcRoundArrowRightSvg';
import SpinnersRingSvg from '@/components/svgs/SpinnersRingSvg';

// STORE
import { 
  useAddBucketPopupStore, useThemeStore,
  useNotificationToastStore, useErrorAlertStore
} from '@/store/index';

// API
import addBucketApi from '@/api/addBucket';

// UTILS
import strSpaceToHyphen from '@/utils/strSpaceToHyphen';

export default function AddBucketPopup () {

  const queryClient = useQueryClient();

  const setAddBucket = useAddBucketPopupStore(status => status.setAddBucket);
  const addBucket = useAddBucketPopupStore(status => status.addBucket);
  const theme = useThemeStore(status => status.theme);
  const { setNotificationToast, setNotificationText } = useNotificationToastStore();
  const { setErrorAlert, setErrorText } = useErrorAlertStore();

  const [ pickerToggle, setPickerToggle ] = useState<boolean>(false);
  const [ emoji, setEmoji ] = useState<string>('📃');
  const [ name, setName ] = useState<string>('')
  const [ createBtnActivity, setCreateBtnActivity ] = useState<boolean>(false);
  console.log('name', name);
  const emojiInputRef = useRef<HTMLInputElement>(null);

  const addBucketMutation = useMutation({
    mutationFn: addBucketApi,
    onSettled: () => {
      setCreateBtnActivity(false);
    },
    onMutate: () => {
      setCreateBtnActivity(true);
    },
    onError: (error) => {
      setErrorText('Error while creating bucket: ' + error.message);
      setErrorAlert(Date.now());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
      setNotificationText('bucket added');
      setNotificationToast(Date.now());  
      setAddBucket(false);
    }
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddBucket(false)
        break;
      case 'create_button_is_clicked':
        addBucketMutation.mutate({ emoji, name })
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleEmojiClick = (emojiData: any, e: any) => {
    const { emoji } = emojiData;
    setEmoji(emoji);
    setPickerToggle(false)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'emoji':
        setPickerToggle(true); 
      break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'emoji':
        // setPickerToggle(false);
      break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(strSpaceToHyphen(value));
        break;
      default:
        console.error('Unknown name: ', name);''
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 w-[100vw] h-[100vh]
        items-center 
        justify-center bg-[--shade-color] backdrop-blur-[2px] z-[200]
        transition-all duraiton-300 ease-in
        ${addBucket ? 'visible opacity-100 backdrop-blur-[2px]' : 'invisible opacity-0 backdrop-blur-[0]'}
      `}
    >
      <EmojiPicker 
        className="
          absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
          z-[10]
        "
        open={pickerToggle} 
        theme={theme} 
        onEmojiClick={handleEmojiClick} 
      />
      <div
        className={`
          absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
          flex flex-col items-center bg-[--background-color] rounded-xl overflow-hidden shaddow-2xl
          transition-all duration-[0.5s] ease-[var(--bounce-bezier)]
          ${addBucket ? 'scale-[100%] w-[300px]' : 'scale-[70%] w-[200px]'}
        `}
      >
        <h2
          className="py-1 font-bold text-md text-body"
        >
          Add a Bucket
        </h2>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <br/>
        <div
          className="flex gap-1 items-center bg-[var(--background-light-color)] rounded-md"
        > 
          <label
            className="
              relative flex items-center
              before:content-[''] before:absolute before:top-0 before:right-0 before:h-[100%] before:w-[1px] before:bg-[var(--background-deep-color)]
            "
            htmlFor="emoji"
          >
            <input
              className="bg-transparent w-6 py-1 pl-1 border-none outline-none"
              id="emoji"
              name='emoji'
              value={emoji}
              readOnly
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={emojiInputRef}
            />
            <IcRoundArrowRightSvg 
              className="rotate-90"
              color="var(--font-body-color)"
            />
          </label>
          <input
            className="bg-transparent border-none outline-none p-1 text-md text-heading"
            placeholder="Bucket name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <br />
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
              flex flex-grow justify-center items-center text-center w-[50%] py-1 text-sm text-body font-bold 
              hover:bg-secondary
            "
            data-type="create_button_is_clicked"
            onClick={handleClick}
          >
            {createBtnActivity 
              ? <SpinnersRingSvg color="var(--font-body-color)"/> 
              : 'create'
            }
          </button>
        </div>
      </div>
    </div>
  )
}