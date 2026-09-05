"use client";
import { SubTasks } from "@/types/task";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";

export interface SubtaskFormData {
  task_id: string;
  title: string;
  priority: string;
  assignee: string;
  due_date: string;
}

interface SubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasksList: SubTasks[];
  selectedTaskId?: string;
  onSuccess?: () => void;
}

function SubTaskModal({
  isOpen,
  onClose,
  tasksList,
  selectedTaskId,
  onSuccess,
}: SubtaskModalProps) {
    // Subtask Form State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
      const [subtaskData, setSubtaskData] = useState<SubtaskFormData>({
        task_id: selectedTaskId || '',
    title: '',
    priority: 'medium',
    assignee: 'Admin',
    due_date: '',
      });

    useEffect(() => {
    if (selectedTaskId) {
      setSubtaskData((prev) => ({ ...prev, task_id: selectedTaskId }));
    } 
  }, [selectedTaskId]);
      
  if (!isOpen) return null;

    const handleSubtaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!subtaskData.task_id) {
         setError('Please select a parent task.');
      return;
        }
        setLoading(true);
        
        
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_baCKEND_URL}/tasks/${subtaskData.task_id}/subtasks`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subtaskData),
            }
          );
    
          if (!res.ok) throw new Error('Failed to create subtask');
          toast.success("SubTask created successfully!");

           setSubtaskData({
        task_id: selectedTaskId || '',
        title: '',
        priority: '',
        assignee: '',
        due_date: '',
        })
    
          onSuccess?.();
          onClose();
        } catch (err:any) {
          toast.error("Failed to create subtask.");
          setError(err.message || 'Failed to create subtask.');
        }
    
          
      };

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Add New Subtask
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-3 p-2 text-xs text-red-500 bg-red-50 dark:bg-red-950/50 rounded border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubtaskSubmit} className="mt-4 space-y-4">
          
          {/* Task ID  */}
           <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Task_id
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Write Unit Tests"
              value={selectedTaskId}
              readOnly
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Subtask Title */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Subtask Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Write Unit Tests"
              value={subtaskData.title}
              onChange={(e) =>
                setSubtaskData({ ...subtaskData, title: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Priority & Assignee Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Priority
              </label>
              <select
                value={subtaskData.priority}
                onChange={(e) =>
                  setSubtaskData({ ...subtaskData, priority: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Assignee
              </label>
              <select
                value={subtaskData.assignee}
                onChange={(e) =>
                  setSubtaskData({ ...subtaskData, assignee: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              >
              <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="developer">Developer</option>
                <option value="qa team">QA Team</option>
                <option value="designer">Designer</option>
                <option value="security">Security</option>
                <option value="product">Product</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Due Date
            </label>
            <input
              placeholder="eg. 15 sep 2026"
              value={subtaskData.due_date}
              onChange={(e) =>
                setSubtaskData({ ...subtaskData, due_date: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md cursor-pointer border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md cursor-pointer bg-black dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Subtask'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubTaskModal
