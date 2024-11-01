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
    console.log('tasks data: ', data);
    console.log('user id: ', userData.user.id);
    return data;
  } catch (err) {
    console.error('Unable to get Tasks: ', err.message);
    throw err;
  }
}

export default getTasks;