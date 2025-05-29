import { create } from "zustand";

type ToggleStore = {
  isOpen: boolean;
  toggle: () => void;
  closeToggle: () => void;
};

export const useListToggle = create<ToggleStore>((set) => ({
  isOpen: true,
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
  closeToggle: () => set({ isOpen: false }),
}));
