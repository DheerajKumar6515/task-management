import { CalendarDays, MoreHorizontal } from "lucide-react";
import type { Task } from "@/types/task";
import Avatar from "@/components/ui/Avatar";
import TaskTag from "./TaskTag";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
   <article className="rounded-lg border border-gray-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-sm">
      {/* Task title */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-[12px] font-medium leading-5 text-gray-900">
          {task.title}
        </h3>

        <button
          type="button"
          aria-label="Task options"
          className="shrink-0 rounded-md p-0.5 text-gray-500 hover:bg-gray-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Assignee + Date */}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <Avatar name={task.assignee} />

          <span className="truncate text-[10px] text-gray-800">
            {task.assignee}
          </span>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[9px] font-medium text-red-500">
          <CalendarDays className="h-3 w-3" />
          {task.dueDate}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {task.tags.map((tag, index) => (
          <TaskTag
            key={`${task.id}-${tag}-${index}`}
            label={tag}
          />
        ))}
      </div>
    </article>
  )
}

export default TaskCard
