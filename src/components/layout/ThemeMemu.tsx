"use client";

import { useEffect, useState } from "react";
import { Check, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeMenu() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const currentTheme: Theme =
      savedTheme === "dark" ? "dark" : "light";

    setTheme(currentTheme);

    document.documentElement.classList.toggle(
      "dark",
      currentTheme === "dark"
    );
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  return (
    <div className="absolute left-full top-0 ml-1 w-32 rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">

      <p className="px-2 py-2 text-[10px] text-gray-400">
        Theme
      </p>

      {/* Light */}
      <button
        type="button"
        onClick={() => changeTheme("light")}
        className="flex w-full items-center justify-between rounded px-2 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          <Sun size={13} />
          Light
        </span>

        {theme === "light" && (
          <Check size={13} />
        )}
      </button>

      {/* Dark */}
      <button
        type="button"
        onClick={() => changeTheme("dark")}
        className="flex w-full items-center justify-between rounded px-2 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          <Moon size={13} />
          Dark
        </span>

        {theme === "dark" && (
          <Check size={13} />
        )}
      </button>
    </div>
  );
}