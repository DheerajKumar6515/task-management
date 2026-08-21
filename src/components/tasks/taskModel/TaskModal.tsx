'use client';

import React, { useState, useEffect } from 'react';

interface TaskItem {
  id: string;
  title: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultColumnId: string;
  column_title:string;
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

  // Tab state: 'task' | 'subtask'
  const [activeTab, setActiveTab] = useState<'task' | 'subtask'>('task');

  // Task Form State
  const [taskData, setTaskData] = useState({
    title: '',
    column_id: defaultColumnId,
    Column_title:column_title,
    status: defaultColumnId,
    priority: 'medium',
    assignee: 'Admin',
    due_date: '',
    tags: '',
    description: '',
  });

  // Subtask Form State
  const [subtaskData, setSubtaskData] = useState({
    task_id: existingTasks[0]?.id || '',
    title: '',
    priority: 'medium',
    assignee: 'Admin',
    due_date: '',
  });

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      column_id: defaultColumnId,
      status: defaultColumnId,
    }));
    if (existingTasks.length > 0 && !subtaskData.task_id) {
      setSubtaskData((prev) => ({ ...prev, task_id: existingTasks[0].id }));
    }
  }, [defaultColumnId, existingTasks]);

  if (!isOpen) return null;

  // Task Submission Logic
  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...taskData,
      tags: taskData.tags ? taskData.tags.split(',').map((t) => t.trim()) : [],
    };

    try {
      const res = await fetch('http://localhost:4000/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create task');
       
      onSuccess?.();
      onClose();
    } catch (err) {
        console.log('Task save nahi ho paya.')
    }

      setTaskData({
        title: '',
    column_id: defaultColumnId,
    Column_title:column_title,
    status: defaultColumnId,
    priority: '',
    assignee: '',
    due_date: '',
    tags: '',
    description: '',
     })

  };

  // Subtask Submission Logic
  const handleSubtaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subtaskData.task_id) {
      alert('Please select a parent task first!');
      return;
    }
    
    try {
      const res = await fetch(
        `http://localhost:4000/tasks/${subtaskData.task_id}/subtasks`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subtaskData),
        }
      );

      if (!res.ok) throw new Error('Failed to create subtask');

      onSuccess?.();
      onClose();
    } catch (err) {
      console.log('Subtask save nahi ho paya.');
    }

    setSubtaskData({
    task_id: existingTasks[0]?.id || '',
    title: '',
    priority: '',
    assignee: '',
    due_date: '',
    })

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header & Toggle Tabs (Login/Signup style) */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('task')}
              className={`rounded-md cursor-pointer px-4 py-1.5 text-sm font-semibold transition-all ${
                activeTab === 'task'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              + Add Task
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('subtask')}
              className={`rounded-md cursor-pointer px-4 py-1.5 text-sm font-semibold transition-all ${
                activeTab === 'subtask'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              + Add Subtask
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* ---------------- FORM 1: CREATE TASK ---------------- */}
        {activeTab === 'task' && (
          <form onSubmit={handleTaskSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Column
              </label>
              <input
                type="text"
                value={taskData.column_id}
                disabled
                className="mt-1 w-full rounded-md border bg-gray-100 p-2 text-sm font-semibold text-gray-600 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Task Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Write API Documentation"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none focus:border-black"
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
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
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
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
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
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
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
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
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
              className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none focus:border-black resize-none"
            />
          </div>

            <div className="flex items-center justify-between border-t pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('subtask')}
                className="text-xs text-blue-600 hover:underline"
              >
                Want to add a subtask instead?
              </button>
              <div className="flex gap-2">
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
        )}

        {/* ---------------- FORM 2: CREATE SUBTASK ---------------- */}
        {activeTab === 'subtask' && (
          <form onSubmit={handleSubtaskSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Select Parent Task *
              </label>
              <select
                value={subtaskData.task_id}
                onChange={(e) =>
                  setSubtaskData({ ...subtaskData, task_id: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none focus:border-black"
              >
                {existingTasks.length === 0 ? (
                  <option value="">No tasks available</option>
                ) : (
                  existingTasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.id})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
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
                className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Assignee
                </label>
                <input
                  type="text"
                  value={subtaskData.assignee}
                  onChange={(e) =>
                    setSubtaskData({
                      ...subtaskData,
                      assignee: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Priority
                </label>
                <select
                  value={subtaskData.priority}
                  onChange={(e) =>
                    setSubtaskData({
                      ...subtaskData,
                      priority: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Due Date
              </label>
              <input
                type="text"
                placeholder="e.g. 15 Sep 2026"
                value={subtaskData.due_date}
                onChange={(e) =>
                  setSubtaskData({ ...subtaskData, due_date: e.target.value })
                }
                className="mt-1 w-full rounded-md border p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('task')}
                className="text-xs text-blue-600 hover:underline"
              >
                Switch to Task Form
              </button>
              <div className="flex gap-2">
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
                  Create Subtask
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}