"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onProjectAdded,
}: AddProjectModalProps) {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [lead, setLead] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/tasks/createproject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority, lead }),
      });

      if (!response.ok) {
        throw new Error("Project add karne me error aaya");
      }
      toast.success("Project created successfully!");

      // Reset form & close modal
      setTitle("");
      setPriority("Medium");
      setLead("");
      onProjectAdded();
      onClose();
    } catch (error) {
      toast.error("Failed to create project.");
      console.error("Error adding project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design Homepage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-400 text-gray-900 "
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                Lead
              </label>
              <input
                type="text"
                value={lead}
                placeholder="eg. Admin,Dev,Qa"
                onChange={(e) => setLead(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
