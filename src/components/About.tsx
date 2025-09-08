import localFont from "next/font/local";
import { usePageStore } from "@/store/usePageStore";
import { useSoundStore } from "@/store/useSoundStore";
import useSound from "use-sound";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, easeIn } from "framer-motion";
import Illustrations from "./about/Illustrations";
import Image from "next/image";
import { IconArrowLeft } from "@tabler/icons-react";
import Portfolio from "./about/Portfolio";

const robotoCondensed = localFont({
  src: "../../public/fonts/RobotoCondensed.ttf",
  variable: "--font-roboto",
});

const kleeOne = localFont({
  src: "../../public/fonts/KleeOne-Regular.ttf",
  variable: "--font-klee",
});

export default function About() {
  const togglePageAbout = usePageStore((state) => state.togglePageAbout);
  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });
  const t = useTranslations("About");

  const motionText = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 1, ease: easeIn },
  });

  return (
    <div className="flex flex-col w-full min-h-screen lg:overflow-y-auto lg:scrollbar-hide px-5 lg:px-0 pt-22 sm:pt-[6.65rem] lg:pb-20 bg-[#FFFFFF80]">
      <div className="w-full sm:w-2xl md:w-3xl 3xl:w-4xl mx-auto flex flex-col gap-5">
        <button
          onClick={() => {
            togglePageAbout();
            play();
          }}
          className="2xl:fixed cursor-none flex 2xl:-ml-48 sm:top-18 gap-3 items-center 2xl:mt-10 mb-5 2xl:mb-10 px-6 pr-9 w-fit py-2 bg-white hover:bg-[#f2f2f2] text-lg text-[#4B4B4C] rounded-md shadow-sm border-1 border-dashed border-black transition
          dark:bg-[#29292b] dark:border-[#787878] dark:text-white dark:hover:bg-[#373739]"
        >
          <IconArrowLeft size={20} />
          <span>{t("goBack")}</span>
        </button>

        <div className="relative w-full -mt-5 sm:mt-0">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4B4B4C] dark:text-[#FFFFFF90] ${robotoCondensed.className}`}
          >
            {t("aboutMe")}
          </h1>
          <svg
            className="absolute mt-1 w-60 h-2"
            viewBox="0 0 600 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1="0"
              y1="2.5"
              x2="600"
              y2="2.5"
              stroke="#A957F7"
              strokeWidth="15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.5, ease: easeIn }}
            />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] sm:text-lg ${kleeOne.className} text-justify mt-5`}
            {...motionText(0.8)}
          >
            {t("line1")}
          </motion.p>

          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] sm:text-lg ${kleeOne.className} text-justify`}
            {...motionText(1.4)}
          >
            {t("line2")}
          </motion.p>

          <Illustrations />

          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] text-center mt-3 text-sm ${kleeOne.className}`}
            {...motionText(3.5)}
          >
            {t("preview")}
          </motion.p>

          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] sm:text-lg ${kleeOne.className} text-justify mt-2 mb-4`}
            {...motionText(4.2)}
          >
            {t("line3")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.8, ease: easeIn }}
          >
            <Portfolio />
          </motion.div>

          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] sm:text-lg ${kleeOne.className} text-justify mt-3`}
            {...motionText(5.4)}
          >
            {t("line4")}
          </motion.p>

          <motion.p
            className={`text-[#4B4B4C] dark:text-[#FFFFFF90] sm:text-lg ${kleeOne.className} text-justify pb-10`}
            {...motionText(6)}
          >
            {t("line5")}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
