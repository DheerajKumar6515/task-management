import {
  Eye,
  Lock,
  MoreHorizontal,
  PanelRight,
} from "lucide-react";

interface TaskDetailsHeaderProps {
  title: string;
  description?: string;
}

export default function TaskDetailsHeader({
  title,
  description,
}: TaskDetailsHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex shrink-0 gap-1.5">
        <button className="icon-button cursor-pointer">
          <Lock size={14} />
        </button>

        <button className="icon-button cursor-pointer">
          <Eye size={14} />
        </button>

        <button className="icon-button cursor-pointer">
          <MoreHorizontal size={14} />
        </button>

        <button className="icon-button cursor-pointer">
          <PanelRight size={14} />
        </button>
      </div>
    </div>
  );
}