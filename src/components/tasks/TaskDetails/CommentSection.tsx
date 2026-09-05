"use client";
import { useState, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { useContextData } from "@/Context/GlobalContext";
import Avatar from "@/components/ui/Avatar";
import type { Task } from "@/types/task";
import FormateTime from "@/components/tasks/FormateTime";
import { toast } from "react-toastify";
import { CleanAvatar } from "@/components/ui/CleanAvatar";

interface commentsProps {
  task: Task;
}

interface CommentItem {
  id: string;
  task_id: string;
  user_name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
}

export default function CommentSection({ task }: commentsProps) {
  const backendUrl = process.env.NEXT_PUBLIC_baCKEND_URL;
  const { userDetails } = useContextData();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  //for reply comment
  const [replyInputs, setReplyInputs] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Comments for this specific task
  const fetchComments = async () => {
    if (!task.id) {
      console.log("TaskId required!");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/tasks/comment/${task.id}`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch comment");

      const commentsData = await res.json();
      setComments(commentsData || []);
    } catch (err) {
      console.log("Comment fetch nahi ho paya.");
    }
  };
  // Add New Comment to Supabase
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    //insert comment data to database
    const payload = {
      task_id: task.id,
      content: newComment,
      user_id: userDetails?.userId,
      user_name: userDetails?.googleName,
    };

    try {
      const res = await fetch(`${backendUrl}/tasks/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create comment");
      toast.success("Add comment successfully!");

      setNewComment("");

      //Refresh data
      fetchComments();
    } catch (err) {
      toast.error("Failed to add comment!.");
      //console.log("Comment error",err);
    }
  };
  //for Reply comment
  const handlePostComment = async (parentId: string) => {
    // e.preventDefault();
    if (!replyInputs.trim()) return;

    const replyPayload = {
      task_id: task.id,
      content: replyInputs,
      user_id: userDetails?.userId || null,
      user_name: userDetails?.googleName,
      parent_id: parentId,
    };

    try {
      const res = await fetch(`${backendUrl}/tasks/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replyPayload),
      });

      if (!res.ok) throw new Error("Failed to create comment");
      toast.success("Reply saved!");
      setReplyInputs("");
    } catch (error) {
      toast.error("Failed to post reply. Please try again.");
      //console.error('Error adding comment/reply:',error);
      setReplyInputs("");
    }

    fetchComments();
  };

  useEffect(() => {
    if (task.id) {
      fetchComments();
    }
  }, [task.id]);

   const avatarSrc = userDetails?.googleAvatar 
      ? CleanAvatar(userDetails.googleAvatar) 
      : '/defaultimg.png';

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
        Comments
      </h2>

      {/* Existing comment */}
      <div>
        {comments
          .filter((com) => !com.parent_id)
          .map((comment) => {
            const childReplies = comments.filter(
              (c) => c.parent_id === comment.id,
            );
            return (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200"
              >
                {/*Main aur reply comment */}
                <div>
                  {/*Main Cooment */}
                  <div className="flex gap-2 p-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-[9px] text-white">
                      <Avatar
                        name={task.assignee}
                        src={avatarSrc || '/defaultimg.png'}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-gray-900 dark:text-gray-200">
                          {comment.user_name}
                        </span>

                        <span className="text-[9px] text-gray-400 dark:text-gray-500">
                          {FormateTime(comment.created_at)}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                  </div>

                  {/*Reply comment */}
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                      {/* Render Nested Child Replies */}
                      {childReplies.length > 0 && (
                        <div className="pl-11 pr-4 pb-2 space-y-3">
                          {childReplies.map((reply) => {
                            const replyInitials = reply.user_name
                              ? reply.user_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()
                              : "AD";
                            return (
                              <div
                                key={reply.id}
                                className="bg-white dark:bg-gray-900 rounded-md "
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-indigo-600/80 flex items-center justify-center text-[9px] text-white">
                                    {replyInitials}
                                  </div>
                                  <span className="text-[10px] text-black dark:text-white">
                                    {reply.user_name}
                                  </span>
                                  <span className="text-[9px] text-gray-500">
                                    {FormateTime(reply.created_at)}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-800 dark:text-gray-300 pl-8">
                                  {reply.content}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reply Input*/}
                <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 px-3 py-2 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-lg">
                  <input
                    type="text"
                    value={replyInputs}
                    onChange={(e) => setReplyInputs(e.target.value)}
                    placeholder="Leave a reply..."
                    className="flex-1 text-xs outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />

                  <span className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <Paperclip size={14} />{" "}
                  </span>

                  <button
                    onClick={() => handlePostComment(comment.id)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* New comment */}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3 transition-colors duration-200">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 text-xs outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <button
          title="Attach File"
          className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <Paperclip size={14} />
        </button>

        <button
          onClick={handleAddComment}
          title="Send Comment"
          className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
    </section>
  );
}
