import FieldsMenu from "@/components/tasks/FieldsMenu";
import SearchInput from "@/components/tasks/SearchInput";
import FilterDropdown from "@/components/tasks/filters/FilterDropdown";
import { useState } from "react";
import { Columns3, Filter, Plus, Search } from "lucide-react";

interface TaskHeaderProps {
  onMenuClick: () => void;
  viewMode: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function TaskHeader({
  viewMode,
  onViewChange,
  searchQuery,
  onSearchChange,
}: TaskHeaderProps) {
  const [fieldsOpen, setFieldsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex w-full h-8 shrink-0 items-center justify-between px-4 sm:px-5 mt-4 mb-4">
      <h1 className="w-11.5 h-4 text-base font-sans font-semibold text-[#171717] dark:text-gray-100 flex items-center justify-center transition-colors">
        Tasks
      </h1>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-1.5">
        {viewMode === "list" ? (
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        ) : (
          <button
            type="button"
            aria-label="Search"
            className="rounded-md w-8 h-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={() => setFieldsOpen((previous) => !previous)}
          type="button"
          className={`hidden w-19 h-8 items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-800 px-3 cursor-pointer sm:flex text-gray-700 dark:text-gray-300 transition-colors ${
            fieldsOpen
              ? "bg-gray-50 dark:bg-gray-800"
              : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60"
          }`}
        >
          <Columns3 className="h-3.5 w-3.5" />
          <span className="text-xs font-sans font-medium leading-4 text-[#171717] dark:text-gray-200">
            Fields
          </span>
        </button>

        {/* Fields Dropdown */}
        {fieldsOpen && (
          <FieldsMenu
            onClose={() => setFieldsOpen(false)}
            viewMode={viewMode}
            onViewChange={onViewChange}
          />
        )}
        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen((previous) => !previous)}
            type="button"
            aria-label="Filter"
            className={`w-8 h-8 rounded-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 p-2 flex items-center justify-center cursor-pointer transition-colors ${
              filterOpen
                ? "bg-gray-100 dark:bg-gray-800"
                : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
          </button>
          {filterOpen && <FilterDropdown />}
        </div>

        <button
          type="button"
          className={`w-10 md:w-24 h-8 flex items-center justify-center gap-1 rounded-md bg-[#171717] md:px-3 py-2 hover:bg-black cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors`}
        >
          <Plus className="h-4 w-4 text-white dark:text-black hidden md:inline" />
          <span
            className={`${viewMode === "list" ? "w-28" : "w-full"} font-sans font-medium text-[#FAFAFA] dark:text-black text-xs leading-4 hidden md:inline`}
          >
            Add Task
          </span>
          <span className="sm:hidden text-white dark:text-black text-xs font-sans ">
            Add
          </span>
        </button>
      </div>
    </div>
  );
}

export default TaskHeader;
