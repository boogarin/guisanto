"use client";

import { easeIn, motion } from "framer-motion";
import { useVisitorStore } from "../store/useVisitorStore";
import { usePageStore } from "../store/usePageStore";

export default function Arrow() {
  const cursorColor = useVisitorStore((state) => state.cursorColor);
  const showProjects = usePageStore((state) => state.showProjects);
  const showAbout = usePageStore((state) => state.showAbout);
  const firstLoad = usePageStore((state) => state.firstLoad);

  return (
    <motion.div
      className="hidden md:flex absolute -top-18 right-6 z-10"
      animate={{
        x: showAbout ? 2000 : showProjects ? -2000 : 0,
        opacity: showAbout ? 0 : showProjects ? 0 : 1,
      }}
      transition={{ duration: 1.2 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 700"
        className="w-64 h-64"
      >
        <g
          stroke={cursorColor}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(271, 400, 400)"
        >
          <motion.path
            d="M344.5 361.6728973388672 Q399.5 256.6728973388672 455.5 472.6728973388672"
            strokeWidth="10"
            initial={firstLoad ? { opacity: 0, pathLength: 0 } : false}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ delay: 5, duration: 3.5 }}
          />
          <motion.polygon
            points="0,5 1.6666667,2.5 0,0 5,2.5"
            fill={cursorColor}
            transform="translate(474.5,456.67) scale(10) rotate(70)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 2.2, ease: easeIn }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
