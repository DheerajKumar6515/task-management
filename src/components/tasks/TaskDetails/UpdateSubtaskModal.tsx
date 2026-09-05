"use client";
import React, { useState } from 'react'
import type { SubTasks } from '@/types/task';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useContextData } from '@/Context/GlobalContext';

interface UpdatesubtasksProps{
  taskId:string;
    editingSubtask:SubTasks;
    setEditingSubtask:(task:null)=>void
}

function UpdateSubtaskModal({taskId,editingSubtask,setEditingSubtask}:UpdatesubtasksProps) {
  const {fetchTaskById}=useContextData()
    //for subtask
    const [subtaskLoading,setSubtaskLoading]=useState(false)
      const [formData, setFormData] = useState({
      title: editingSubtask.title,
    //  subTaskid: editingSubtask.id,
      priority: editingSubtask.priority.toString(),
      assignee: editingSubtask.assignee,
      due_date: editingSubtask.dueDate, 
    });

    const handleSubTaskUpdate=async(e:React.FormEvent)=>{
     e.preventDefault();
      
     if(!editingSubtask.id){
        console.log("Subtask id not found!")
        return
     }
     
     setSubtaskLoading(true)
    try {
      // Direct request to backend PATCH endpoint
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_baCKEND_URL}/tasks/subtask/${editingSubtask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      

      if (!res.ok) throw new Error('Update failed');

      toast.success("Subtask updated successfully!");
      setSubtaskLoading(false)
       setEditingSubtask(null);
       //refresh Fetch task function
       fetchTaskById(taskId); 
    } catch (err) {
      toast.error('Subtask Update process failed.');
    }

    setEditingSubtask(null);

    }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md text-white shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-black/70 dark:text-gray-400 font-semibold">Update Subtask</h3>
              <button onClick={() => setEditingSubtask(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubTaskUpdate} className="space-y-4">

                <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">SubtsakId</label>
                <input
                  type="text"
                  value={editingSubtask.id}
                   readOnly
                  className="w-full text-black/70 dark:bg-gray-900 border dark:border-gray-700 border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none "
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                   placeholder="Enter New SubTask Title..."
                  onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-black/70 dark:bg-gray-900 border dark:border-gray-700 border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none"
                  required
                />
              </div>

              <div>
              <label className="block text-xs font-semibold uppercase text-gray-500">
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-500 p-2 text-black/70 dark:text-gray-400 dark:bg-gray-900 text-sm focus:outline-none"
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
                <label className="block text-xs font-medium text-gray-400 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })}
                  className="w-full text-black/70 dark:bg-gray-900 border dark:border-gray-700 border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Due Date</label>
                <input
                  type="text"
                  placeholder='dd/mm/yyyy'
                  value={formData.due_date}
                  onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full text-black/70 dark:bg-gray-900 border dark:border-gray-700 border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingSubtask(null)}
                  className="px-4 cursor-pointer py-2 bg-gray-300 text-black/70 dark:bg-gray-800 dark:text-white rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 bg-black text-white hover:bg-black/70 dark:bg-gray-300 dark:text-black rounded-md text-sm font-medium"
                >
                  {subtaskLoading ? "Updating":"Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

export default UpdateSubtaskModal
