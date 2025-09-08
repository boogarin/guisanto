import { create } from "zustand";

interface PageState {
  showProjects: boolean;
  showAbout: boolean;
  firstLoad: boolean;
  lastPage: "home" | "projects" | "about";
  togglePageProjects: () => void;
  togglePageAbout: () => void;
  setFirstLoad: (value: boolean) => void;
}

export const usePageStore = create<PageState>((set, get) => ({
  showProjects: false,
  showAbout: false,
  firstLoad: true,
  lastPage: "home",

  togglePageProjects: () => {
    const { showProjects, showAbout } = get();
    set({
      lastPage: showProjects ? "projects" : showAbout ? "about" : "home",
      showProjects: !showProjects,
      showAbout: false,
    });
  },

  togglePageAbout: () => {
    const { showAbout, showProjects } = get();
    set({
      lastPage: showAbout ? "about" : showProjects ? "projects" : "home",
      showAbout: !showAbout,
      showProjects: false,
    });
  },

  setFirstLoad: (value) => set({ firstLoad: value }),
}));
