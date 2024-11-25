import { supabase } from '@/lib/supabaseClient';

async function getTasksByBucketId ({ id }: { id: number}) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData) throw new Error ('Couldn\'t get user Data');

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userData.user?.id)
      .eq('bucket_id', id)
    ;
    if (error) throw new Error (error.message);

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting Tasks: ', error.message);
    throw err;
  }
}

export default getTasksByBucketId;