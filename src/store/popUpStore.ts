import { create } from "zustand";

interface PopUpState {
  error: string | null;

  setError: (error: string | null) => void;
}

export const usePopUpStore = create<PopUpState>((set) => ({
  error: null,

  setError: (error) => set({ error }),
}));
