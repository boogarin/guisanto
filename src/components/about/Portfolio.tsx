import { useSoundStore } from "@/store/useSoundStore";
import { motion } from "framer-motion";
import Image from "next/image";
import useSound from "use-sound";

export default function Portfolio() {
  const jobapp = ["/images/columns.png"];
  const imatch = ["images/columns2.png"];

  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  return (
    <div className="w-full grid grid-cols-2 gap-4 sm:px-5">
      <div
        className="cursor-none h-60 bg-blue-400 rounded-xl p-10 overflow-hidden relative hover:scale-102 transition duration-300
      dark:bg-[#29292b] dark:border-1 dark:border-[#3b3b3b]"
      >
        <motion.button
          className="cursor-none absolute top-0 left-0 w-full flex flex-col gap-3 opacity-20 lg:opacity-80"
          onClick={() => {
            window.open(
              "https://www.figma.com/design/YU3TJglsqV4zroLU6NlEkr/Jobapp?node-id=0-1&t=jetdO9Cp3Gddc4Tv-1",
              "_blank",
            );
            play();
          }}
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          <div className="flex ml-5 -mt-20">
            {jobapp.map((src, i) => (
              <img key={i} src={src} className="w-60" alt={`Column${i}`} />
            ))}
          </div>

          <div className="flex ml-5 -mt-20">
            {jobapp.map((src, i) => (
              <img
                key={i + jobapp.length}
                src={src}
                className="w-60"
                alt={`Column${i}`}
              />
            ))}
          </div>

          <div className="flex ml-5 -mt-20">
            {jobapp.map((src, i) => (
              <img
                key={i + jobapp.length * 2}
                src={src}
                className="w-60"
                alt={`Column${i}`}
              />
            ))}
          </div>
        </motion.button>

        <button
          onClick={() => {
            window.open(
              "https://www.figma.com/design/YU3TJglsqV4zroLU6NlEkr/Jobapp?node-id=0-1&t=jetdO9Cp3Gddc4Tv-1",
              "_blank",
            );
            play();
          }}
          className="cursor-none absolute top-15 right-10 lg:right-10 lg:top-5 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 w-20 h-28 flex flex-col items-center"
        >
          <div className="relative w-20 h-20">
            <Image
              src="/images/jobappIcon.png"
              alt="Jobapp"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-white mt-2">Jobapp</span>
        </button>
      </div>

      {/* SEGUNDO CARD */}

      <div
        className="cursor-none h-60 bg-gradient-to-br from-[#BA69F6] to-[#6480FE] rounded-xl p-10 overflow-hidden relative hover:scale-102 transition duration-300
       dark:from-[#29292b] dark:to-[#29292b] dark:border-1 dark:border-[#3b3b3b]"
      >
        <motion.button
          className="cursor-none absolute top-0 left-0 w-full flex flex-col gap-3 opacity-20 lg:opacity-80"
          onClick={() => {
            window.open(
              "https://www.figma.com/design/lAhdnJhv3oRszPLwvyGtUE/iMatch?node-id=550-434&t=Gm34KfFj14gyokTn-1",
              "_blank",
            );
            play();
          }}
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex ml-5 -mt-28">
            {imatch.map((src, i) => (
              <img key={i} src={src} className="w-60" alt={`Column${i}`} />
            ))}
          </div>

          <div className="flex ml-5 -mt-28">
            {imatch.map((src, i) => (
              <img
                key={i + imatch.length}
                src={src}
                className="w-60"
                alt={`Column${i}`}
              />
            ))}
          </div>

          <div className="flex ml-5 -mt-28">
            {imatch.map((src, i) => (
              <img
                key={i + imatch.length * 2}
                src={src}
                className="w-60"
                alt={`Column${i}`}
              />
            ))}
          </div>
        </motion.button>

        <button
          onClick={() => {
            window.open(
              "https://www.figma.com/design/lAhdnJhv3oRszPLwvyGtUE/iMatch?node-id=550-434&t=Gm34KfFj14gyokTn-1",
              "_blank",
            );
            play();
          }}
          className="cursor-none absolute top-15 right-10 lg:right-10 lg:top-5 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 w-20 h-28 flex flex-col items-center"
        >
          <div className="relative w-20 h-20">
            <Image
              src="/images/iMatchIcon.png"
              alt="iMatch"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-white mt-2">iMatch</span>
        </button>
      </div>
    </div>
  );
}
