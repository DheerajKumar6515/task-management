'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

interface Subtasks{
  id:string;
  priority?: string;
  assignee?: string;
  due_date?: string;
} 

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
  type?: 'task' | 'subtask';
  task_id?: string; 
  subtasks?:Subtasks[];
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

  const [mounted, setMounted] = useState(false);
  //for task
  const [formData, setFormData] = useState({
    title: '',
    column_id: 'todo',
    priority: 'medium',
    assignee: '',
    due_date: '',
    tags: '',
    description: '',
  });

  //for subtask
     const [subformData, setsubFormData] = useState({
    title: '',
    column_id: '',
    priority: '',
    assignee: '',
    due_date: '', 
  });

  const [activeTab, setActiveTab] = useState<'task' | 'subtask'>('task');
 
 
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (taskToEdit) {
      //
     const initialType = taskToEdit.type === 'subtask' ? 'subtask' : 'task';
      setActiveTab(initialType);

      setFormData({
        title: taskToEdit.title || '',
        column_id: taskToEdit.column_id || 'todo',
        priority: taskToEdit.priority || 'medium',
        assignee: taskToEdit.assignee || '',
        due_date: taskToEdit.due_date || '',
        tags: Array.isArray(taskToEdit.tags)
          ? taskToEdit.tags.join(', ')
          : taskToEdit.tags || '',
        description: taskToEdit.description || '',
      });
    }
  }, [taskToEdit]);

  
//console.log(taskToEdit)

if (!isOpen || !mounted || !taskToEdit) return null;

const isSubtask = activeTab === 'subtask';

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

    if (!isSubtask) {
      payload.column_id = formData.column_id;
      payload.status = formData.column_id;
      payload.description = formData.description;
      payload.tags = formData.tags
        ? formData.tags.split(',').map((t) => t.trim())
        : [];
    }

    if (isSubtask) {
      payload.title=subformData.title;
     //payload.column_id = subformData.column_id;
      payload.priority = subformData.priority;
      payload.assignee = subformData.assignee;
      payload.due_date = subformData.due_date
    }

    try {
      // Direct request to backend PATCH endpoint
      const endpoint = isSubtask
        ? `http://localhost:4000/tasks/subtask/${subformData.column_id}`
        : `http://localhost:4000/tasks/${taskToEdit.id}`;

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      

      if (!res.ok) throw new Error('Update failed');

      // console.log(`${isSubtask ? 'Subtask' : 'Task'} updated successfully`)
      onSuccess?.();
      onClose();

    } catch (err) {
      console.log('Update process failed. Check backend console.');
    }

    onClose()
    
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
            Update Details ({taskToEdit.id})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher (Login / Signup Tab Style) */}
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('task')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'task'
                ? 'bg-white dark:bg-gray-950 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subtask')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'subtask'
                ? 'bg-white dark:bg-gray-950 text-black dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Update Subtask
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleUpdateSubmit} className="mt-4 space-y-4">
          {/* Column / Status (Task Only) */}
          {!isSubtask && (
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
          {!isSubtask && <div>
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
          </div> }

          {/*subtask ID Select */}
           {isSubtask && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                 id
              </label>
              <select
                value={subformData.column_id}
                onChange={(e) =>
                  setsubFormData({ ...subformData, column_id: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 p-2 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-gray-100 uppercase font-medium"
              >
               {taskToEdit?.subtasks?.map((task)=>(                
                <option key={task.id} value={task.id}>{task.id}</option>
               ))}
              </select>
            </div>
          )}           
           
            {isSubtask && <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={subformData.title}
              onChange={(e) =>
                setsubFormData({ ...subformData, title: e.target.value })
              }
              className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 p-2 text-sm focus:outline-none focus:border-black dark:focus:border-gray-400"
            />
          </div> }

          {/* Assignee & Priority  for subtask*/}
         {isSubtask && <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Assignee
              </label>
              <input
                type="text"
                value={subformData.assignee}
                placeholder='Admin, dev, Cn'
                onChange={(e) =>
                  setsubFormData({ ...subformData, assignee: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 ark:text-gray-400 mb-1">
                Priority
              </label>
              <select
                value={subformData.priority}
                onChange={(e) =>
                  setsubFormData({ ...subformData, priority: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 p-2 text-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
         }

          {/* Assignee & Priority */}
         {!isSubtask && <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Assignee
              </label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 p-2 text-sm focus:outline-none"
              />
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
}

          {/* Due Date & Tags */}
          <div className="grid grid-cols-2 gap-4">
           {!isSubtask && <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Due Date
              </label>
              <input
                type="text"
                value={formData.due_date}
                placeholder='Date Month '
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
                className="w-full rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none"
              />
            </div>}

            {isSubtask &&
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
            }

            {!isSubtask && (
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
          {!isSubtask && (
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
              Update {isSubtask ? 'Subtask' : 'Task'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body

  );
}