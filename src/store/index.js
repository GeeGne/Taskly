import { create } from 'zustand';

const useCurrentTabStore = create((set) => ({
  currentTab: 'myTasks',
  setCurrentTab: currentTab => set({ currentTab })
}))

export { useCurrentTabStore };