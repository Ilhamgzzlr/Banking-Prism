import PercentileInput from "./PercentileInput";

interface PercentileSectionProps {
  percentiles: Record<string, string>;
  onPercentileChange: (level: string, value: string) => void;
  show: boolean;
  levelNames?: string[];
}

const PercentileSection = ({
  percentiles,
  onPercentileChange,
  show,
  levelNames
}: PercentileSectionProps) => {
  if (!show) return null;

  const defaultLevels = [
    { key: "level1", label: "Level 1 / Baseline" },
    { key: "level2", label: "Level 2 / Skenario X" }
  ];

  const levels = levelNames && levelNames.length > 0
    ? levelNames.map((name, index) => ({
      key: `level${index + 1}`,
      label: name
    }))
    : defaultLevels;

  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Choose the percentile you want to use
        </h3>
        {levelNames && levelNames.length > 0 && (
          <span className="text-xs text-gray-500">
            {levelNames.length} level{levelNames.length !== 1 ? 's' : ''} detected from uploaded file
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {levels.map((level) => (
          <PercentileInput
            key={level.key}
            label={level.label}
            name={level.key}
            value={percentiles[level.key] || ""}
            onChange={(value) => onPercentileChange(level.key, value)}
            placeholder="e.g., 5.0"
          />
        ))}
      </div>
    </div>
  );
};

export default PercentileSection;