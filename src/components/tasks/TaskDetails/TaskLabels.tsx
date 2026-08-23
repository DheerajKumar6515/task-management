import { Tag } from "lucide-react";

interface TaskLabelsProps {
  labels: string[];
}

export default function TaskLabels({ labels }: TaskLabelsProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="mr-2 text-xs text-gray-500 dark:text-gray-400">
        Labels
      </span>

      {labels.map((label, index) => (
        <span
          key={`${label}-${index}`}
          className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/50 transition-colors"
        >
          <Tag size={11} className="text-gray-500 dark:text-gray-400" />

          {label}
        </span>
      ))}
    </div>
  );
}
