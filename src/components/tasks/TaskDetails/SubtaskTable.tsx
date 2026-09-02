"use client";
import { useState } from "react";
import type { SubTasks } from "@/types/task";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import SubTaskModal from "../taskModel/SubTaskModal";
import UpdateSubtaskModal from "@/components/tasks/TaskDetails/UpdateSubtaskModal";
import SubtaskDeleteWarning from "@/components/tasks/TaskDetails/SubtaskDeleteWarning";


interface SubtaskTableProps {
  Taskid:string;
  subtasks: SubTasks[];
}

export default function SubtaskTable({ subtasks,Taskid }: SubtaskTableProps) {
  const [SubtaskModalOpen, setSubtaskModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingSubtask, setEditingSubtask] = useState<SubTasks | null>(null);
  const [deletingSubtaskId, setDeletingSubtaskId] = useState<string | null>(null);

  const openUpdateModal=(subtasks:SubTasks)=>{
    setEditingSubtask(subtasks);
    setActiveMenuId(null);
  }

   
  return (
    <section className="mt-6">
      {/* Heading */}
      <div className="mb-2 flex items-center gap-1 text-gray-900 dark:text-gray-100">
        <span className="text-xs">
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
        </span>

        <h2 className="text-xs font-semibold">Subtasks</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 scrollbar-thin">
        <div className="min-w-150">
          {/* Header */}
          <div className="grid grid-cols-[1fr_90px_100px_110px_45px] bg-gray-50 dark:bg-gray-800/50 px-2 py-2 text-[10px] font-medium text-gray-600 dark:text-gray-400">
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
              className="grid grid-cols-[1fr_90px_100px_110px_45px] items-center border-t border-gray-200 dark:border-gray-800 px-2 py-2.5 text-[11px] text-gray-800 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {subtask.title}
              </span>

              <PriorityText priority={subtask.priority} />

              <span>{subtask.assignee}</span>

              <span className="text-gray-600 dark:text-gray-400">
                {subtask.dueDate}
              </span>

              <button
               onClick={()=>setActiveMenuId(activeMenuId === subtask.id ? null : subtask.id)}
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
              >
                ...
              </button>

              {/* Actions Dropdown Popup */}
                {activeMenuId === subtask.id && (
                  <div className="absolute right-4 mt-1 w-36 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-20 py-1 text-left">
                    <button
                      onClick={() => openUpdateModal(subtask)}
                      className="w-full px-3 py-2 text-xs text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                    >
                      <Edit className="w-3.5 h-3.5 text-blue-400" /> Update
                    </button>
                    <button
                      onClick={() => {
                        setDeletingSubtaskId(subtask.id);
                        setActiveMenuId(null);
                      }}
                      className="w-full px-3 py-2 text-xs text-red-400 hover:bg-gray-800 flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                )}

                 {deletingSubtaskId && <SubtaskDeleteWarning
           taskId={subtask.id}
           setDeletingSubtaskId={setDeletingSubtaskId}
           />}

            </div>
          ))}
          
          {/*Udate Modal */}
          {editingSubtask &&
           <UpdateSubtaskModal
            editingSubtask={editingSubtask}
             setEditingSubtask={setEditingSubtask}/>}
          
          <SubTaskModal
            isOpen={SubtaskModalOpen}
            onClose={() => setSubtaskModalOpen(false)}
            tasksList={subtasks}
            selectedTaskId={Taskid}
            onSuccess={() => {
              // Refresh tasks list
            }}
          />

          {/* Add */}
          <button
          onClick={()=>setSubtaskModalOpen(true)}
            type="button"
            className="w-full border-t border-gray-200 dark:border-gray-800 px-2 py-2.5 text-left text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors"
          >
            + Add Subtasks
          </button>
        </div>
      </div>
    </section>
  );
}

function PriorityText({ priority }: { priority: string }) {
  const labels: Record<string, string> = {
    high: "↗ High",
    medium: "↗ Medium",
    low: "↗ Low",
    urgent: "↗ Urgent",
    "no-priority": "No Priority",
  };

  return <span className="text-xs">{labels[priority] ?? priority}</span>;
}
