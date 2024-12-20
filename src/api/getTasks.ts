import { supabase } from '@/lib/supabaseClient';


async function getTasks () {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userData.user.id);
    if (error) throw new Error(error.message);

    return data;
  } catch (err) {
    const error = err as Error
    console.error('Unable to get Tasks: ', error.message);
    throw err;
  }
}

export default getTasks;