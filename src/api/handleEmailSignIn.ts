import { supabase } from '@/lib/supabaseClient';

const handleEmailSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error ('Error while signing in to GitHub');

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Auth error: ', error.message);
    throw err;
  }
}

export default handleEmailSignIn;

