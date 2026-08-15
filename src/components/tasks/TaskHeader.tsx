import FieldsMenu from "@/components/tasks/FieldsMenu";
import { useState } from "react";
import {
  Columns3,
  Filter,
  Plus,
  Search,
} from "lucide-react";

interface TaskHeaderProps {
  onMenuClick: () => void;
  viewMode: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
}

function TaskHeader({
  viewMode,
  onViewChange,}:TaskHeaderProps) {
   const [fieldsOpen, setFieldsOpen] = useState(false);
  return (
        <div className="flex w-full h-8 shrink-0 items-center justify-between px-4 sm:px-5 mt-4 mb-4">

        <h1 className="w-11.5 h-4 text-base font-sans font-semibold text-[#171717]">
        Tasks
        </h1>

         {/* Actions */}
      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Search"
          className="rounded-md w-8 h-8 border border-gray-200 hover:bg-gray-50 flex items-center justify-center cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </button>

        <button onClick={() =>
            setFieldsOpen((previous) => !previous)
          }
          type="button"
          className={`hidden w-19 h-8 items-center gap-1.5 rounded-md border border-gray-200 px-3 cursor-pointer sm:flex ${
              fieldsOpen
                ? "bg-gray-50"
                : "bg-white"
            }`}
        >
          <Columns3 className="h-3.5 w-3.5" />
          <span className="text-xs font-sans font-medium leading-4 text-[#171717]">Fields</span>
        </button>

         {/* Fields Dropdown */}
        {fieldsOpen && (
          <FieldsMenu
            onClose={() => setFieldsOpen(false)}
           viewMode={viewMode}
           onViewChange={onViewChange}
          />
        )}

        <button
          type="button"
          aria-label="Filter"
          className="w-8 h-8 rounded-md border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer"
        >
          <Filter className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          className=" w-10 md:w-24 h-8 flex items-center justify-center gap-1.5 rounded-md bg-[#171717] md:px-3 py-2 hover:bg-black cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-white hidden md:inline" />
          <span className="font-sans font-medium text-[#FAFAFA] text-xs leading-4 hidden md:inline">Add Task</span>
          <span className="sm:hidden text-white text-xs font-sans ">Add</span>
        </button>
      </div>

        </div>

  )
}

export default TaskHeader
