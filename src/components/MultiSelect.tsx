"use client";
import { useState, useEffect, useRef } from "react";
import { Check, X, ChevronDown } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  id?: string;
  maxWidth?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  id,
  maxWidth = "100%",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemove = (option: string) => {
    onChange(value.filter((item) => item !== option));
  };

  return (
    <div className="relative w-full" ref={dropdownRef} style={{ maxWidth }}>
      <div
        ref={containerRef}
        data-testid="category-filter"
        className="flex min-h-[50px] w-full cursor-pointer items-center rounded-lg border border-teal-80 bg-teal-70 p-3 text-sm text-foreground transition-all hover:bg-teal-60 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-20"
        onClick={() => setIsOpen(!isOpen)}
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        aria-controls="options"
      >
        <div className="flex w-full flex-wrap gap-2 pr-6">
          {value.length > 0 ? (
            value.map((selected) => (
              <div
                key={selected}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-teal-20 px-2 py-1 text-sm text-white"
              >
                {selected.toUpperCase()}
                <X
                  role="button"
                  aria-label="Remove"
                  size={14}
                  className="cursor-pointer text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(selected);
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-foreground/60">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-teal-10 transition-transform"
          style={{
            transform: isOpen
              ? "translateY(-50%) rotate(180deg)"
              : "translateY(-50%)",
          }}
        />
      </div>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-teal-80 bg-white shadow-md"
        >
          {options.map((option) => (
            <div
              key={option}
              data-testid="category-option"
              role="option"
              aria-selected={value.includes(option)}
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-teal-70"
              onClick={() => handleSelect(option)}
            >
              <span>{option.toUpperCase()}</span>
              {value.includes(option) && (
                <Check size={16} className="text-teal-20" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
