function calRemainingTasks (tasksArray: any = []) {
  if (!tasksArray) return '--';
  return tasksArray.filter((task: any) => task.is_completed === 0).length;
}

export default calRemainingTasks