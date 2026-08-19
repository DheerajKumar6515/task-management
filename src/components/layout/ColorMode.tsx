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
    <div className={`absolute left-full top-38 ml-1 w-32 rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900`}>

      <p className="px-2 py-2 text-[10px] text-gray-400">
        Color Mode
      </p>

      {/* Light */}
       <div className="mt-1">
            {COLOR_OPTIONS.map((colors) => {
              const isSelected = color === colors.id;
              return (
                <button
                  key={colors.id}
                  onClick={() => changeColor(colors.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded ${colors.bgClass}`} />
                    <span>{colors.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-gray-700" />}
                </button>
              );
            })}
          </div>

    </div>
  );
}