import { supabase } from '@/lib/supabaseClient';

async function IncrementTotalTasksByOne () {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData) throw new Error ('couldn\'t get user data');

    const { data: totalTasksData, error: totalTasksError } = await supabase
    .from('user_profile')
    .select('total_tasks')
    .eq('user_id', userData.user?.id);
    if (totalTasksError) throw new Error ('Error while getting user_profile table: ' + totalTasksError.message);

    // const updatedTotalTasks = [total_tasks] + 1;
    // const total_tasks = totalTasksData[0]?.total_tasks;

    // const { data: updatedTasksData, error } = await supabase
    // .from('user_profile')
    // .update({ total_Tasks })
    // .eq('user_id', userData.user?.id);
    // if (error) throw new Error ('Error while updating total tasks: ' + error.message);
    // return console.log('total tasks: ', total_tasks);
    // return console.log('updated total tasks: ', total_tasks);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw err
  }
}

export default IncrementTotalTasksByOne;