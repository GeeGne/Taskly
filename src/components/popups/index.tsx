import SettingsPopup from '@/components/popups/SettingsPopup';
import AddBucketPopup from '@/components/popups/AddBucketPopup';
import DeleteBucketPopup from '@/components/popups/DeleteBucketPopup';
import PriorityPopup from '@/components/popups/PriorityPopup';

export default function Popups ({ currentLanguage }: { currentLanguage: string }) {
  return (
    <>
      <AddBucketPopup currentLanguage={currentLanguage} />
      <SettingsPopup currentLanguage={currentLanguage} />
      <DeleteBucketPopup currentLanguage={currentLanguage} />
      <PriorityPopup currentLanguage={currentLanguage} />
    </>
  )
}