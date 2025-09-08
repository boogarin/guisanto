import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return { darkMode: newMode };
    }),
  setDarkMode: (value) =>
    set(() => {
      localStorage.setItem("darkMode", String(value));
      document.documentElement.classList.toggle("dark", value);
      return { darkMode: value };
    }),
}));
