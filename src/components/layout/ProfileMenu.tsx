"use client";

import {useState } from "react";
import {
  ChevronRight,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";


import ThemeMenu from "@/components/layout/ThemeMemu";
import ColorMode from "@/components/layout/ColorMode";
import Link from "next/link";

export default function ProfileMenu() {
  const [themeOpen, setThemeOpen] = useState(false);
  const [colorModeOpen,setColorModeOpen] = useState(false);

 
  return (
    <div className="relative rounded-md">

      {/* Profile Card */}
      <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800">

        <div className="flex flex-col items-center">

          {/* Avatar */}
          <img
            src="/avatar.jpg"
            alt="Dexter"
            className="h-10 w-10 rounded-full object-cover"
          />

          {/* Name */}
          <p className="mt-2 text-[10px] font-medium text-gray-900 dark:text-white">
            Dexter
          </p>

          {/* Email */}
          <p className="text-[9px] text-gray-400">
            Dexter@gmail.com
          </p>

        </div>
      </div>

      {/*profile */}
      <div>
          <Link href="/profile" className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800">
          <span className="flex items-center gap-2"><User size={13}/> Profile</span>
        </Link>

         </div>

      {/* Change Theme */}
      <div className="relative">
       
        <button
          type="button"
          onClick={() =>
            setThemeOpen((previous) => !previous)
          }
          className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <Sun size={13} />
            Change Theme
          </span>

          <ChevronRight size={12} />
        </button>

        {/* Theme submenu */}
        {themeOpen && <ThemeMenu />}

      </div>

      {/* Color Mode */}
      <div>
      <button
       onClick={() =>
            setColorModeOpen((previous) => !previous)
          }
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          <Moon size={13} />
          Color Mode
        </span>

        <ChevronRight size={12} />
      </button>

        {/* Theme submenu */}
        {colorModeOpen && <ColorMode />}
      </div>

      {/* Settings */}
      <button
        type="button"
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Settings size={13} />
        Settings
      </button>

    </div>
  );
}