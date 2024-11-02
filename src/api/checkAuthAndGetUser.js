import { supabase } from '@/lib/supabaseClient.ts';

async function checkAuthAndGetUser () {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    return data.user;
  } catch (err) {
    console.error('Error while getAuth: ', err);
    throw err;
  }
}

export default checkAuthAndGetUser;