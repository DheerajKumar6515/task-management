import { ChevronDown } from "lucide-react";

export default function ActivityUpdates() {
  return (
    <section className="mt-4 rounded-lg border border-gray-200">

      <div className="flex items-center gap-1 border-b border-gray-100 px-3 py-2.5">
        <span><ChevronDown className="w-3.5 h-3.5"/></span>

        <h2 className="text-xs font-semibold">
          Updates
        </h2>
      </div>

      <div className="space-y-4 p-3">

        <Activity
          text="changed priority from No priority to Urgent"
        />

        <Activity
          text="posted an update · Aug 2026"
        />

      </div>
    </section>
  );
}

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex gap-2">

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[9px]">
        👤
      </div>

      <div>
        <p className="text-[10px] font-medium">
          You
        </p>

        <p className="mt-1 text-[10px] text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}
