import React from "react";
import { Tag as LucideTag } from "lucide-react";
import { CATEGORY_COLORS } from "@/constants";

interface TagProps {
  label: string;
  category?: string;
  className?: string;
  showIcon?: boolean;
}

const Tag: React.FC<TagProps> = ({
  label,
  category = "",
  className = "",
  showIcon = false,
}) => {
  const colorClass = CATEGORY_COLORS[category] || "bg-foreground text-white";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold tracking-wide ${colorClass} ${className}`}
      aria-label={label}
    >
      {showIcon && (
        <LucideTag className="mr-1 h-3.5 w-3.5" aria-label="Tag icon" />
      )}
      {label}
    </span>
  );
};

export default Tag;
