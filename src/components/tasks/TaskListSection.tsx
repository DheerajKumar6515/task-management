"use client";
import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

import type { Task } from "@/types/task";
import TaskRow from "@/components/tasks/TaskRow";
import TaskModal from "@/components/tasks/taskModel/TaskModal";

interface TaskListSectionProps {
  taskid: string;
  title: string;
  tasks: Task[];
}

export default function TaskListSection({
  taskid,
  title,
  tasks,
}: TaskListSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("todo");
  return (
    <section className=" mb-3">
      {/* Section Header */}
      <button
        type="button"
        className="mb-2 flex items-center gap-1 px-1 text-xs font-medium text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />

        {title}
      </button>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors scrollbar-thin">
        {/* Table Header */}
        <div className="grid min-w-162.5 grid-cols-[minmax(220px,1fr)_80px_110px_110px_40px] items-center bg-gray-50 dark:bg-gray-800/60 px-2 py-2 text-[10px] font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
          <span>Task</span>
          <span>Priority</span>
          <span>Members</span>
          <span>Due Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Tasks */}
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultColumnId={selectedColumn}
          column_title={title}
          existingTasks={tasks}
          onSuccess={() => {
            // Refresh tasks list
          }}
        />

        {/* Add Task */}
        <button
          onClick={() => {
            setSelectedColumn(taskid);
            setIsModalOpen(true);
          }}
          type="button"
          className="flex w-full items-center gap-1 border-t border-gray-200 dark:border-gray-800 px-2 py-2.5 text-xs text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Task
        </button>
      </div>
    </section>
  );
}
