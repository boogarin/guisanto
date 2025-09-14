"use client";

import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconPinFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateWords } from "../hooks/RotableText";
import { usePageStore } from "../store/usePageStore";
import { useLocaleStore } from "../store/useLocaleStore";
import { useTranslations } from "next-intl";
import { useSoundStore } from "@/store/useSoundStore";
import useSound from "use-sound";

export default function Card() {
  const firstLoad = usePageStore((state) => state.firstLoad);

  const t = useTranslations("Card");
  const t2 = useTranslations("Card.description");
  const locale = useLocaleStore((state) => state.locale);

  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  return (
    <motion.div
      initial={
        firstLoad ? { height: 60, opacity: 0 } : { height: "auto", opacity: 0 }
      }
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-lg bg-white border-b-1 border-r-1 rounded-xl border-[#cecece] shadow-md 
      dark:bg-[#29292b] dark:border-[#504f4f]"
    >
      <div
        className="w-full h-full border-t-1 border-l-1 rounded-xl border-[#DFDFDF]
      dark:border-[#555555]"
      >
        <div className="flex w-full justify-end p-4 px-5 items-center rounded-t-xl -mb-13">
          <IconPinFilled className="text-[#4B4B4C] dark:text-white" />
        </div>

        <motion.div
          initial={firstLoad ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
          className="flex gap-3 md:gap-5 p-8 max-w-lg"
        >
          <div className="h-24 w-24 relative">
            <Image
              src="/avatar.jpeg"
              alt="Avatar"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-base md:text-lg font-semibold text-[#4B4B4C] dark:text-white">
                Guilherme Galvão
              </span>
              <RotateWords
                text={locale === "pt-BR" ? "Desenvolvedor" : "Developer"}
                words={[
                  { text: "Front-end", color: "#01baef" },
                  { text: "Fullstack", color: "#8850ff" },
                  { text: "UI/UX", color: "#0acf83" },
                ]}
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-0.5 md:gap-1.5">
              <button
                onClick={() => {
                  window.open("https://www.github.com/boogarin", "_blank");
                  play();
                }}
                className="flex gap-1 items-center cursor-none hover:scale-102 transition px-2 border bg-white hover:bg-[#fbfbfb] duration-300 border-[#4B4B4C] rounded-lg
               dark:border-black dark:bg-black dark:hover:bg-black"
              >
                <IconBrandGithubFilled
                  className="text-black dark:text-white"
                  size={16}
                />
                <span className="text-black text-sm md:text-base dark:text-white">
                  Github
                </span>
              </button>
              <button
                onClick={() => {
                  (window.open(
                    "https://www.linkedin.com/in/guisantoge/",
                    "_blank",
                  ),
                    play());
                }}
                className="flex gap-1 items-center cursor-none hover:scale-102 transition px-2 border bg-[#0a66c2] hover:bg-[#055bb0] border-[#055bb0] duration-300 text-white rounded-lg"
              >
                <IconBrandLinkedinFilled size={16} />
                <span className="text-sm md:text-lg">LinkedIn</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={firstLoad ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
          className="flex flex-col p-8 -mt-11 w-full"
        >
          <span className="mb-1 font-semibold text-[#4B4B4C] dark:text-white">
            {t("aboutMe")}
          </span>
          <span className="text-sm text-[#4B4B4C] dark:text-[#FFFFFF85] text-justify">
            {t2("part1")}
            <strong>{t2("tech")}</strong>
            {t2("part2")}
            <strong>{t2("designTools")}</strong>
            {t2("part3")}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
