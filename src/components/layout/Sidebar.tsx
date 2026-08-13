"use client";

import {
  LayoutList,
  LayoutDashboard,
  ChevronDown,
  ChevronsUpDown
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}


function Sidebar({
  open,
  onClose,
}: SidebarProps) {
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
          fixed inset-y-0 left-0 z-40 w-53
          border-r border-gray-200 bg-white
          transition-transform duration-200
          md:static md:z-auto md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Workspace */}
        <div className="flex w-[256px] h-16 p-2 gap-2 items-center justify-between border-b border-gray-100">
          <div className="w-60 h-12 rounded-xl px-12 py-8 flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-2xl bg-purple-500">
              {/* Image here */}
              <div className="flex h-8 w-8 rounded-2xl items-center justify-center text-[10px] font-semibold text-white">
                D
              </div>
            </div>

            <span className=" w-38 h-3.5 font-sans text-sm font-semibold text-[#0A0A0A]">
              Dexter
            </span>
          </div>

        </div>

        {/* Navigation */}
        <nav className="p-2">
          <div className="mb-1 flex items-center justify-between px-1.5 py-2 text-xs text-gray-900">
            <span>Workspace</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl bg-gray-100 px-2 py-2 text-left text-xs font-medium text-gray-900"
          >
            <LayoutDashboard className="h-4 w-4" />
            Tasks
          </button>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs text-gray-800 hover:bg-gray-100"
          >
            <LayoutList className="h-4 w-4" />
            Projects
          </button>
        </nav>

        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 md:hidden"
        >
          {/* <PanelLeft className="h-5 w-5" /> */}
          <ChevronsUpDown className="h-5 w-5" />
        </button>
      </aside>
    </>
  )
}

export default Sidebar
