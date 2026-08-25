"use client";
import { useState } from "react";
import type { SubTasks } from "@/types/task";
import { ChevronDown } from "lucide-react";
import SubTaskModal from "../taskModel/SubTaskModal";

interface SubtaskTableProps {
  Taskid:string;
  subtasks: SubTasks[];
}

export default function SubtaskTable({ subtasks,Taskid }: SubtaskTableProps) {
  const [SubtaskModalOpen, setSubtaskModalOpen] = useState(false);
  return (
    <section className="mt-6">
      {/* Heading */}
      <div className="mb-2 flex items-center gap-1 text-gray-900 dark:text-gray-100">
        <span className="text-xs">
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
        </span>

        <h2 className="text-xs font-semibold">Subtasks</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 scrollbar-thin">
        <div className="min-w-150">
          {/* Header */}
          <div className="grid grid-cols-[1fr_90px_100px_110px_45px] bg-gray-50 dark:bg-gray-800/50 px-2 py-2 text-[10px] font-medium text-gray-600 dark:text-gray-400">
            <span>Task</span>
            <span>Priority</span>
            <span>Members</span>
            <span>Due Date</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="grid grid-cols-[1fr_90px_100px_110px_45px] items-center border-t border-gray-200 dark:border-gray-800 px-2 py-2.5 text-[11px] text-gray-800 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {subtask.title}
              </span>

              <PriorityText priority={subtask.priority} />

              <span>{subtask.assignee}</span>

              <span className="text-gray-600 dark:text-gray-400">
                {subtask.dueDate}
              </span>

              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
              >
                ...
              </button>
            </div>
          ))}
          <SubTaskModal
            isOpen={SubtaskModalOpen}
            onClose={() => setSubtaskModalOpen(false)}
            tasksList={subtasks}
            selectedTaskId={Taskid}
            onSuccess={() => {
              // Refresh tasks list
            }}
          />

          {/* Add */}
          <button
          onClick={()=>setSubtaskModalOpen(true)}
            type="button"
            className="w-full border-t border-gray-200 dark:border-gray-800 px-2 py-2.5 text-left text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors"
          >
            + Add Subtasks
          </button>
        </div>
      </div>
    </section>
  );
}

function PriorityText({ priority }: { priority: string }) {
  const labels: Record<string, string> = {
    high: "↗ High",
    medium: "↗ Medium",
    low: "↗ Low",
    urgent: "↗ Urgent",
    "no-priority": "No Priority",
  };

  return <span className="text-xs">{labels[priority] ?? priority}</span>;
}
