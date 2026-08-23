"use client";
import { useState } from "react";
import {
  LayoutList,
  LayoutDashboard,
  ChevronDown,
  ChevronsUpDown,
  GalleryVerticalEnd,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "@/components/layout/ProfileMenu";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/20 dark:bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
      fixed inset-y-0 left-0 z-40 w-[256px]
      border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900
      transition-transform duration-200
      md:static md:z-auto md:translate-x-0
      ${open ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        {/* Workspace */}
        <div className="flex w-full h-16 p-2 gap-2 items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="w-60 h-12 rounded-xl flex items-center gap-2">
            <div
              onClick={() => setProfileOpen((previous) => !previous)}
              className="h-8 w-8 overflow-hidden rounded-full cursor-pointer ring-1 ring-gray-200 dark:ring-gray-700"
            >
              {/* Image here */}
              <Image
                src="/avatar.jpg"
                alt="avtar-img"
                width={16}
                height={16}
                className="object-cover w-full h-full"
              />
            </div>

            <span className="w-38 h-3.5 font-sans text-sm font-semibold text-[#0A0A0A] dark:text-gray-100 tracking-wide">
              Dexter
            </span>
          </div>
        </div>

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="absolute left-3 top-14 z-50 w-40 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <ProfileMenu />
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2">
          <div className="mb-1 flex items-center justify-between px-1.5 py-2 text-gray-700 dark:text-gray-300">
            <span className="text-sm font-sans font-medium">Workspace</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>

          {/* Tasks Link */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 ${
              path === "/dashboard"
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : ""
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="w-48 text-left text-sm font-sans font-medium tracking-wide">
              Tasks
            </span>
          </Link>

          {/* Projects Link */}
          <Link
            href="/projects"
            onClick={onClose}
            className={`mt-1 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 ${
              path === "/projects"
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : ""
            }`}
          >
            <GalleryVerticalEnd className="h-4 w-4" />
            <span className="w-48 text-left text-sm font-sans font-medium tracking-wide">
              Projects
            </span>
          </Link>
        </nav>

        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 md:hidden text-gray-700 dark:text-gray-300"
        >
          <ChevronsUpDown className="h-4 w-4 cursor-pointer" />
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
