import { Paperclip, Send } from "lucide-react";

export default function CommentSection() {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
        Subtasks
      </h2>

      {/* Existing comment */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="flex gap-2 p-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-[9px] text-white">
            AD
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-gray-900 dark:text-gray-200">
                Ankit Dutta
              </span>

              <span className="text-[9px] text-gray-400 dark:text-gray-500">
                just now
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">
              dsds
            </p>
          </div>
        </div>

        {/* Reply */}
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 px-3 py-2 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-lg">
          <input
            placeholder="Leave a reply..."
            className="flex-1 text-xs outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />

          <span className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <Paperclip size={14} />
          </span>

          <span className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
            <Send size={14} />
          </span>
        </div>
      </div>

      {/* New comment */}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3 transition-colors duration-200">
        <input
          placeholder="Add a comment..."
          className="flex-1 text-xs outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <span className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <Paperclip size={14} />
        </span>

        <span className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <Send size={14} />
        </span>
      </div>
    </section>
  );
}
