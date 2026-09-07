import { TrendingDown, TrendingUp } from "lucide-react";
import TaskActions from "@/components/tasks/TaskActions";
import type { Task } from "@/types/task";
import Avatar from "@/components/ui/Avatar";

interface TaskRowProps {
  task: Task;
}

const priorityStyles = {
  high: {
    label: "High",
    className: "text-red-500",
    icon: TrendingUp,
  },
  medium: {
    label: "Medium",
    className: "text-orange-500",
    icon: TrendingUp,
  },
  low: {
    label: "Low",
    className: "text-gray-400",
    icon: TrendingDown,
  },
};

export default function TaskRow({ task }: TaskRowProps) {
  const priority = priorityStyles[task.priority];

  const PriorityIcon = priority.icon;

  return (
    <div className="grid min-w-162.5 grid-cols-[minmax(220px,1fr)_80px_110px_110px_40px] items-center border-t border-gray-200 px-2 py-2.5 text-xs">
      {/* Task */}
      <div className="text-sm font-sans font-medium leading-5 truncate pr-4 text-[#171717] dark:text-gray-400">
        {task.title}
      </div>

      {/* Priority */}
      <div className={`flex items-center gap-1 ${priority.className}`}>
        <PriorityIcon className="h-3 w-3" />
        <span>{priority.label}</span>
      </div>

      {/* Members */}
      <div className="flex items-center h-5 w-5">
        <Avatar name={task.assignee} />
      </div>

      {/* Due Date */}
      <div className="text-gray-700 dark:text-gray-400">{task.dueDate}</div>

      {/* Actions */}
      <div className="flex justify-end">
        {/* <button
          type="button"
          aria-label="Task options"
          className="rounded-md p-1 hover:bg-gray-100"
        >
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </button> */}
        <TaskActions task={task} taskId={task.id} />
      </div>
    </div>
  );
}
