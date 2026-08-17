import type { SubTasks } from "@/types/task";
import { ChevronDown } from "lucide-react";

interface SubtaskTableProps {
  subtasks: SubTasks[];
}

export default function SubtaskTable({
  subtasks,
}: SubtaskTableProps) {
  return (
    <section className="mt-6">
      {/* Heading */}
      <div className="mb-2 flex items-center gap-1">
        <span className="text-xs"><ChevronDown className="w-3.5 h-3.5"/></span>

        <h2 className="text-xs font-semibold">
          Subtasks
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <div className="min-w-150">

          {/* Header */}
          <div className="grid grid-cols-[1fr_90px_100px_110px_45px] bg-gray-50 px-2 py-2 text-[10px] font-medium text-gray-600">
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
              className="grid grid-cols-[1fr_90px_100px_110px_45px] items-center border-t border-gray-200 px-2 py-2.5 text-[11px]"
            >
              <span>{subtask.title}</span>

              <PriorityText
                priority={subtask.priority}
              />

              <span>{subtask.assignee}</span>

              <span className="text-gray-600">
                {subtask.dueDate}
              </span>

              <button className="text-gray-500">
                ...
              </button>
            </div>
          ))}

          {/* Add */}
          <button className="w-full border-t border-gray-200 px-2 py-2.5 text-left text-xs hover:bg-gray-50">
            + Add Subtasks
          </button>

        </div>
      </div>
    </section>
  );
}

function PriorityText({
  priority,
}: {
  priority: string;
}) {
  const labels: Record<string, string> = {
    high: "↗ High",
    medium: "↗ Medium",
    low: "↗ Low",
    urgent: "↗ Urgent",
    "no-priority": "No Priority",
  };

  return (
    <span className="text-xs">
      {labels[priority] ?? priority}
    </span>
  );
}
