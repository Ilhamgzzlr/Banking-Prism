import { ChevronDown, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface ExpandableSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  badge?: string | number;
}

const ExpandableSection = ({
  title,
  isExpanded,
  onToggle,
  children,
  className = "",
  badge
}: ExpandableSectionProps) => {
  return (
    <div className={`border border-gray-200 rounded-lg bg-white ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        type="button"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;