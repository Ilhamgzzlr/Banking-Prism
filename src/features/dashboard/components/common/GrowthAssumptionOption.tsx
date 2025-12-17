import { InfoTooltip } from "../common";

interface GrowthAssumptionOptionProps {
  value: "constant" | "manual" | "gdp";
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: (value: "constant" | "manual" | "gdp") => void;
}

const GrowthAssumptionOption = ({
  value,
  label,
  description,
  isSelected,
  onSelect,
}: GrowthAssumptionOptionProps) => {
  return (
    <div className="relative">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="ead_growth"
          checked={isSelected}
          onChange={() => onSelect(value)}
          className="w-4 h-4 text-blue-600"
        />
        <span className="text-sm text-gray-700">{label}</span>
        <InfoTooltip content={description} position="right" />
      </label>

      
    </div>
  );
};

export default GrowthAssumptionOption;