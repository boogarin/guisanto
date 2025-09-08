import { useSoundStore } from "@/store/useSoundStore";
import {
  IconBrandFigma,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandTailwind,
  IconBrandTypescript,
  IconDeviceMobile,
  IconHammer,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import useSound from "use-sound";

export default function Kastor() {
  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  const t = useTranslations("Projects");

  return (
    <div className="w-full grid md:grid-cols-2 gap-2 md:gap-5">
      <div
        className="flex w-full justify-between py-3 px-4 pl-7 bg-[#ffd230] bg-cover rounded-xl relative overflow-hidden gap-2
        dark:bg-[#29292b] dark:border-1 dark:border-[#3b3b3b] dark:bg-blend-darken"
        style={{ backgroundImage: "url('/images/kastorOverlay.png')" }}
      >
        <div className="relative w-1/3 h-full">
          <Image
            src="/images/kastor.png"
            alt="Kastor"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-center h-full gap-5 py-3 text-black dark:text-white w-2/3 px-4 ml-3 -mt-0.5">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Kastor</p>
            <span className="-mt-1 opacity-75">kastor.com.br</span>
          </div>
          <button
            onClick={() => {
              (window.open("https://www.kastor.com.br/", "_blank"), play());
            }}
            className="cursor-none dark:text-black bg-[#ffca1d] hover:bg-amber-400 hover:scale-102 transition duration-300 font-semibold w-fit p-2 px-5 rounded-md"
          >
            {t("visit")}
          </button>
        </div>
      </div>
      <div className="py-2">
        <div className="flex flex-col pb-0.5 border-l-5 border-[#cecece] pl-3 text-[#4B4B4C] dark:border-[#504f4f] dark:text-white dark:opacity-80 mt-2 md:mt-0">
          <span>{t("kastorDesc")}</span>
          <span className="font-semibold">{t("kastorRole")}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 text-sm md:text-base">
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandReact size={18} color={"#61dafb"} className="mt-0.5" />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">React</span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandReactNative
              size={18}
              color={"#61dafb"}
              className="mt-0.5"
            />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              React Native
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandTypescript
              size={18}
              color={"#3178c6"}
              className="mt-0.5"
            />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Typescript
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandNextjs size={18} color={"#000000"} className="mt-0.5" />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Next.js
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandTailwind size={18} color={"#38bdf8"} className="mt-0.5" />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">
              Tailwind
            </span>
          </div>
          <div className="flex gap-3 w-fit items-center p-1 py-1.5 px-3 pr-4 rounded-lg bg-[#f2f2f2] dark:bg-[#2a2a2c]">
            <IconBrandFigma size={18} color={"#8850ff"} className="mt-0.5" />
            <span className="text-[#4B4B4C] dark:text-[#FFFFFF90]">Figma</span>
          </div>
        </div>
      </div>
    </div>
  );
}
