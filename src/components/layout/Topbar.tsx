"use client";

import {
  Columns3,
  Filter,
  PanelLeft,
  Plus,
  Search,
} from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
     <header className="flex h-15 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-5">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 hover:bg-gray-100 md:hidden"
        aria-label="Open menu"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      {/* Empty space / breadcrumb area */}
      <div className="hidden md:block" />

      {/* Actions */}
      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Search"
          className="rounded-md border border-gray-200 p-2 hover:bg-gray-50"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-2 text-xs sm:flex"
        >
          <Columns3 className="h-3.5 w-3.5" />
          Fields
        </button>

        <button
          type="button"
          aria-label="Filter"
          className="rounded-md border border-gray-200 p-2 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-[#171717] px-3 py-2 text-xs font-medium text-white hover:bg-black"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden xl:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
