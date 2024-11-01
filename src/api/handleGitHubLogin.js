import { supabase } from '@/lib/supabaseClient';

const handleGitHubLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ 
      provider: 'github',
    });
    if (error) throw new Error ('Error while signing in to GitHub');

    return data;
  } catch (err) {
    console.error('Auth error: ', err.message);
    throw err;
  }
}

export default handleGitHubLogin;

