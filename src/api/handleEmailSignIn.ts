import { supabase } from '@/lib/supabaseClient';

interface User {
  email: string,
  password: string,
}


const handleEmailSignIn = async ({ email, password }: User) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error (error.message);

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Auth error: ', error.message);
    throw err;
  }
}

export default handleEmailSignIn;

