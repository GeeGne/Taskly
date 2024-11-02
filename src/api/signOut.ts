import { supabase } from '@/lib/supabaseClient';

async function signOut () {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error ('Unable to signout');

  } catch (err) {
    const error = err as Error;
    console.error('Error while signing out: ', error.message)
    throw error;
  }
}

export default signOut;