import { useState } from "react";
import { useContextData } from "@/Context/GlobalContext";
import ActionDropdown from "@/components/projects/ActionDropdown";
import EditProjectModal from "@/components/projects/EditProjectModal";
import DeleteWarnModal from "@/components/projects/DeleteWarnModal";

interface ProjectRowProps {
  id?:string;
  title: string;
  priority:"High" | "Medium" | "Low";
  lead?: string;
  onRefresh?: () => void;
}

export default function ProjectRow({
   title, 
   priority ,
   id='1',
   lead="Admin",
   onRefresh
  }: ProjectRowProps) {
  const { color } = useContextData();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const textColorMap: Record<string, string> = {
    amber: "text-amber-500",
    blue: "text-purple-600",
    pink: "text-pink-500",
    rose: "text-rose-600",
    emerald: "text-emerald-600",
    black: "text-black",
  };
  const priorityStyles = {
    High: "text-red-500",
    Medium: "text-orange-500",
    Low: "text-gray-400",
  };

  return (
    <div className="grid grid-cols-4 border-t border-gray-200 dark:border-gray-800 px-3 py-2 text-[10px] text-gray-800 dark:text-gray-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
      {/* Project name */}
      <span className={textColorMap[color] || "text-black"}>{title}</span>

      {/* Priority */}
      <span className={priorityStyles[priority]}>{priority}</span>

      {/* Lead */}
      <span>{lead}</span>

      {/* Actions */}
      {/* <button
        type="button"
        className="text-left text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors"
      >
        ...
      </button> */}
      {/* Actions Dropdown Button */}
        <div className="flex justify-start">
          <ActionDropdown
            onEdit={() => setIsEditOpen(true)}
            onDelete={() => setIsDeleteOpen(true)}
          />
        </div>
      
      {/* 1. Update/Edit Modal Popup */}
      {isEditOpen && (
        <EditProjectModal
          project={{ id, title, priority, lead }}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
            if (onRefresh) onRefresh();
          }}
        />
      )}

      {/* 2. Delete Confirmation Modal Popup */}
      {isDeleteOpen && (
        <DeleteWarnModal
          projectId={id}
          projectTitle={title}
          onClose={() => setIsDeleteOpen(false)}
          onSuccess={() => {
            setIsDeleteOpen(false);
            if (onRefresh) onRefresh();
          }}
        />
      )}

    </div>
  );
}
