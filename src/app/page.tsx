"use client";

import { AnimatePresence, motion } from "framer-motion";
import Card from "../components/Card";
import Folder from "../components/Folder";
import Header from "../components/Header";
import Arrow from "../components/Arrow";
import About from "../components/About";
import Projects from "../components/Projects";
import { usePageStore } from "@/store/usePageStore";
import { useEffect } from "react";

export default function Home() {
  const showProjects = usePageStore((s) => s.showProjects);
  const showAbout = usePageStore((s) => s.showAbout);
  const firstLoad = usePageStore((s) => s.firstLoad);
  const setFirstLoad = usePageStore((s) => s.setFirstLoad);
  const lastPage = usePageStore((s) => s.lastPage);

  const getHomeInitialX = () => {
    if (firstLoad) return 0;
    if (lastPage === "about") return 2000;
    if (lastPage === "projects") return -2000;
    return 2000;
  };

  const getHomeExitX = () => {
    if (showAbout) return window.innerWidth < 640 ? -2000 : 2000;
    if (showProjects) return -2000;
    return 0;
  };

  useEffect(() => {
    if (showAbout || showProjects) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [showAbout, showProjects]);

  return (
    <div className="relative w-full h-screen sm:overflow-hidden">
      <Header />
      <Arrow />

      <AnimatePresence>
        <motion.div
          key="home"
          initial={{ opacity: 1, x: getHomeInitialX() }}
          animate={
            showAbout || showProjects
              ? { opacity: 0, x: getHomeExitX() }
              : { opacity: 1, x: 0 }
          }
          exit={{ opacity: 1, x: -2000 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full sm:overflow-auto sm:scrollbar-hide"
          onAnimationComplete={() => setFirstLoad(false)}
        >
          <div className="flex flex-col items-center justify-center gap-5 px-5 md:px-0 mt-20 md:mt-32 pb-10 sm:pb-0">
            <Card />
            <Folder />
          </div>
        </motion.div>

        {showProjects && (
          <motion.div
            key="projects"
            initial={{ opacity: 1, x: 2000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 2000 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full sm:overflow-auto sm:scrollbar-hide"
          >
            <Projects />
          </motion.div>
        )}

        {showAbout && (
          <motion.div
            key="about"
            initial={{ opacity: 1, x: -2000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -2000 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full sm:overflow-y-auto sm:scrollbar-hide"
          >
            <About />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
