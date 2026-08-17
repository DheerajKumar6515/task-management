import {
  Paperclip,
  Send,
} from "lucide-react";

export default function CommentSection() {
  return (
    <section className="mt-6">

      <h2 className="mb-3 text-xs font-semibold">
        Subtasks
      </h2>

      {/* Existing comment */}
      <div className="rounded-lg border border-gray-200">

        <div className="flex gap-2 p-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-[9px] text-white">
            AD
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium">
                Ankit Dutta
              </span>

              <span className="text-[9px] text-gray-400">
                just now
              </span>
            </div>

            <p className="mt-2 text-xs">
              dsds
            </p>
          </div>
        </div>

        {/* Reply */}
        <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2">
          <input
            placeholder="Leave a reply..."
            className="flex-1 text-xs outline-none"
          />

          <span className="cursor-pointer"><Paperclip size={14}/></span>

          <span className="cursor-pointer"><Send size={14} /></span>
        </div>

      </div>

      {/* New comment */}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-3">
        <input
          placeholder="Add a comment..."
          className="flex-1 text-xs outline-none"
        />

        <span className="cursor-pointer"><Paperclip size={14}/></span>

          <span className="cursor-pointer"><Send size={14} /></span>
      </div>

    </section>
  );
}