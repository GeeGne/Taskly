import { supabase } from '@/lib/supabaseClient';

type OAuthProvider = 'github' | 'google' | 'facebook';

const handleOAuthSignIn = async (provider: OAuthProvider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ 
      provider,
    });
    if (error) throw new Error ('Error while signing in to GitHub');

    return data;
  } catch (err) {
    const error = err as Error
    console.error('Auth error: ', error.message);
    throw err;
  }
}

export default handleOAuthSignIn;

