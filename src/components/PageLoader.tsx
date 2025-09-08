"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/useThemeStore";

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setDarkMode } = useThemeStore();
  const [loading, setLoading] = useState(true);
  const [showFace, setShowFace] = useState(true);

  useEffect(() => {
    setDarkMode(getInitialTheme());

    const faceTimer = setTimeout(() => setShowFace(false), 2000);
    const loaderTimer = setTimeout(() => setLoading(false), 4000);

    return () => {
      clearTimeout(faceTimer);
      clearTimeout(loaderTimer);
    };
  }, [setDarkMode]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#1c1c1e]"
          >
            <AnimatePresence>
              {showFace && (
                <motion.div
                  key="face"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="text-[#4B4B4C] dark:text-[#FFFFFF90]"
                >
                  Seja bem vindo!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && children}
    </>
  );
}
