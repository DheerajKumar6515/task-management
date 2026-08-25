import { Tag } from "lucide-react";

interface TaskTagProps {
  label: string;
}

function TaskTag({ label }: TaskTagProps) {
  return (
    <span className="w-fit h-5 inline-flex items-center gap-1 rounded-3xl border border-[#F5F5F5] dark:border-gray-800 bg-[#f5f5f5] dark:bg-gray-800/80 px-2 py-1.5 text-xs font-sans font-medium leading-4 text-gray-700 dark:text-gray-300 transition-colors">
      <Tag
        className="h-3 w-3 text-gray-600 dark:text-gray-400"
        strokeWidth={2.7}
      />
      <span className="text-[#171717] dark:text-gray-200 truncate">
        {label}
      </span>
    </span>
  );
}

export default TaskTag;
