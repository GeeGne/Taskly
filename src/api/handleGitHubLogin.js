import { supabase } from '@/lib/supabaseClient';

const handleGitHubLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({ 
    provider: 'github',
  });
  if (error) console.error('Erroe with GitHub login: ', error.message);
  console.log('data: ', data);
}

export default handleGitHubLogin;

