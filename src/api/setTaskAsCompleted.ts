import { supabase } from '@/lib/supabaseClient';

type Data = {
  boolNum: 0 | 1,
  tableId: Number
}
async function updateIsCompletedFromTasks ({ boolNum, tableId }: Data) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error ('User not authenticated');
    
    const { data, error } = await supabase
      .from('tasks')
      .update({ isCompleted: boolNum })
      .eq('id', tableId);
    if (error) throw new Error (`An issue has accured while saving task data`)

    return data;
  } catch (err) {
    const error = err as Error;
    console.error('Unable to get Tasks: ', error.message);
    throw err;
  }
}

export default updateIsCompletedFromTasks;