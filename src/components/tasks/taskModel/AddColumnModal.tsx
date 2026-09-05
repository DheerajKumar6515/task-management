// components/AddColumnModal.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useContextData } from "@/Context/GlobalContext";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddColumnModal({ isOpen, onClose, onSuccess }: AddColumnModalProps) {
  const {fetchTask}=useContextData()
  const [columnName, setColumnName] = useState("");
  const [column_id, setColumnID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCreateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_baCKEND_URL}/tasks/column`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columnName, column_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Column created successfully!");
      //refresh fetch function
      fetchTask()

      setColumnName("");
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error("Failed to create column.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-xl border border-gray-700">
        <h2 className="text-xl uppercase font-semibold text-gray-900 dark:text-white mb-4">
          Add Column for new task
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleCreateColumn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Column_id
            </label>
            <input
              type="text"
              required
              value={column_id}
              onChange={(e) => setColumnID(e.target.value)}
              placeholder="e.g. todo, doing, completed, on-hold..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white"
            />
          </div>

         <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Column Name
            </label>
            <input
              type="text"
              required
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="e.g. TO DO, Doing, Completed, on Hold..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-500 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black hover:bg-black/80 text-white rounded-md disabled:opacity-50 dark:bg-black dark:text-gray-400 dark:hover:text-white cursor-pointer"
            >
              {loading ? "Adding..." : "Add Column"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}