import { supabase } from '@/lib/supabaseClient';

type Data = {
  boolNum: 0 | 1,
  taskId: Number
}
async function updateIsCompletedFromTasks ({ boolNum, taskId }: Data) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_completed: boolNum })
      .eq('id', taskId);
    if (error) throw new Error (`An issue has accured while saving task data`)

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Unable to get Tasks: ', error.message);
    throw err;
  }
}

export default updateIsCompletedFromTasks;