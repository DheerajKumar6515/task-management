import {useContextData} from "@/Context/GlobalContext";

interface ProjectRowProps {
  title: string;
  priority: "High" | "Medium" | "Low";
}

export default function ProjectRow({
  title,
  priority,
}: ProjectRowProps) {

  const {color}=useContextData();

  const textColorMap: Record<string, string> = {
  amber: "text-amber-500",
  blue: "text-purple-600",
  pink: "text-pink-500",
  rose: "text-rose-600",
  emerald: "text-emerald-600",
  black: "text-black",
};
  const priorityStyles = {
    High: "text-red-500",
    Medium: "text-orange-500",
    Low: "text-gray-400",
  };

  return (
    <div className="grid grid-cols-4 border-t border-gray-200 px-3 py-2 text-[10px]">
      {/* Project name */}
      <span className={textColorMap[color] || "text-black"}>{title}</span>

      {/* Priority */}
      <span className={priorityStyles[priority]}>
        {priority}
      </span>

      {/* Lead */}
      <span>Admin</span>

      {/* Actions */}
      <button
        type="button"
        className="text-left text-gray-500 hover:text-gray-900"
      >
        ...
      </button>
    </div>
  );
}