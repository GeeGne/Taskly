import { create } from 'zustand';

const useCurrentTabStore = create((set, get) => ({
  currentTab: 'myTasks',
  setCurrentTab: currentTab => set({ currentTab })
}))

export { useCurrentTabStore };