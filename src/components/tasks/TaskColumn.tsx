import { GripVertical, MoreHorizontal, Plus } from "lucide-react";

import type { TaskColumn as TaskColumnType } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  column: TaskColumnType;
}

function TaskColumn({ column }: TaskColumnProps) {
  return (
     <section className="flex w-62.5 shrink-0 flex-col rounded-lg bg-[#f5f5f5] p-1.5 sm:w-65 h-fit">
      {/* Column header */}
      <header className="flex h-7 items-center justify-between px-1.5">
        <div className="flex items-center gap-1.5">
          <GripVertical className="h-3.5 w-3.5 text-gray-500" />

          <h2 className="text-[11px] font-medium text-gray-900">
            {column.title}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Add task to ${column.title}`}
            className="rounded-md p-1 text-gray-600 hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label={`${column.title} options`}
            className="rounded-md p-1 text-gray-600 hover:bg-white"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Tasks */}
      <div className="space-y-1.5">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button
        type="button"
        className="mt-1.5 flex h-8 items-center gap-1 px-2 text-[10px] text-gray-700 hover:text-gray-950"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Task
      </button>
    </section>
  )
}

export default TaskColumn
