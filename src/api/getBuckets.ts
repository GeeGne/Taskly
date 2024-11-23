import { supabase } from '@/lib/supabaseClient';

async function getBuckets () {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData) throw new Error ('Couldn\'t get user Data');

    const { data, error } = await supabase
      .from('buckets')
      .select('*')
      .eq('user_id', userData.user?.id);
    ;
    if (error) throw new Error (error.message);

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Error while adding a bucket: ', error.message);
    throw err;
  }
}

export default getBuckets;