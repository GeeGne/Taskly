// COMPONENTS
import ThemeSwitch from '@/components/ThemeSwitch';
import EmojiPicker from 'emoji-picker-react';
import Theme from 'emoji-picker-react';

// STORE
import { useAddBucketPopupStore } from '@/store/index';

export default function AddBucketPopup () {
  
  const setAddBucket = useAddBucketPopupStore(status => status.setAddBucket)
  const addBucket = useAddBucketPopupStore(status => status.addBucket)

  const  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'cancel_button_is_clicked':
        setAddBucket(false)
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
        ${addBucket ? 'visible opacity-100 backdrop-blur-[2px]' : 'invisible opacity-0 backdrop-blur-[0]'}
      `}
    >
      <div
        className={`
          flex flex-col items-center bg-[--background-color] rounded-xl overflow-hidden shaddow-2xl
          transition-all duration-[0.5s] ease-[var(--bounce-bezier)]
          ${addBucket ? 'scale-[100%] w-[450px]' : 'scale-[70%] w-[200px]'}
        `}
      >
        <h2
          className="py-1 font-bold text-md text-body"
        >
          Add a Bucket
        </h2>
        <hr className="w-[100%] border-[var(--background-deep-color)]"/>
        <div
          className="flex justify-between items-center w-[100%] py-2 px-4"
        >
          {/* <EmojiPicker Theme="dark" open={true} autoFocusSearch={true} emojiStyle="apple" onEmojiClick={handleClick} /> */}
          <span
            className="text-sm text-heading"
          >
            Current Theme
          </span>
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
              flex-grow w-[50%] py-1 text-sm text-body font-bold 
              hover:bg-secondary
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            create
          </button>
        </div>
      </div>
    </div>
  )
}