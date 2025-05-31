import { create } from "zustand";

type ToggleStore = {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
};

export const useListToggle = create<ToggleStore>((set) => ({
  isOpen: true,
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
