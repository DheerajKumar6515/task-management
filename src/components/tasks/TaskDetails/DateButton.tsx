import { useRef } from "react";
import { CalendarDays } from "lucide-react";

interface DateButtonProps {
  value: string;
  placeholder: string;
  formattedValue: string;
  onChange: (value: string) => void;
}

function DateButton({
  value,
  placeholder,
  formattedValue,
  onChange,
}: DateButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div className="flex items-center gap-1">
      
      {/* Calendar Icon */}
      <button
        type="button"
        onClick={openDatePicker}
        aria-label={`Select ${placeholder.toLowerCase()}`}
        className="
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded
          text-gray-500
          hover:bg-gray-100
          hover:text-gray-700
          cursor-pointer
        "
      >
        <CalendarDays size={13} />
      </button>

      {/* Selected Date */}
      <span className="text-[10px] text-gray-600">
        {formattedValue || placeholder}
      </span>

      {/* Native Date Input */}
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="sr-only"
      />
    </div>
  );
}

export default DateButton