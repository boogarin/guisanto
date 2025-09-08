"use client";

import { IconMail, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { useDragConstraints } from "../hooks/DragConstraints";
import { useSoundStore } from "../store/useSoundStore";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact({ isOpen, onClose }: Props) {
  const { volume } = useSoundStore();
  const [close] = useSound("/close.mp3", { volume: 0.4, soundEnabled: volume });
  const [pop] = useSound("/pop.mp3", { volume: 0.4, soundEnabled: volume });

  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const constraints = useDragConstraints(modalRef, 20, isOpen);

  const t = useTranslations("Contact");

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    );
    setIsMobile(isMobileDevice);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("guisanto@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    pop();
  };

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
        className={`fixed cursor-none z-100 bg-white dark:bg-[#29292b] 
          ${
            isMobile
              ? "bottom-0 left-0 w-full h-[80%] rounded-t-2xl shadow-lg"
              : "top-20 left-20 sm:w-md border-[0.5px] border-[#cecece] rounded-2xl shadow-md dark:border-[#504f4f]"
          }`}
      >
        <div
          className={`${isMobile ? "" : "rounded-xl border-[#DFDFDF] dark:border-[#555555]"} w-full h-full`}
        >
          <div
            className={`flex w-full justify-between items-center p-3 px-5 rounded-t-xl cursor-none ${
              isMobile ? "bg-[#6532d2]" : "bg-[#6532d2] dark:bg-[#373739]"
            }`}
          >
            <div className="flex gap-3 items-center">
              <IconMail className="text-white dark:text-[#8850ff]" />
              <span className="text-lg text-white tracking-widest font-semibold">
                {t("contact")}
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

          <div className="h-[80%] overflow-y-auto">
            <div
              className={`flex flex-col w-full p-6 pb-8 px-8 gap-4 flex-1 overflow-y-auto`}
            >
              <div className="text-center mb-5 text-[#4B4B4C] dark:text-[#FFFFFF90]">
                {t("description")}
                <button
                  onClick={handleCopy}
                  className="cursor-none font-semibold ml-1 text-[#8850ff] hover:underline hover:decoration-wavy transition relative"
                >
                  guisanto@proton.me
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-2 rounded-md"
                      >
                        {t("copied")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
