"use client";
import { Calendar, Tag, RefreshCw } from "lucide-react";
import MultiSelect from "@/components/MultiSelect";
import { useState, useEffect } from "react";

interface FiltersProps {
  startDate: string;
  categories: string[];
  onFilterChange: (startDate: string, categories: string[]) => void;
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  startDate,
  categories,
  onFilterChange,
  onResetFilters,
}) => {
  const currentDate = new Date();
  const minDate = currentDate.toISOString().slice(0, 10);
  const maxDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() + 1),
  )
    .toISOString()
    .slice(0, 10);
  const minMonth = minDate.slice(0, 7);
  const maxMonth = maxDate.slice(0, 7);

  const [inputType, setInputType] = useState<"month" | "date">("month");
  const [formattedStartDate, setFormattedStartDate] = useState(
    startDate && startDate.match(/^\d{4}-\d{2}$/) ? startDate : "",
  );

  useEffect(() => {
    // Detect browser support for type="month" on client side
    const checkMonthSupport = () => {
      if (typeof window !== "undefined") {
        const input = document.createElement("input");
        input.setAttribute("type", "month");
        const isSupported = input.type === "month";
        setInputType(isSupported ? "month" : "date");
        // Update formattedStartDate based on the input type
        setFormattedStartDate(
          isSupported
            ? startDate && startDate.match(/^\d{4}-\d{2}$/)
              ? startDate
              : ""
            : startDate && startDate.match(/^\d{4}-\d{2}$/)
              ? `${startDate}-01`
              : "",
        );
      }
    };
    checkMonthSupport();
  }, [startDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const monthValue = value.slice(0, 7);
    setFormattedStartDate(monthValue);
    onFilterChange(monthValue, categories);
  };

  return (
    <div className="bg-white-90 flex justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="flex flex-row gap-6 rounded-lg border border-teal-80 bg-white p-4 shadow-md">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-teal-30"
            >
              <Calendar size={16} className="text-teal-10" />
              <span>Start Date</span>
            </label>
            <div className="relative">
              <input
                id="startDate"
                type={inputType}
                value={formattedStartDate || ""}
                min={inputType === "month" ? minMonth : minDate}
                max={inputType === "month" ? maxMonth : maxDate}
                onChange={handleDateChange}
                className="h-[50px] w-full rounded-lg border border-teal-80 bg-teal-70 p-4 text-sm text-foreground shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-20"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-medium text-teal-30"
              >
                <Tag size={16} className="text-teal-10" />
                Categories
              </label>
              <MultiSelect
                id="category"
                options={["c1", "c2", "c3", "c4", "c5", "c6", "c7"]}
                value={categories}
                onChange={(selected: string[]) =>
                  onFilterChange(formattedStartDate, selected)
                }
                placeholder="Select categories"
              />
              <span className="mt-1 text-xs text-gray-500">
                You can select multiple categories
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onResetFilters}
              className="group flex w-fit items-center gap-2 rounded-md bg-teal-20 px-4 py-2.5 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-teal-10 focus:outline-none focus:ring-2 focus:ring-teal-20 focus:ring-offset-2"
            >
              <span>Reset Filters</span>
              <RefreshCw
                size={16}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
