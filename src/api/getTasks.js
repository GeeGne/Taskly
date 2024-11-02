import { supabase } from '@/lib/supabaseClient';

async function getTasks () {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userData.user.id);
    if (error) throw new Error('Couldn\'t retrieve Tasks data');

    return data;
  } catch (err) {
    console.error('Unable to get Tasks: ', err.message);
    throw err;
  }
}

export default getTasks;