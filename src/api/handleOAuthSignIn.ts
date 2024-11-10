import { supabase } from '@/lib/supabaseClient';

// type OAuthProvider = 'github' | 'google' | 'facebook';

const handleOAuthSignIn = async (provider: any) => {
  try {

    const redirectTo = process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_DOMAIN_URI
    ;

    const { data, error } = await supabase.auth.signInWithOAuth({ 
      provider,
      options: {
        redirectTo
      }
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

