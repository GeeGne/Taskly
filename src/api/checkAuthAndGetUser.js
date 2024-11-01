import { supabase } from '@/lib/supabaseClient.ts';

async function checkAuthAndGetUser () {
  try {
    const { data } = await supabase.auth.getUser();
    console.log('user: ', data);
    if (!data.user) throw new Error('No user to signin');

    return data.user;
  } catch (err) {
    console.error('Error while getAuth: ', err);
    throw err;
  }
}

export default checkAuthAndGetUser;