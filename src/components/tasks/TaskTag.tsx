import { Tag } from "lucide-react";

interface TaskTagProps {
  label: string;
}

function TaskTag({ label }: TaskTagProps) {
  return (
     <span className="w-28 h-5 inline-flex items-center gap-1 rounded-3xl border border-[#F5F5F5] bg-[#f5f5f5] px-2 py-1.5 text-xs font-sans font-medium leading-4 text-gray-700">
      <Tag className="h-3 w-3" strokeWidth={2.7} />
     <span className="text-[#171717]">{label}</span> 
    </span>
  )
}

export default TaskTag
