'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  columnTitle: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  columnTitle,
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Delete Column "{columnTitle}"?
        </h3>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this column? <span className="font-semibold text-red-600">If yes, you will lose all tasks</span> present inside this column.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? 'Deleting...' : 'Yes, Delete Column'}
          </button>
        </div>
      </div>
    </div>
  );
}