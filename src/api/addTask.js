import { supabase } from '@/lib/supabaseClient';

async function addTask (title) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, user_id: userData.user.id }]);
    if (error) throw new Error (`An issue has accured while saving task data`)

    return data;
  } catch (err) {
    console.error('Unable to get Tasks: ', err.message);
    throw err;
  }
}

export default addTask;