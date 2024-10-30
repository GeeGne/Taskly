import { createClient } from '@/lib/supabaseClient';

const handleGitHubLogin = async () => {
  console.log('test');
  const { data, error } = await createClient.auth.signInWithOAuth({ provider: 'github' });
  if (error) console.error('Erroe with GitHub login: ', error.message);
  console.log('data: ', data);
}

export default handleGitHubLogin;
