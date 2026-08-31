"use client";
import type { Task } from "@/types/task";
import { useEffect, useRef, useState } from "react";
import UpdateTaskModal, {
  TaskToEdit,
} from "@/components/tasks/UpdateTaskModal";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";


interface TaskActionsProps {
  taskId: string;
  task: Task;
}

export default function TaskActions({ taskId, task }: TaskActionsProps) {
  const backendUrl=process.env.NEXT_PUBLIC_baCKEND_URL;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] =
    useState<TaskToEdit | null>(null);

  // Dropdown ke bahar click karne par close hoga
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
   
    if (menuRef.current && menuRef.current.contains(target as Node)) {
      return;
    }

    if (!target || target.tagName === "SELECT" || target.tagName === "OPTION") {
      return;
    }

    if (target.closest("[role='dialog']") || target.closest(".modal-container")) {
      return;
    }
    setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setSelectedTaskToEdit({ ...task, type:"task"});
    setIsUpdateModalOpen(true);
  };

  const handleDelete =async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      
        const response = await fetch(`${backendUrl}/tasks/${taskId}`,{
          method: "DELETE",
          headers: {
           "Content-Type": "application/json",
      },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Task not found`);
        }
        console.log("data successfully deleted")
      } catch (err: any) {
        console.log(err.message || 'Failed to task delete');
      } 

    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="rounded-md cursor-pointer p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        aria-label="Task actions"
      >
        <span>
        <span><MoreHorizontal size={18} /></span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:bg-gray-900 ">
          <button
            type="button"
            onClick={handleUpdate}
            className="flex cursor-pointer w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100"
          >
            <Pencil size={15} />
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex cursor-pointer w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}

      {/* Render Update Modal */}
      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        taskToEdit={selectedTaskToEdit}
        // onSuccess={refreshBoardData}
      />
    </div>
  );
}
