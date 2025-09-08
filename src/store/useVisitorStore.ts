import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface VisitorState {
  cursorName: string;
  cursorColor: string;
  setCursorName: (name: string) => void;
  setCursorColor: (color: string) => void;
}

export const useVisitorStore = create(
  persist<VisitorState>(
    (set) => ({
      cursorName: "Visitante",
      cursorColor: "#01baef",
      setCursorName: (name) => set({ cursorName: name }),
      setCursorColor: (color) => set({ cursorColor: color }),
    }),
    {
      name: "visitor-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
