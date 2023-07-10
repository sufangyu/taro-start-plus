import { create } from 'zustand'

interface AppStore {
  tabbarSelected: number;
  setTabbarSelected: (index: number) => void;
}

export const useAppStore = create<AppStore>()(
  (set) => ({
    tabbarSelected: 0,
    setTabbarSelected(index){
      set(()=>({
        tabbarSelected: index,
      }));
    },
    
  }),
);




