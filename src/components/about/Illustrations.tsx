"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSoundStore } from "@/store/useSoundStore";
import useSound from "use-sound";

const previews = [
  {
    id: "p1",
    src: "/images/preview1.png",
    full: "/images/image1.png",
    rotate: -6,
    ml: 0,
    mt: 0,
  },
  {
    id: "p2",
    src: "/images/preview2.png",
    full: "/images/image2.png",
    rotate: 6,
    ml: -56,
    mt: 24,
  },
  {
    id: "p3",
    src: "/images/preview3.png",
    full: "/images/image3.jpeg",
    rotate: -8,
    ml: -48,
    mt: 0,
  },
  {
    id: "p4",
    src: "/images/preview4.png",
    full: "/images/image4.jpeg",
    rotate: 4,
    ml: -50,
    mt: 8,
  },
];

export default function Illustrations() {
  const [selected, setSelected] = useState<(typeof previews)[0] | null>(null);
  const baseDelay = 2.2;

  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  return (
    <>
      <div className="flex -mt-6 sm:mt-8 md:mt-4 lg:mt-8 -mb-10 sm:mb-4 relative justify-center">
        {previews.map((p, i) => (
          <motion.button
            key={p.id}
            className="cursor-none relative w-[248px] h-[240px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: baseDelay + i * 0.5,
              duration: 1.8,
              type: "spring",
              stiffness: 300,
              damping: 20,
              ease: "easeOut",
            }}
            style={{
              marginLeft: `${p.ml}px`,
              marginTop: `${p.mt}px`,
            }}
            onClick={() => {
              setSelected(p);
              play();
            }}
          >
            <motion.div layoutId={p.id} className="w-full h-full">
              <motion.div
                initial={false}
                animate={{ rotate: p.rotate }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ transformOrigin: "center center" }}
                className="w-full h-full transition duration-300 hover:scale-102 rounded-lg"
              >
                <Image
                  draggable={false}
                  src={p.src}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg select-none md:shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelected(null);
              play();
            }}
          >
            <motion.div
              layoutId={selected.id}
              className="relative w-[80%] h-[80%] max-w-4xl max-h-[80vh]"
            >
              <motion.div
                initial={false}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ transformOrigin: "center center" }}
                className="w-full h-full"
              >
                <Image
                  src={selected.full}
                  alt="Full"
                  fill
                  className="object-contain rounded-xl shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
