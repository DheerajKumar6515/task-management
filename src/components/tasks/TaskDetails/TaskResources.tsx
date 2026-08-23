import { Link2 } from "lucide-react";

export default function TaskResources() {
  return (
    <div className="mt-4 flex items-center gap-2 text-xs">
      <span className="text-gray-500">Resources</span>

      <button className="flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
        <Link2 size={12} />
        Add document or link...
      </button>
    </div>
  );
}
