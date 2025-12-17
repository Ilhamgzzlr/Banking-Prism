import PercentileInput from "./PercentileInput";

interface PercentileSectionProps {
  level1: string;
  level2: string;
  onLevel1Change: (value: string) => void;
  onLevel2Change: (value: string) => void;
  show: boolean;
}

const PercentileSection = ({
  level1,
  level2,
  onLevel1Change,
  onLevel2Change,
  show
}: PercentileSectionProps) => {
  if (!show) return null;

  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Choose the percentile you want to use
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <PercentileInput
          label="Level 1 / Baseline"
          name="level1"
          value={level1}
          onChange={onLevel1Change}
          placeholder="e.g., 5.0"
        />
        
        <PercentileInput
          label="Level 2 / Skenario X"
          name="level2"
          value={level2}
          onChange={onLevel2Change}
          placeholder="e.g., 10.0"
        />
      </div>
    </div>
  );
};

export default PercentileSection;