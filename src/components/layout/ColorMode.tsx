import { Check } from "lucide-react";
import { useContextData } from "@/Context/GlobalContext";

type color = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";

interface ColorOption {
  id: string;
  name: color; 
  bgClass: string;
}
// Color options
const COLOR_OPTIONS:ColorOption[] = [
  { id: "amber", name: "amber", bgClass: "bg-amber-500" },
  { id: "blue", name: "blue", bgClass: "bg-purple-600" },
  { id: "pink", name: "pink", bgClass: "bg-pink-500" },
  { id: "rose", name: "rose", bgClass: "bg-rose-600" },
  { id: "emerald", name: "emerald", bgClass: "bg-emerald-600" },
  { id: "black", name: "black", bgClass: "bg-black" },
];

export default function ThemeMenu() {
    const {color,setColor}=useContextData();
  
  // Handle color change and persist in localStorage
  const changeColor = (newColor: color) => {
    setColor(newColor);
  };

  return (
    <div className="absolute left-full top-2 ml-1 w-32 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg dark:shadow-black/40 transition-colors duration-200">

  <p className="px-2 py-1.5 text-[9px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
    Color Mode
  </p>

  <div className="mt-1">
    {COLOR_OPTIONS.map((colors) => {
      const isSelected = color === colors.id;
      return (
        <button
          key={colors.id}
          type="button"
          onClick={() => changeColor(colors.name)}
          className="flex w-full items-center justify-between rounded px-2 py-1.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className={`h-3.5 w-3.5 rounded ${colors.bgClass}`} />
            <span>{colors.name}</span>
          </div>

          {isSelected && (
            <Check className="h-3.5 w-3.5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      );
    })}
  </div>

</div>
  );
}