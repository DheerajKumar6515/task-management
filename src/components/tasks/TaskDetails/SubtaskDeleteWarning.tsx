import { SubTasks } from '@/types/task'
import { AlertTriangle } from 'lucide-react'

interface DeleteSubtasksProps{
    taskId:string;
    setDeletingSubtaskId:(task:null)=>void
}

function SubtaskDeleteWarning({setDeletingSubtaskId,taskId}:DeleteSubtasksProps) {

    const handleDelete=async()=>{
        if(!taskId){
            console.log("Not Found Subtask!")
        }
        
        try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_baCKEND_URL}/tasks/delsubtask/${taskId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete column");
      }

     console.error("Subtask delete successfully");
     setDeletingSubtaskId(null)
    } catch (err) {
      console.error("Subtask delete error:", err);
    }
     
     setDeletingSubtaskId(null)
     
    }

  return (
   <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="mx-auto w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">Delete Subtask?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this subtask? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeletingSubtaskId(null)}
                className="px-4 cursor-pointer py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm"
              >
                No, Keep it
              </button>
              <button
                onClick={handleDelete}
                className="px-4 cursor-pointer py-2 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

export default SubtaskDeleteWarning
