import localFont from "next/font/local";
import Kastor from "./projects/Kastor";
import Procics from "./projects/Procics";
import Quewe from "./projects/Quewe";
import { usePageStore } from "@/store/usePageStore";
import { IconArrowLeft } from "@tabler/icons-react";
import { useSoundStore } from "@/store/useSoundStore";
import useSound from "use-sound";
import { useTranslations } from "next-intl";

const robotoCondensed = localFont({
  src: "../../public/fonts/RobotoCondensed.ttf",
  variable: "--font-roboto",
});

export default function Projects() {
  const togglePageProjects = usePageStore((state) => state.togglePageProjects);

  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  const t = useTranslations("Projects");

  return (
    <div className="flex w-full flex-col min-h-screen lg:overflow-y-auto lg:scrollbar-hide px-5 lg:px-0 pt-22 sm:pt-[6.65rem] lg:pb-20">
      <div className="w-full sm:w-2xl md:w-3xl xl:w-4xl flex flex-col mx-auto justify-center">
        <button
          onClick={() => {
            togglePageProjects();
            play();
          }}
          className="2xl:fixed cursor-none flex 2xl:-ml-48 sm:top-18 gap-3 items-center 2xl:mt-10 mb-5 2xl:mb-10 px-6 pr-9 w-fit py-2 bg-white hover:bg-[#f2f2f2] text-lg text-[#4B4B4C] rounded-md shadow-sm border-1 border-dashed border-black transition
          dark:bg-[#29292b] dark:border-[#787878] dark:text-white dark:hover:bg-[#373739]"
        >
          <IconArrowLeft size={20} />
          <span>{t("goBack")}</span>
        </button>
        <span
          className={`text-2xl text-[#4B4B4C] dark:text-[#FFFFFF90] font-bold border-b-5 border-[#01baef] w-fit -pb-2 ${robotoCondensed.className}`}
        >
          {t("personal")}
        </span>
        <div className="flex flex-col gap-3 mt-5 mb-10">
          <Quewe />
        </div>

        <span
          className={`text-2xl text-[#4B4B4C] dark:text-[#FFFFFF90] font-bold border-b-5 border-[#0acf83] w-fit -pb-2 ${robotoCondensed.className}`}
        >
          {t("professional")}
        </span>
        <div className="flex flex-col gap-5 mt-5 pb-10 lg:pb-0">
          <Procics />
          <Kastor />
        </div>
      </div>
    </div>
  );
}
