"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  className = ""
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block mb-3 text-sm font-display font-bold text-[#2D6A4F] tracking-wide">
          {label}
        </label>
      )}

      {/* Premium Input Box */}
      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center justify-between px-5 py-4 rounded-2xl
                   bg-gradient-to-br from-white via-[#fefefe] to-[#f8fafc]
                   border-2 border-[#e8f5f0] hover:border-[#52B788]/60
                   shadow-[0_4px_12px_rgba(45,106,79,0.08)]
                   hover:shadow-[0_8px_24px_rgba(45,106,79,0.15)]
                   focus:ring-4 focus:ring-[#52B788]/20 focus:border-[#52B788]
                   outline-none transition-all duration-300 ease-out
                   hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className={`text-base font-medium transition-colors duration-200 ${
          value
            ? "text-[#2D6A4F] group-hover:text-[#40916C]"
            : "text-[#6b7280] group-hover:text-[#4b5563]"
        }`}>
          {value ? format(value, "EEEE, MMMM d, yyyy") : placeholder}
        </span>
        <CalendarIcon className="w-5 h-5 text-[#40916C] group-hover:text-[#52B788] transition-colors duration-200 group-hover:scale-110" />
      </button>

      {/* Premium Calendar Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute mt-3 z-50 animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <div className="bg-gradient-to-br from-white via-[#fefefe] to-[#f8fafc]
                          rounded-3xl shadow-[0_20px_40px_rgba(45,106,79,0.15),0_8px_16px_rgba(0,0,0,0.1)]
                          border border-[#e8f5f0]/60 backdrop-blur-sm p-6
                          ring-1 ring-black/5">
            <DayPicker
              mode="single"
              selected={value}
              onSelect={(day) => {
                onChange?.(day);
                setOpen(false);
              }}
              classNames={{
                root: "daypicker",
                caption_label: "caption_label",
                nav_button: "nav_button",
                head_cell: "head_cell",
                day: "day",
                day_selected: "day_selected",
                day_today: "day_today",
              }}
              components={{
                Chevron: ({ orientation, ...props }) => {
                  const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
                  return (
                    <Icon
                      className="w-5 h-5 text-[#2D6A4F] hover:text-[#40916C] transition-colors duration-200"
                      {...props}
                    />
                  );
                },
              }}
            />

            {/* Premium Footer Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#e8f5f0]">
              <button
                onClick={() => {
                  onChange?.(new Date());
                  setOpen(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#52B788] to-[#40916C]
                           text-white font-semibold rounded-xl shadow-lg
                           hover:shadow-xl hover:from-[#40916C] hover:to-[#2D6A4F]
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Today
              </button>
              <button
                onClick={() => {
                  onChange?.(undefined);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-white text-[#6b7280] font-medium rounded-xl
                           shadow-md border border-[#e5e7eb]
                           hover:bg-[#f9fafb] hover:text-[#374151] hover:shadow-lg
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}