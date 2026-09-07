"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useContextData } from "@/Context/GlobalContext";

export interface TaskToEdit {
  id: string;
  title: string;
  column_id: string;
  status?: string;
  priority?: string;
  assignee?: string;
  due_date?: string;
  tags?: string[] | string;
  description?: string;
  task_id?: string;
}

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: TaskToEdit | null;
  onSuccess?: () => void;
}

export default function UpdateTaskModal({
  isOpen,
  onClose,
  taskToEdit,
  onSuccess,
}: UpdateTaskModalProps) {
  const { fetchTask } = useContextData();

  const [mounted, setMounted] = useState(false);
  //for task
  const [formData, setFormData] = useState({
    title: "",
    column_id: "todo",
    priority: "medium",
    assignee: "",
    due_date: "",
    tags: "",
    description: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || "",
        column_id: taskToEdit.column_id || "todo",
        priority: taskToEdit.priority || "medium",
        assignee: taskToEdit.assignee || "",
        due_date: taskToEdit.due_date || "",
        tags: Array.isArray(taskToEdit.tags)
          ? taskToEdit.tags.join(", ")
          : taskToEdit.tags || "",
        description: taskToEdit.description || "",
      });
    }
  }, [taskToEdit]);

  if (!isOpen || !mounted || !taskToEdit) return null;

  const isSubtask = "task";

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prepare PATCH Payload
    const payload: Record<string, any> = {
      title: formData.title,
      priority: formData.priority,
      assignee: formData.assignee,
      due_date: formData.due_date,
    };

    if (isSubtask) {
      payload.column_id = formData.column_id;
      payload.status = formData.column_id;
      payload.description = formData.description;
      payload.tags = formData.tags
        ? formData.tags.split(",").map((t) => t.trim())
        : [];
    }

    try {
      // Direct request to backend PATCH endpoint
      const endpoint = `${process.env.NEXT_PUBLIC_baCKEND_URL}/tasks/${taskToEdit.id}`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update task failed");
      toast.success("Task updated successfully!");
      //refresh fetch function
      fetchTask();

      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error("Failed to update task.");
      console.log("Update process failed.");
    }

    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-6 shadow-2xl transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between pb-3 sticky top-0 bg-white dark:bg-gray-900 z-10 border-b dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Update Task ({taskToEdit.id})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-4">
          {/* Column / Status (Task Only) */}
          {isSubtask && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Column / Status
              </label>
              <select
                value={formData.column_id}
                onChange={(e) =>
                  setFormData({ ...formData, column_id: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 p-2 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-gray-100 uppercase font-medium"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="completed">Completed</option>
                <option value="onhold">On Hold</option>
              </select>
            </div>
          )}

          {/* Title */}
          {isSubtask && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 p-2 text-sm focus:outline-none focus:border-black dark:focus:border-gray-400"
              />
            </div>
          )}

          {/* Assignee & Priority */}
          {isSubtask && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Assignee
                </label>
                <select
                  value={formData.assignee}
                  onChange={(e) =>
                    setFormData({ ...formData, assignee: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-600 p-2 text-black dark:bg-gray-800 dark:text-gray-400 text-sm focus:outline-none"
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

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-g mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full rounded-md border dark:border-gray-700 p-2 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          )}

          {/* Due Date & Tags */}
          <div className="grid grid-cols-2 gap-4">
            {isSubtask && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                  Due Date
                </label>
                <input
                  type="text"
                  value={formData.due_date}
                  placeholder="Date Month "
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                  className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none"
                />
              </div>
            )}

            {/* {isSubtask &&
               <div>
              <label className="block text-xs font-semibold uppercase text-gray-50 dark:text-gray-400 mb-1">
                Due Date
              </label>
              <input
                type="text"
                value={subformData.due_date}
                placeholder='dd/mm/yyyy'
                onChange={(e) =>
                  setsubFormData({...subformData, due_date: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none"
              />
            </div>
            } */}

            {isSubtask && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 p-2 text-sm focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Description (Task Only) */}
          {isSubtask && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 p-2 text-sm focus:outline-none focus:border-black dark:focus:border-gray-400 resize-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md cursor-pointer border dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md cursor-pointer bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
