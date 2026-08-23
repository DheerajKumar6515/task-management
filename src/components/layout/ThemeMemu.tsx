import { useContextData } from "@/Context/GlobalContext";
import { Check, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeMenu() {
  const { theme, changeTheme } = useContextData();

  return (
    <div className="absolute left-full top-0 ml-1 w-32 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg dark:shadow-black/40 transition-colors duration-200">
      <p className="px-2 py-1.5 text-[9px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        Theme
      </p>

      {/* Light */}
      <button
        type="button"
        onClick={() => changeTheme("light")}
        className="flex w-full items-center justify-between rounded px-2 py-1.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      >
        <span className="flex items-center gap-2">
          <Sun size={13} className="text-gray-500 dark:text-gray-400" />
          Light
        </span>

        {theme === "light" && (
          <Check size={13} className="text-gray-700 dark:text-gray-200" />
        )}
      </button>

      {/* Dark */}
      <button
        type="button"
        onClick={() => changeTheme("dark")}
        className="flex w-full items-center justify-between rounded px-2 py-1.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      >
        <span className="flex items-center gap-2">
          <Moon size={13} className="text-gray-500 dark:text-gray-400" />
          Dark
        </span>

        {theme === "dark" && (
          <Check size={13} className="text-gray-700 dark:text-gray-200" />
        )}
      </button>
    </div>
  );
}
