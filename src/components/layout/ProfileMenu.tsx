"use client";

import { useState } from "react";
import { ChevronRight, Moon, Settings, Sun, User } from "lucide-react";
import { useContextData } from "@/Context/GlobalContext";
import { CleanAvatar } from "@/components/ui/CleanAvatar";

import ThemeMenu from "@/components/layout/ThemeMemu";
import ColorMode from "@/components/layout/ColorMode";
import Link from "next/link";

export default function ProfileMenu() {
  const {userDetails}=useContextData();
  const [themeOpen, setThemeOpen] = useState(false);
  const [colorModeOpen, setColorModeOpen] = useState(false);

  return (
    <div className="relative rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black/40 transition-colors duration-200">
      {/* Profile Card */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-4">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <img
            src={`${userDetails? CleanAvatar(userDetails?.googleAvatar): '/defaultimg.png'}`}
            alt="UserImg"
            className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />

          {/* Name */}
          <p className="mt-2 text-[10px] font-medium text-gray-900 dark:text-gray-100">
            {userDetails? userDetails?.googleName : "Guest"}
          </p>

          {/* Email */}
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
           {userDetails? userDetails?.email : "Guest@gmail.com"}
          </p>
        </div>
      </div>

      {/* Profile */}
      <div>
        <Link
          href="/profile"
          className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <User size={13} className="text-gray-500 dark:text-gray-400" />
            Profile
          </span>
        </Link>
      </div>

      {/* Change Theme */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setThemeOpen((previous) => !previous)}
          className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sun size={13} className="text-gray-500 dark:text-gray-400" />
            Change Theme
          </span>

          <ChevronRight
            size={12}
            className="text-gray-400 dark:text-gray-500"
          />
        </button>

        {/* Theme submenu */}
        {themeOpen && <ThemeMenu />}
      </div>

      {/* Color Mode */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setColorModeOpen((previous) => !previous)}
          className="flex w-full items-center justify-between px-3 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <span className="flex items-center gap-2">
            <Moon size={13} className="text-gray-500 dark:text-gray-400" />
            Color Mode
          </span>

          <ChevronRight
            size={12}
            className="text-gray-400 dark:text-gray-500"
          />
        </button>

        {/* Color mode submenu */}
        {colorModeOpen && <ColorMode />}
      </div>

      {/* Settings */}
      <button
        type="button"
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors rounded-b-md"
      >
        <Settings size={13} className="text-gray-500 dark:text-gray-400" />
        Settings
      </button>
    </div>
  );
}
