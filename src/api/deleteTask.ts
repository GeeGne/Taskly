import { supabase } from '@/lib/supabaseClient';

async function deleteTask (taskId: string) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    if (error) throw new Error ('Failed to delete')
    
    return data;
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error while deleteing task: ', error.message);
    throw err;
  }
}

export default deleteTask;