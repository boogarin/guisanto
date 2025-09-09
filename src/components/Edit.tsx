"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useDragConstraints } from "../hooks/DragConstraints";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useVisitorStore } from "../store/useVisitorStore";
import { useSoundStore } from "../store/useSoundStore";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Edit({ isOpen, onClose }: Props) {
  const { volume } = useSoundStore();
  const [close] = useSound("/close.mp3", { volume: 0.4, soundEnabled: volume });
  const [pop] = useSound("/pop.mp3", { volume: 0.3, soundEnabled: volume });

  const modalRef = useRef<HTMLDivElement>(null);
  const constraints = useDragConstraints(modalRef, 20, isOpen);

  const cursorName = useVisitorStore((state) => state.cursorName);
  const setCursorName = useVisitorStore((state) => state.setCursorName);
  const cursorColor = useVisitorStore((state) => state.cursorColor);
  const setCursorColor = useVisitorStore((state) => state.setCursorColor);

  const colors = [
    "#01baef",
    "#ff3736",
    "#8850ff",
    "#0acf83",
    "#ff8c00",
    "#ff6392",
  ];

  const t = useTranslations("Edit");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        drag
        dragConstraints={constraints}
        dragMomentum={false}
        dragElastic={0}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute cursor-none top-20 right-10 sm:w-md bg-white border-b-1 border-r-1 rounded-xl border-[#cecece] shadow-md z-103
        dark:bg-[#29292b] dark:border-[#504f4f]"
      >
        <div
          className="w-full border-t-1 border-l-1 rounded-xl border-[#DFDFDF] text-[]
        dark:border-[#555555]"
        >
          <div
            className="handle flex w-full justify-between items-center p-3 px-5 rounded-t-xl bg-[#F6F9FC]
          dark:bg-[#373739]"
          >
            <div className="flex gap-3 items-center">
              <IconPencil className="text-[#4B4B4C] dark:text-white" />
              <span className="text-lg text-[#4B4B4C] dark:text-[#FFFFFF90] tracking-widest font-semibold">
                {t("edit")}
              </span>
            </div>
            <button
              className="hoverable cursor-none"
              onClick={() => {
                close();
                onClose();
              }}
            >
              <IconX className="hoverable text-[#4B4B4C] dark:text-white" />
            </button>
          </div>
          <div className="flex flex-col p-5 pb-6 px-6">
            <div className="w-full p-3 py-4 border border-[#dfdfdf] dark:border-[#504f4f] rounded-lg">
              <div className="flex justify-between pt-0.5 pl-1 pr-3">
                <span className="text-[#4B4B4C] dark:text-[#FFFFFF85]">
                  {t("name")}
                </span>
                <input
                  type="text"
                  maxLength={24}
                  value={cursorName}
                  onChange={(e) => setCursorName(e.target.value)}
                  style={{ textAlign: "right" }}
                  autoComplete="off"
                  className={`outline-none font-semibold text-[#4B4B4C] dark:text-[#FFFFFF90] placeholder:text-black`}
                />
              </div>
              <div className="border-b-1 border-[#dfdfdf] dark:border-[#504f4f] my-4" />
              <div className="flex justify-between pl-1 pr-3">
                <span className="text-[#4B4B4C] dark:text-[#FFFFFF85]">
                  {t("color")}
                </span>
                <div className="flex items-center gap-1.5">
                  {colors.map((color) => {
                    const isSelected = cursorColor === color;

                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setCursorColor(color);
                          pop();
                        }}
                        className={`cursor-none h-6 w-6 rounded-md shadow-sm transition-all ${
                          isSelected
                            ? "border-2 border-white dark:border-[#29292b] outline-2 outline-[#cecece] dark:outline-white"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
