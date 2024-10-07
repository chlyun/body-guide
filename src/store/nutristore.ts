import { create } from 'zustand';

type nutristateStore = {
  Data: string | null;
  setData: 
};

const useStore = create<nutristateStore>()((set) => ({
  Data: null,
  setData: (data) => set({ Data: data }),
}));
{}



