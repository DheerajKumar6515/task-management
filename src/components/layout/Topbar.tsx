"use client";

import { 
  PanelLeft,
} from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
     <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-5">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md w-7 h-7 p-2 hover:bg-gray-100 cursor-pointer"
        aria-label="Open menu"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      {/* Empty space / breadcrumb area */}
      <div className="hidden md:block" />

    </header>
  )
}

export default Topbar
