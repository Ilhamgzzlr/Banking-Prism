interface RiskTypeCardProps {
  id: string;
  label: string;
  isSelected: boolean;
  onChange: (id: string) => void;
  name: string;
  enabled: boolean;
  badge?: string;
}

const RiskTypeCard = ({
  id,
  label,
  isSelected,
  onChange,
  name,
  enabled,
}: RiskTypeCardProps) => {
  const handleClick = () => {
    if (enabled) {
      onChange(id);
    }
  };

  return (
    <label
      className={`flex flex-1 items-center gap-3 p-4 border rounded-lg transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : enabled
          ? "cursor-pointer hover:border-blue-300"
          : "cursor-not-allowed opacity-60 bg-gray-100"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={id}
        checked={isSelected}
        onChange={handleClick}
        disabled={!enabled}
        className={`mt-1 ${enabled ? "text-blue-600 cursor-pointer" : "cursor-not-allowed"}`}
      />
      <div className="flex-1 flex justify-between items-center">
        <p className="font-medium text-gray-900">{label}</p>
      </div>
    </label>
  );
};

export default RiskTypeCard;