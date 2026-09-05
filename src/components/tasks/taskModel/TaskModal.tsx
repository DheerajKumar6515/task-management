"use client";

import { useContextData } from "@/Context/GlobalContext";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface TaskItem {
  id: string;
  title: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultColumnId: string;
  column_title: string;
  existingTasks: TaskItem[];
  onSuccess?: () => void;
}

export default function TaskModal({
  isOpen,
  onClose,
  defaultColumnId,
  existingTasks,
  column_title,
  onSuccess,
}: TaskModalProps) {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const {userDetails,fetchTask}=useContextData();

  // Task Form State
  const [taskData, setTaskData] = useState({
    title: "",
    column_id: defaultColumnId,
    Column_title: column_title,
    status: defaultColumnId,
    priority: "medium",
    assignee: "Admin",
    due_date: "",
    tags: "",
    description: "",
    user_id:userDetails?.userId,
  });

  // Subtask Form State
  // const [subtaskData, setSubtaskData] = useState({
  //   task_id: existingTasks[0]?.id || "",
  //   title: "",
  //   priority: "medium",
  //   assignee: "Admin",
  //   due_date: "",
  // });

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      column_id: defaultColumnId,
      status: defaultColumnId,
    }));
    // if (existingTasks.length > 0 && !subtaskData.task_id) {
    //   setSubtaskData((prev) => ({ ...prev, task_id: existingTasks[0].id }));
    // }
  }, [defaultColumnId, existingTasks]);

  if (!isOpen) return null;

  // Task Submission Logic
  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...taskData,
      tags: taskData.tags ? taskData.tags.split(",").map((t) => t.trim()) : [],
    };
   
    try {
      const res = await fetch(`${backendUrl}/tasks/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create task");
      toast.success("Task created successfully!");
      //refresh fetch function
      fetchTask();
      
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error("Failed to create task.");
      console.log("Task save nahi ho paya.");
    }

    setTaskData({
      title: "",
      column_id: defaultColumnId,
      Column_title: column_title,
      status: defaultColumnId,
      priority: "",
      assignee: "",
      due_date: "",
      tags: "",
      description: "",
      user_id:userDetails?.userId
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 ">
          <div className="p-1">
            <h1 className="font-sans font-bold text-base text-black dark:text-gray-300">
              Add Task
            </h1>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* ---------------- CREATE TASK form ---------------- */}
        <form onSubmit={handleTaskSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500">
              Column
            </label>
            <input
              type="text"
              value={taskData.column_id}
              disabled
              className="mt-1 w-full rounded-md border bg-gray-100 dark:bg-gray-900 p-2 text-sm font-semibold text-gray-600 uppercase"
            />
          </div>

          <div className="">
            <label className="block text-xs font-semibold uppercase text-gray-500 ">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="Enter Task Title..."
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-600 p-2 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Assignee
              </label>
              <select
                value={taskData.assignee}
                onChange={(e) =>
                  setTaskData({ ...taskData, assignee: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-600 p-2 text-black dark:text-gray-400 dark:bg-gray-800 text-sm focus:outline-none"
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
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Priority
              </label>
              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-600 text-black dark:text-gray-400 p-2 text-sm focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Due Date
              </label>
              <input
                type="text"
                placeholder="e.g. 29 Jul"
                value={taskData.due_date}
                onChange={(e) =>
                  setTaskData({ ...taskData, due_date: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-600 text-black dark:text-gray-400 p-2 text-sm focus:outline-none placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="Research, Design"
                value={taskData.tags}
                onChange={(e) =>
                  setTaskData({ ...taskData, tags: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-600 text-black dark:text-gray-400 p-2 text-sm focus:outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Detailed description of task goals, requirements, and steps..."
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-600 text-black dark:text-gray-400 p-2 text-sm focus:outline-none focus:border-black resize-none placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="w-full flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md cursor-pointer border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md cursor-pointer bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
