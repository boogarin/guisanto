import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Quewe() {
  const t = useTranslations("Projects");

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div
        className="flex justify-between h-40 py-3 px-4 pl-7 bg-[#c1e1e9] rounded-xl
      dark:bg-[#29292b] dark:border-1 dark:border-[#3b3b3b] dark:bg-blend-darken"
      >
        <div className="relative w-1/3 h-full">
          <Image
            src="/images/quewe.png"
            alt="Quewe"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-5 py-3 w-2/3 px-4 ml-3 -mt-0.5">
          <div className="flex flex-col">
            <p className="font-bold text-lg text-[#14ABC6]">Quewe</p>
            <span className="-mt-1 opacity-50 text-black dark:text-white">
              quewe.com
            </span>
          </div>
          <span className="bg-[#14ABC6] font-semibold opacity-60 text-white w-fit p-2 px-5 rounded-md">
            {t("comingSoon")}
          </span>
        </div>
      </div>
    </div>
  );
}
