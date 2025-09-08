"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocaleStore } from "@/store/useLocaleStore";

export interface Word {
  text: string;
  color: string;
}

interface RotateWordsProps {
  text: string;
  words: Word[];
}

export const RotateWords: React.FC<RotateWordsProps> = ({ text, words }) => {
  const [index, setIndex] = React.useState<number>(0);

  const locale = useLocaleStore((state) => state.locale);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      layout
      className="absolute text-sm md:text-base text-[#4B4B4C] dark:text-[#FFFFFF85] text-center w-fit flex items-center justify-center mx-auto gap-1.5 -mt-0.5"
    >
      {locale === "pt-BR" ? text : null}
      <AnimatePresence mode={locale === "en-US" ? "popLayout" : "wait"}>
        <motion.p
          key={words[index].text}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          className="font-semibold text-sm md:text-base"
          style={{ color: words[index].color }}
        >
          <motion.span>{words[index].text}</motion.span>
        </motion.p>
      </AnimatePresence>
      {locale === "en-US" ? text : null}
    </motion.div>
  );
};
