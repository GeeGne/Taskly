import { supabase } from '@/lib/supabaseClient';

async function updateUserProfilePictureURL (picture_url: string) {
  try {
    const { data: userData, error: userDataError } = await supabase.auth.getUser();
    if (userDataError) throw new Error (`Couldn't get user Data, please refresh your browser`);

    const { data, error } = await supabase
      .from('user_profile')
      .upsert(
        {
          user_id: userData.user.id,
          picture_url
        },{
          onConflict: 'user_id',
          ignoreDuplicates: false
        }
      )
      .select();
    if (error) throw new Error ('Failed to update user picture URL: ' + error.message);
      
    return data;
  } catch(err) {
    const error = err as Error;
    console.error(error.message);
    throw err;
  }
}

export default updateUserProfilePictureURL;