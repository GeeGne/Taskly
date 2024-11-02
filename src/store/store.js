import { create } from 'zustand';

const useCurrentTabStore = create((set) => ({
  currentTab: ''
}))

export { useCurrentTabStore };