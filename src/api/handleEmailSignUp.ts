import { supabase } from '@/lib/supabaseClient';

interface User {
  email: string,
  password: string,
  username: string
}

const handleEmailSignUp = async ({email, password, username}: User) => {
  try {
    // const { data, error } = await supabase.auth.signUp({ 
      // email,
      // password
    // });
    const { data, error } = await supabase.auth.signUp({ 
      email,
      password
    });
    console.log('error:', error);
    if (error) throw new Error (error.message);

    const userId = data.user?.id;
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      username
    })
    if (profileError) throw new Error ('Error while adding a username to the profile');

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Auth error: ', error.message);
    throw err;
  }
}

export default handleEmailSignUp;

