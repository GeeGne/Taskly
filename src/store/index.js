import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAddBucketPopupStore = create(
  (set) => ({
    addBucket: false,
    setAddBucket: addBucket => set({ addBucket }),
  })
);

const useTaskInputStore = create(
  (set) => ({
    focus: false,
    setFocus: focus => set({ focus }),
  })
);

const usePriorityPopupStore = create(
  (set) => ({
    priorityPopup: false,
    setPriorityPopup: priorityPopup => set({ priorityPopup }),
    priorityKey: null,
    setPriorityKey: priorityKey => set({ priorityKey })    
  })
);

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
);

const useErrorAlertStore = create((set) => ({
  errorAlert: 0,
  setErrorAlert: (errorAlert) => set({ errorAlert }),
  errorText: 'test',
  setErrorText: (errorText) => set({ errorText })
}));

const useNotificationToastStore = create((set) => ({
  notificationToast: 0,
  setNotificationToast: (notificationToast) => set({ notificationToast }),
  notificationText: 'test',
  setNotificationText: (notificationText) => set({ notificationText }),
}));

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
);

const useLanguageStore = create(
  persist(
    set => ({
      currentLanguage: 'ar',
      setCurrentLanguage: currentLanguage => set(({ currentLanguage }))
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

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
);

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
);

const useHomePageStore = create(set => ({
  isHomePage: true,
  setIsHomePage: isHomePage => set({ isHomePage })
}))

const useControllersStore = create(
  persist(
    (set) => ({
      backgroundConfettiToggle: true,
      setTestToggle: testToggle => (set({ testToggle })),
      backgroundConfettiToggle: true,
      setBackgroundConfettiToggle: backgroundConfettiToggle => (set({ backgroundConfettiToggle })),
      taskCompleteCelebrateConfettiToggle: true,
      setTaskCompleteCelebrateConfettiToggle: taskCompleteCelebrateConfettiToggle => (set({ taskCompleteCelebrateConfettiToggle })),

    }),
    {
      name: 'controllers-storage',
      storage: createJSONStorage(() => localStorage)  
    }
  )
);

const useBackgroundActivityStore = create(set => ({
  backgroundActivityToggle: false,
  setBackgroundActivityToggle: backgroundActivityToggle => (set({ backgroundActivityToggle }))
}));

const useActivateDeleteBucketsStore = create(set => ({
  activateDeleteBucketToggle: false,
  setActivateDeleteBucketToggle: activateDeleteBucketToggle => (set({ activateDeleteBucketToggle }))
}));

const useDeleteBucketPopupStore = create(set => ({
  deleteBucketPopupToggle: false,
  deleteBucketPopupDetails: {},
  setDeleteBucketPopupDetails: deleteBucketPopupDetails => (set({ deleteBucketPopupDetails })),
  setDeleteBucketPopupToggle: deleteBucketPopupToggle => (set({ deleteBucketPopupToggle }))
}));

export { 
  useThemeStore, useLanguageStore, 
  useSideBarStore, useCurrentTabStore, 
  useNotificationToastStore, useErrorAlertStore, 
  useSettingsPopupStore, usePriorityPopupStore,
  useTaskInputStore, useAddBucketPopupStore,
  useHomePageStore, useControllersStore,
  useBackgroundActivityStore, useActivateDeleteBucketsStore,
  useDeleteBucketPopupStore
};