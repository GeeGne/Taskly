import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useSettingsPopupStore = create(
  persist(
    (set) => ({
      settingsPopup: false,
      setSettingsPopup: (settingsPopup) => set({ settingsPopup })
    }),
    {
      name: 'settingPopup-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

const useErrorAlertStore = create((set) => ({
  errorAlert: 0,
  setErrorAlert: (errorAlert) => set({ errorAlert }),
  errorText: 'test',
  setErrorText: (errorText) => set({ errorText })
}))

const useNotificationToastStore = create((set) => ({
  notificationToast: 0,
  setNotificationToast: (notificationToast) => set({ notificationToast }),
  notificationText: 'test',
  setNotificationText: (notificationText) => set({ notificationText }),
}))

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme })
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

export { 
  useThemeStore, useSideBarStore, useCurrentTabStore, 
  useNotificationToastStore, useErrorAlertStore, useSettingsPopupStore 
};