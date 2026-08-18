interface ProjectRowProps {
  title: string;
  priority: "High" | "Medium" | "Low";
}

export default function ProjectRow({
  title,
  priority,
}: ProjectRowProps) {
  const priorityStyles = {
    High: "text-red-500",
    Medium: "text-orange-500",
    Low: "text-gray-400",
  };

  return (
    <div className="grid grid-cols-4 border-t border-gray-200 px-3 py-2 text-[10px]">
      {/* Project name */}
      <span>{title}</span>

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