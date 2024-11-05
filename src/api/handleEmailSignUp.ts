import { supabase } from '@/lib/supabaseClient';

const handleEmailSignUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email,
      password
    });
    if (error) throw new Error ('Error while signup');

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Auth error: ', error.message);
    throw err;
  }
}

export default handleEmailSignUp;

