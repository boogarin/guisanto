import { useSoundStore } from "@/store/useSoundStore";
import {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandFigma,
  IconBrandFramerMotion,
} from "@tabler/icons-react";
import Image from "next/image";
import useSound from "use-sound";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Procics() {
  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  const t = useTranslations("Projects");

  return (
    <div className="w-full grid md:grid-cols-2 gap-2 md:gap-5">
      <div
        className="flex justify-between py-3 px-4 pl-7 bg-[#373737] rounded-xl relative overflow-hidden
      dark:bg-[#29292b] dark:border-1 dark:border-[#3b3b3b] dark:bg-blend-darken"
      >
        <div className="relative w-1/3 h-full">
          <Image
            src="/images/procics.png"
            alt="PROCICS"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-5 py-3 text-white w-2/3 px-4 ml-3 -mt-0.5">
          <div className="flex flex-col">
            <p className="font-bold text-lg w-fit text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text z-21">
              PROCICS
            </p>
            <span className="-mt-1 opacity-75 z-21">procics.com.br</span>
          </div>
          <button
            onClick={() => {
              (window.open("https://www.procics.com.br", "_blank"), play());
            }}
            className="cursor-none bg-white text-[#131b37] hover:scale-102 transition duration-300 font-semibold w-fit p-2 px-5 rounded-md
              hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-300 hover:to-purple-400 z-21"
          >
            {t("visit")}
          </button>
        </div>

        <div className="absolute w-full h-auto ml-34 -mt-5 opacity-70 z-10">
          <motion.svg
            className="absolute"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, ease: "easeInOut", duration: 3 }}
            width="267"
            height="319"
            viewBox="0 0 467 519"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M303.449 8.10281L466.15 99.784L404.57 197.027"
              stroke="#ddb5ff"
              strokeLinejoin="round"
            />
            <path
              d="M43.5126 467.782L87.6878 406.699"
              stroke="#C587F9"
              strokeLinejoin="round"
            />
            <path
              d="M136.215 71.7023C138.079 69.0977 141.197 67.6393 144.391 67.8778L297.997 79.3355C301.191 79.5739 303.979 81.472 305.309 84.3153L369.266 221.029C370.596 223.872 370.266 227.229 368.402 229.834L278.752 355.09C276.888 357.695 273.77 359.153 270.576 358.915L116.969 347.457C113.775 347.218 110.987 345.32 109.658 342.477L45.7012 205.763C44.371 202.92 44.7002 199.563 46.5647 196.958L136.215 71.7023Z"
              stroke="#C587F9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 268.948L130.11 216.632"
              stroke="#ddb5ff"
              strokeLinejoin="round"
              transform="translate(-X,80)"
            />
          </motion.svg>
        </div>
      </div>
      <div className="py-2">
        <div className="flex flex-col pb-0.5 border-l-5 border-[#cecece] pl-3 text-[#4B4B4C] dark:border-[#504f4f] dark:text-white dark:opacity-80">
          <span>{t("procicsDesc")}</span>
          <span className="font-semibold">{t("procicsRole")}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 text-sm md:text-base">
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandReact size={20} color={"#61dafb"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">React</span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 pb-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandTypescript size={20} color={"#3178c6"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Typescript
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandNextjs size={20} color={"#000000"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Next.js
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandTailwind size={20} color={"#38bdf8"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Tailwind
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandFramerMotion size={20} color={"#ffca1d"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">Motion</span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandFigma size={20} color={"#8850ff"} />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">Figma</span>
          </div>
        </div>
      </div>
    </div>
  );
}
