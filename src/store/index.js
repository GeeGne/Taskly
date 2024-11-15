import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light'
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

const useSideBarStore = create(
  persist(
    (set) => ({
      toggle: true,
      setToggle: toggle => set({ toggle })
    }),
    {
      name: 'sidebar-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

const useCurrentTabStore = create(
  persist (
    (set) => ({
      currentTab: 'myTasks',
      setCurrentTab: currentTab => set({ currentTab })
    }),
    {
      name: 'currentTab-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useThemeStore, useSideBarStore, useCurrentTabStore };