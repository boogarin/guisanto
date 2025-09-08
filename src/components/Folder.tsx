"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  IconCode,
  IconFolderFilled,
  IconMail,
  IconMoodWink2,
  IconPinFilled,
  IconSquares,
} from "@tabler/icons-react";
import App from "./App";
import { SortableItem } from "../hooks/SortableItem";
import Contact from "./Contact";
import Skills from "./Skills";
import { useVisitorStore } from "../store/useVisitorStore";
import { usePageStore } from "../store/usePageStore";
import { useTranslations } from "next-intl";

type ItemType = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  colorHover: string;
};

export default function Folder() {
  const [items, setItems] = useState<ItemType[]>([]);
  const t = useTranslations("Folder");

  useEffect(() => {
    setItems([
      {
        id: "1",
        name: t("about"),
        icon: IconMoodWink2,
        color: "#0acf83",
        colorHover: "#06b472",
      },
      {
        id: "2",
        name: t("skills"),
        icon: IconCode,
        color: "#01baef",
        colorHover: "#00a4d2",
      },
      {
        id: "3",
        name: t("projects"),
        icon: IconSquares,
        color: "#ff3736",
        colorHover: "#e42a2a",
      },
      {
        id: "4",
        name: t("contact"),
        icon: IconMail,
        color: "#8850ff",
        colorHover: "#6b37da",
      },
    ]);
  }, [t]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const cursorColor = useVisitorStore((state) => state.cursorColor);
  const togglePageProjects = usePageStore((state) => state.togglePageProjects);
  const togglePageAbout = usePageStore((state) => state.togglePageAbout);

  return (
    <>
      <Skills isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />

      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <div
        className="w-full sm:w-fit bg-white border-b-1 border-r-1 rounded-xl border-[#cecece] shadow-md
      dark:bg-[#29292b] dark:border-[#504f4f]"
      >
        <div
          className="w-full h-full border-t-1 border-l-1 rounded-xl border-[#DFDFDF]
        dark:border-[#555555]"
        >
          <div
            className="flex w-full justify-between items-center p-3 px-5 rounded-t-xl bg-[#F6F9FC]
          dark:bg-[#373739]"
          >
            <div className="flex gap-3 items-center">
              <IconFolderFilled color={cursorColor} />
              <span className="text-lg text-[#4B4B4C] dark:text-[#FFFFFF90] tracking-widest font-semibold">
                {t("modalTitle")}
              </span>
            </div>
            <IconPinFilled className="text-[#4B4B4C] dark:text-white" />
          </div>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext items={items.map((i) => i.id)}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    onClick={() => {
                      if (item.id === "1") togglePageAbout();
                      if (item.id === "2") setIsSkillsOpen(true);
                      if (item.id === "3") togglePageProjects();
                      if (item.id === "4") setIsContactOpen(true);
                    }}
                  >
                    <App
                      name={item.name}
                      icon={item.icon}
                      color={item.color}
                      colorHover={item.colorHover}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
}
