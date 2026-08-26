'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  projectTitle: string;
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteWarnModal({ projectTitle, projectId, onClose, onSuccess }: Props) {
  const backendUrl=process.env.NEXT_PUBLIC_baCKEND_URL;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/tasks/delproject/${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        console.log('Delete failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Delete Project?</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
          Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-gray-200">"{projectTitle}"</span> This action cannot be undone?
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="w-1/2 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}