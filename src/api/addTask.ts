import { supabase } from '@/lib/supabaseClient';

type AddTask = {
  newTask: string,
  priorityKey: 'none' | 'normal' | 'important' | 'critical' | null
  bucket_id: number | null;
  for_today: boolean;
}

async function addTask ({ newTask, priorityKey = 'none', bucket_id = null, for_today = false }: AddTask) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title: newTask,
        user_id: userData.user.id, 
        bucket_id,
        priority: priorityKey || 'none' ,
        for_today
      }]);
    if (error) throw new Error (`An issue has accured while saving task data`)

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Unable to get Tasks: ', error.message);
    throw err;
  }
}

export default addTask;