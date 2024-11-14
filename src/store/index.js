import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'light'
}))

const useSideBarStore = create((set) => ({
  toggle: true,
  setToggle: toggle => set({ toggle })
}))

const useCurrentTabStore = create((set) => ({
  currentTab: 'myTasks',
  setCurrentTab: currentTab => set({ currentTab })
}))

export { useThemeStore, useSideBarStore, useCurrentTabStore };