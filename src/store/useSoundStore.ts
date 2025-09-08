import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SoundState {
  volume: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create(
  persist<SoundState>(
    (set, get) => ({
      volume: true,
      toggleSound: () => {
        const newVolume = !get().volume;
        document.documentElement.classList.toggle("volume", newVolume);
        set({ volume: newVolume });
      },
    }),
    {
      name: "sound-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
