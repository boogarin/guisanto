import { useEffect, useState, RefObject } from "react";

interface Constraints {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export function useDragConstraints(
  ref: RefObject<HTMLElement | null>,
  margin = 20,
  isOpen?: boolean,
) {
  const [constraints, setConstraints] = useState<Constraints>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateConstraints = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setConstraints({
          left: -rect.left + margin,
          top: -rect.top + margin,
          right: window.innerWidth - rect.right - margin,
          bottom: window.innerHeight - rect.bottom - margin,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [ref, margin, isOpen]);

  return constraints;
}
