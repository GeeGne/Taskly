import { supabase } from '@/lib/supabaseClient';

function addBucket () {
  try {

  } catch (err) {
    const error = err as Error;
    console.error('Error while adding a bucket: ', error.message);
    throw err;
  }
}

export default addBucket;