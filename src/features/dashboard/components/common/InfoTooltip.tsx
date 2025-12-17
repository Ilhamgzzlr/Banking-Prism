import { Info } from "lucide-react";
import { useState } from "react";

interface InfoTooltipProps {
  content: string;
  position?: "right" | "left" | "top" | "bottom";
  className?: string;
}

const InfoTooltip = ({ content, position = "right", className = "" }: InfoTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    right: "left-full top-0 ml-2",
    left: "right-full top-0 mr-2",
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2"
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Information"
      >
        <Info className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div 
          className={`absolute z-20 w-64 p-3 bg-white border border-gray-300 text-black text-xs rounded-lg shadow-lg ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;