import useSound from "use-sound";
import { useSoundStore } from "../store/useSoundStore";

interface Props {
  icon: React.ElementType;
  name: string;
  color: string;
  colorHover: string;
}

export default function App({ name, icon: Icon, color, colorHover }: Props) {
  const { volume } = useSoundStore();
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  return (
    <button
      onClick={() => play()}
      className="hoverable flex flex-col w-full p-4 rounded-lg gap-3 items-center justify-center group hover:bg-[#f2f2f2] cursor-none hover:scale-102 transition
      dark:hover:bg-[#373739]"
    >
      <Icon
        className="pointer-events-none"
        size={60}
        stroke={1.5}
        color={color}
      />
      <span className="text-[#4B4B4C] dark:text-[#FFFFFF85] pointer-events-none">
        {name}
      </span>
    </button>
  );
}
