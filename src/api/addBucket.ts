import { supabase } from '@/lib/supabaseClient';

type AddBucket = {
  emoji?: string,
  name: string
}

async function addBucket ({ emoji, name }: AddBucket) {
  try {
    console.log({name, emoji});
    const { data: userData } = await supabase.auth.getUser();

    if (!userData) throw new Error ('Couldn\'t get user Data');
    console.log('user: ', userData.user?.id);
    const { data, error } = await supabase
      .from('buckets')
      .insert([{
        user_id: userData.user?.id,
        emoji,
        name
      }])
    ;
    if (error) throw new Error (error.message);

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Error while adding a bucket: ', error.message);
    throw err;
  }
}

export default addBucket;