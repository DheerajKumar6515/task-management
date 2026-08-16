import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="flex h-8 w-36 lg:w-full max-w-61.25 items-center rounded-md border border-gray-200 bg-white px-2.5 focus-within:border-gray-300">
      <Search className="mr-2 h-3.5 w-3.5 text-gray-600" />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search tasks..."
        className="min-w-0 flex-1 bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400"
      />

      <span className="hidden rounded bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500 sm:block">
        ⌘F
      </span>
    </div>
  );
}
