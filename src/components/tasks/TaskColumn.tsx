import { GripVertical, MoreHorizontal, Plus } from "lucide-react";

import type { TaskColumn as TaskColumnType } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  column: TaskColumnType;
}

function TaskColumn({ column }: TaskColumnProps) {
  return (
     <section className="flex w-72.5 h-fit shrink-0 flex-col bg-[#f5f5f5] rounded-lg border border-[#E5E5E5]">
      {/* Column header */}
      <header className="flex h-9.75 items-center justify-between px-3">
        <div className="w-17.5 h-3.5 flex items-center gap-2">
          <span className="w-3.5 h-3.5 cursor-pointer">
           <GripVertical className="h-3.5 w-3.5 text-[#171717]" />
          </span>

          <h2 className="w-12 h-3 text-xs font-sans font-semibold text-[#171717]">
            {column.title}
          </h2>
        </div>

        <div className="w-9 h-3.5 flex items-center">
          <button
            type="button"
            aria-label={`Add task to ${column.title}`}
            className="rounded-md p-1 cursor-pointer text-[#171717] hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label={`${column.title} options`}
            className="rounded-md cursor-pointer p-1 text-[#171717] hover:bg-white"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Tasks */}
      <div className="h-fit px-2 space-y-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button
        type="button"
        className="mt-1.5 cursor-pointer flex h-8 items-center gap-1 px-2 text-[10px] text-gray-700 hover:text-gray-950"
      >
        <Plus className="h-3.5 w-3.5 " />
        Add Task
      </button>
    </section>
  )
}

export default TaskColumn
