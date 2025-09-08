import { create } from "zustand";

interface LocaleState {
  locale: string;
  setLocale: (loc: string) => void;
}

function getInitialLocale(): string {
  if (typeof window === "undefined") return "en-US";

  const stored = localStorage.getItem("locale");
  if (stored) return stored;

  const navLang = navigator.language;
  if (navLang.startsWith("pt")) return "pt-BR";
  return "en-US";
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (loc) => {
    localStorage.setItem("locale", loc);
    set({ locale: loc });
  },
}));
