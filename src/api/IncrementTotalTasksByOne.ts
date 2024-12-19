import { supabase } from '@/lib/supabaseClient';

interface UserProfile {
  total_tasks?: number;
}

async function incrementTotalTasksByOne (): Promise<void> {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userData || userError) throw new Error ('couldn\'t get user data');

    const userId = userData.user.id

    const { data: totalTasksData, error: totalTasksError } = await supabase
    .from('user_profile')
    .select('total_tasks')
    .eq('user_id', userId)
    .single();
    if (totalTasksError) throw new Error ('Error while getting user_profile table: ' + totalTasksError.message);

    if (!totalTasksData) {
      throw new Error('No matching records found in user_profile table.');
    }
    
    const { total_tasks } = (totalTasksData as UserProfile);
 
    const { data: updatedTasksData, error } = await supabase
    .from('user_profile')
    .upsert({ user_id: userId, total_tasks }, { onConflict: 'user_id', ignoreDuplicates: false })
    .select();
    if (error) throw new Error ('Error while updating total tasks: ' + error.message);

    return  updatedTasksData;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw err
  }
}

export default incrementTotalTasksByOne;