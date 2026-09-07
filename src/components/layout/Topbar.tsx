import { PanelLeft } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-5 dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex items-center justify-center rounded-md w-7 h-7 p-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        aria-label="Open menu"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      {/* Empty space / breadcrumb area */}
      <div className="hidden md:block" />
    </header>
  );
}

export default Topbar;
