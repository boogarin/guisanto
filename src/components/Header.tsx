"use client";

import { useEffect, useState } from "react";
import {
  IconSun,
  IconPencil,
  IconLanguage,
  IconMoon,
  IconVolume,
  IconVolume3,
} from "@tabler/icons-react";
import Edit from "./Edit";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/useThemeStore";
import { useLocaleStore } from "../store/useLocaleStore";
import { useSoundStore } from "../store/useSoundStore";

export default function Header() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { darkMode, setDarkMode, toggleDarkMode } = useThemeStore();
  const { volume, toggleSound } = useSoundStore();
  const { locale, setLocale } = useLocaleStore();

  const [play] = useSound("/click.mp3", {
    volume: 0.4,
    soundEnabled: volume,
  });
  const [playVolume] = useSound("/click.mp3", {
    volume: 0.4,
  });

  const getInitialTheme = (): boolean => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  useEffect(() => {
    setDarkMode(getInitialTheme());

    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    );
    setIsMobile(isMobileDevice);
  }, [setDarkMode]);

  const toggleLocale = () => {
    setLocale(locale === "en-US" ? "pt-BR" : "en-US");
  };

  return (
    <>
      <Edit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      <div className="flex fixed top-2.5 md:top-5 px-5 w-full justify-between z-20">
        <div className="flex gap-2">
          <button
            onClick={() => {
              toggleDarkMode();
              play();
            }}
            className="cursor-none bg-white hover:bg-[#f9f9f9] p-2 px-2.5 hover:scale-104 transition duration-300 shadow-sm border border-[#DFDFDF] rounded-lg
            dark:bg-[#1c1c1e] dark:hover:bg-[#1e1e20] dark:border-[#504f4f] dark:text-white"
          >
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>

          <button
            onClick={() => {
              toggleSound();
              playVolume();
            }}
            className="cursor-none bg-white hover:bg-[#f9f9f9] p-2 px-2.5 hover:scale-104 transition duration-300 shadow-sm border border-[#DFDFDF] rounded-lg
            dark:bg-[#1c1c1e] dark:hover:bg-[#1e1e20] dark:border-[#504f4f] dark:text-white"
          >
            {volume ? <IconVolume /> : <IconVolume3 />}
          </button>

          <div
            className="relative flex items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              onClick={() => {
                toggleLocale();
                play();
              }}
              className="cursor-none p-2 px-2.5 bg-white hover:bg-[#f9f9f9] hover:scale-104 transition duration-300 shadow-sm border border-[#DFDFDF] rounded-lg
              dark:bg-[#1c1c1e] dark:hover:bg-[#1e1e20] dark:border-[#504f4f] dark:text-white flex items-center"
            >
              <IconLanguage />
            </button>

            <AnimatePresence mode="wait">
              {hovered && (
                <motion.span
                  key={locale}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2.5 whitespace-nowrap dark:text-white"
                >
                  {locale === "en-US" ? "English" : "Português"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          {!isMobile && (
            <button
              onClick={() => {
                setIsEditOpen(true);
                play();
              }}
              className="cursor-none p-2 px-2.5 bg-white hover:bg-[#f9f9f9] hover:scale-104 transition duration-300 shadow-sm border border-[#DFDFDF] rounded-lg
              dark:bg-[#1c1c1e] dark:hover:bg-[#1e1e20] dark:border-[#504f4f] dark:text-white"
            >
              <IconPencil />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
