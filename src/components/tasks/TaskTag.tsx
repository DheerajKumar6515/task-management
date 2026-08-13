import { Tag } from "lucide-react";

interface TaskTagProps {
  label: string;
}

function TaskTag({ label }: TaskTagProps) {
  return (
     <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-2 py-1 text-[10px] text-gray-700">
      <Tag className="h-3 w-3" strokeWidth={1.7} />
      {label}
    </span>
  )
}

export default TaskTag
