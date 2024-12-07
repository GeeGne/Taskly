import ErrorAlert from '@/components/alerts/ErrorAlert';
import NotificationToast from '@/components/alerts/NotificationToast';

export default function Alerts ({ currentLanguage }: { currentLanguage?: string}) {
  return (
    <>
      <ErrorAlert currentLanguage={currentLanguage} />                
      <NotificationToast currentLanguage={currentLanguage} />       
    </>
  )
}