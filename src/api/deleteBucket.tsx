import { supabase } from '@/lib/supabaseClient';

async function deleteBucket (id: number) {
  try {
    const { data, error } = await supabase
      .from('buckets')
      .delete()
      .eq('id', id)
    ;
    if (error) throw new Error ('Unable to delete the bucket: ' + error.message);

    return data;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw error;
  }
}

export default deleteBucket;