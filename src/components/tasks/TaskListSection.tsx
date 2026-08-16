import { ChevronDown, Plus } from "lucide-react";

import type { Task, TaskColumn } from "@/types/task";
import TaskRow from "./TaskRow";

interface TaskListSectionProps {
  title: string;
  tasks: Task[];
}

export default function TaskListSection({
  title,
  tasks,
}: TaskListSectionProps) {
  return (
    <section className="mb-3">
      {/* Section Header */}
      <button
        type="button"
        className="mb-2 flex items-center gap-1 px-1 text-xs font-medium text-gray-900"
      >
        <ChevronDown className="h-3.5 w-3.5" />

        {title}
      </button>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        
        {/* Table Header */}
        <div className="grid min-w-162.5 grid-cols-[minmax(220px,1fr)_80px_110px_110px_40px] items-center bg-gray-50 px-2 py-2 text-[10px] font-medium text-gray-700">
          <span>Task</span>
          <span>Priority</span>
          <span>Members</span>
          <span>Due Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Tasks */}
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
          />
        ))}

        {/* Add Task */}
        <button
          type="button"
          className="flex w-full items-center gap-1 border-t border-gray-200 px-2 py-2.5 text-xs text-gray-800 hover:bg-gray-50"
        >
          <Plus className="h-3.5 w-3.5" />

          Add Task
        </button>
      </div>
    </section>
  );
}
