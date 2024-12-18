import { supabase } from '@/lib/supabaseClient';

async function getUserProfilePictureURL () {
  try {
    const { data: userData, error: userDataError } = await supabase.auth.getUser();
    if (userDataError) throw new Error (`Couldn't get user Data, please refresh your browser`);

    const { data , error } = await supabase
      .from('user_profile')
      .select('*')
      .eq('user_id', userData.user.id)
    if (error) throw new Error ('Failed to fetch user picture URL: ' + error.message);
    
    const [ userPfpData ] = data;
    return userPfpData;
  } catch(err) {
    const error = err as Error;
    console.error(error.message);
    throw err;
  }
}

export default getUserProfilePictureURL;