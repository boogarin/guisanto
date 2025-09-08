"use client";

import {
  IconBrandAdobeIllustrator,
  IconBrandAdobePhotoshop,
  IconBrandAngular,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandFramerMotion,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconCode,
  IconGitBranch,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useDragConstraints } from "../hooks/DragConstraints";
import { useSoundStore } from "../store/useSoundStore";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface List {
  label: string;
  icon: React.ElementType;
  color: string;
}

const items: List[] = [
  { label: "Javascript", icon: IconBrandJavascript, color: "#f7df1e" },
  { label: "Typescript", icon: IconBrandTypescript, color: "#3178c6" },
  { label: "HTML", icon: IconBrandHtml5, color: "#e44d26" },
  { label: "Angular", icon: IconBrandAngular, color: "#dd0031" },
  { label: "Node.js", icon: IconBrandNodejs, color: "#80be03" },

  { label: "React", icon: IconBrandReact, color: "#61dafb" },
  { label: "React Native", icon: IconBrandReactNative, color: "#61dafb" },
  { label: "Next.js", icon: IconBrandNextjs, color: "#000000" },
  { label: "Tailwind", icon: IconBrandTailwind, color: "#38bdf8" },
  { label: "Motion", icon: IconBrandFramerMotion, color: "#ffca1d" },

  { label: "Firebase", icon: IconBrandFirebase, color: "#ffcb2e" },
  { label: "Supabase", icon: IconBrandSupabase, color: "#3dcf8e" },
  { label: "MongoDB", icon: IconBrandMongodb, color: "#11aa50" },

  { label: "Docker", icon: IconBrandDocker, color: "#1e96ed" },
  { label: "Vercel", icon: IconBrandVercel, color: "#000000" },
  { label: "Git", icon: IconGitBranch, color: "#f05133" },
  { label: "Github", icon: IconBrandGithub, color: "#000000" },

  { label: "Figma", icon: IconBrandFigma, color: "#8850ff" },
  { label: "Photoshop", icon: IconBrandAdobePhotoshop, color: "#31a8ff" },
  { label: "Illustrator", icon: IconBrandAdobeIllustrator, color: "#ff9a00" },
];

export default function Skills({ isOpen, onClose }: Props) {
  const { volume } = useSoundStore();
  const [close] = useSound("/close.mp3", { volume: 0.4, soundEnabled: volume });

  const modalRef = useRef<HTMLDivElement>(null);
  const constraints = useDragConstraints(modalRef, 20, isOpen);

  const t = useTranslations("Skills");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    );
    setIsMobile(isMobileDevice);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        drag={!isMobile}
        dragConstraints={constraints}
        dragMomentum={false}
        dragElastic={0}
        initial={{
          opacity: 0,
          y: isMobile ? "100%" : 0,
          scale: isMobile ? 1 : 0.9,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: isMobile ? "100%" : 0,
          scale: isMobile ? 1 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed cursor-none z-100 bg-white dark:bg-[#29292b] dark:border-[#504f4f] 
          ${
            isMobile
              ? "bottom-0 left-0 w-full h-[85%] rounded-t-2xl shadow-lg"
              : "top-12 left-10 sm:w-md border-[0.5px] border-[#cecece] dark:border-[#504f4f] rounded-2xl shadow-md"
          }`}
      >
        <div
          className={`w-full h-full ${isMobile ? "" : "rounded-xl border-[#DFDFDF] dark:border-[#555555]"}`}
        >
          <div
            className={`flex w-full justify-between items-center p-3 px-5 rounded-t-xl ${isMobile ? "bg-[#01baef]" : "bg-[#01baef] dark:bg-[#373739]"}`}
          >
            <div className="flex gap-3 items-center">
              <IconCode className="text-white" />
              <span className="text-lg text-white tracking-widest font-semibold">
                {t("skills")}
              </span>
            </div>
            <button
              className="hoverable cursor-none"
              onClick={() => {
                close();
                onClose();
              }}
            >
              <IconX className="hoverable" color="#FFFFFF" />
            </button>
          </div>

          <div className="h-[90%] overflow-y-auto">
            <div className="flex flex-col w-full p-5 pb-7 px-8 gap-1.5 overflow-y-auto">
              <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] font-semibold">
                {t("languages")}
              </span>
              <div className="w-full grid grid-cols-2 gap-1 gap-x-1.5">
                {items.slice(0, 5).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex gap-3 items-center p-1 rounded-lg ${
                        index % 3 === 0
                          ? "bg-[#f2f2f2] dark:bg-[#333335]"
                          : "bg-[#f2f2f2] dark:bg-[#333335]"
                      }`}
                    >
                      <Icon color={item.color} />
                      <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] font-semibold mt-3">
                {t("frameworks")}
              </span>
              <div className="w-full grid grid-cols-2 gap-1 gap-x-1.5">
                {items.slice(6, 10).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex gap-3 items-center p-1 rounded-lg ${
                        index % 3 === 0
                          ? "bg-[#f2f2f2] dark:bg-[#333335]"
                          : "bg-[#f2f2f2] dark:bg-[#333335]"
                      }`}
                    >
                      <Icon color={item.color} />
                      <span className="mt-0.5 text-[#4B4B4C] dark:text-[#FFFFFF90]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] font-semibold mt-3">
                {t("database")}
              </span>
              <div className="w-full grid grid-cols-2 gap-1 gap-x-1.5">
                {items.slice(11, 13).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex gap-3 items-center p-1 rounded-lg ${
                        index % 3 === 0
                          ? "bg-[#f2f2f2] dark:bg-[#333335]"
                          : "bg-[#f2f2f2] dark:bg-[#333335]"
                      }`}
                    >
                      <Icon color={item.color} />
                      <span className="mt-0.5 text-[#4B4B4C] dark:text-[#FFFFFF90]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] font-semibold mt-3">
                {t("devops")}
              </span>
              <div className="w-full grid grid-cols-2 gap-1 gap-x-1.5">
                {items.slice(14, 17).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex gap-3 items-center p-1 rounded-lg ${
                        index % 3 === 0
                          ? "bg-[#f2f2f2] dark:bg-[#333335]"
                          : "bg-[#f2f2f2] dark:bg-[#333335]"
                      }`}
                    >
                      <Icon color={item.color} />
                      <span className="mt-0.5 text-[#4B4B4C] dark:text-[#FFFFFF90]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] font-semibold mt-3">
                {t("tools")}
              </span>
              <div className="w-full grid grid-cols-2 gap-1 gap-x-1.5">
                {items.slice(18, 21).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex gap-3 items-center p-1 rounded-lg ${
                        index % 3 === 0
                          ? "bg-[#f2f2f2] dark:bg-[#333335]"
                          : "bg-[#f2f2f2] dark:bg-[#333335]"
                      }`}
                    >
                      <Icon color={item.color} />
                      <span className="mt-0.5 text-[#4B4B4C] dark:text-[#FFFFFF90]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
