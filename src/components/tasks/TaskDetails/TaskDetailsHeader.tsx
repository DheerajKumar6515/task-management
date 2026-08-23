import { Eye, Lock, MoreHorizontal, PanelRight } from "lucide-react";

interface TaskDetailsHeaderProps {
  title: string;
  description?: string;
}

export default function TaskDetailsHeader({
  title,
  description,
}: TaskDetailsHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h1>

        {description && (
          <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex shrink-0 gap-1.5">
        <button className="icon-button cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-md transition-colors">
          <Lock size={14} />
        </button>

        <button className="icon-button cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-md transition-colors">
          <Eye size={14} />
        </button>

        <button className="icon-button cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-md transition-colors">
          <MoreHorizontal size={14} />
        </button>

        <button className="icon-button cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-md transition-colors">
          <PanelRight size={14} />
        </button>
      </div>
    </div>
  );
}
