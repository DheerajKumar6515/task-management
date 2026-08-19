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


function Sidebar({ open,onClose,}: SidebarProps) {
 const [profileOpen, setProfileOpen] = useState(false);
 const path=usePathname()
 //console.log(path)
  return (
   <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-[256px]
          border-r border-gray-200 bg-white
          transition-transform duration-200
          md:static md:z-auto md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Workspace */}
        <div className="flex w-full h-16 p-2 gap-2 items-center justify-between border-b border-gray-100">
          <div className="w-60 h-12 rounded-xl flex items-center gap-2">
            <div onClick={() =>
            setProfileOpen((previous) => !previous)
          } className="h-8 w-8 overflow-hidden rounded-full">
              {/* Image here */}
              <Image src="/avatar.jpg" alt="avtar-img" width={16} height={16} className="object-cover w-full h-full"/>
             
            </div>

            <span className=" w-38 h-3.5 font-sans text-sm font-semibold text-[#0A0A0A] tracking-wide">
              Dexter
            </span>
          </div>

        </div>

        {/* Profile dropdown */}
      {profileOpen && (
        <div className="absolute left-3 top-14 z-50 w-40 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <ProfileMenu/>
        </div>
      )}

        {/* Navigation */}
        <nav className="p-2">
        
          <div className="mb-1 flex items-center justify-between px-1.5 py-2 ">
            <span className="text-sm text-gray-900/82 font-sans font-medium ">Workspace</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>

          <Link href="/dashboard"
          onClick={onClose}
            className={`flex w-full items-center gap-2 rounded-xl ${path === "/dashboard" ? "bg-gray-100":""}  px-2 py-2 `}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="w-48 h-3.5 text-left text-sm text-gray-900/82 font-sans font-medium tracking-wide">Tasks</span>
          </Link>

          <Link href="/projects"
          onClick={onClose}
            type="button"
            className={`mt-1 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-gray-800 hover:bg-gray-100 ${path === "/projects" ? "bg-gray-100":""}`}
          >
            <GalleryVerticalEnd className="h-4 w-4" />
             <span  className="w-48 h-3.5 text-left text-sm text-gray-900/82 font-sans font-medium tracking-wide">Projects</span>
          </Link>
        </nav>

        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 md:hidden"
        >
          {/* <PanelLeft className="h-5 w-5" /> */}
          <ChevronsUpDown className="h-4 w-4 cursor-pointer" />
        </button>
      </aside>
    </>
  )
}

export default Sidebar
