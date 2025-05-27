import { create } from 'zustand';

type AppStore = {
    app_state: number,
    setAppState: (index: number) => void,
}

export const useAppStore = create<AppStore>((set) => ({
    app_state: 0,
    setAppState: (index: number) => set({ app_state: index })
}));