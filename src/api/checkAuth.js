import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient.ts';

async function checkAuth () {
  try {
    const { data } = await supabase.auth.getSession();
    console.log('data: ', data);
    return data;
  } catch (err) {
    console.error('Error while getAuth: ', err);
    return {}
  }
}

export default checkAuth;