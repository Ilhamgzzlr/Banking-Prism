import { ParameterInput } from "../common";

interface ParameterSectionProps {
  title: string;
  parameters: Array<{
    id: string;
    label: string;
    value: string;
    placeholder?: string;
  }>;
  onParameterChange: (id: string, value: string) => void;
  columns?: 1 | 2 | 3 | 4;
  required?: boolean;
}

const ParameterSection = ({
  title,
  parameters,
  onParameterChange,
  columns = 2,
  required = false
}: ParameterSectionProps) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      
      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {parameters.map((param) => (
          <ParameterInput
            key={param.id}
            label={param.label}
            name={param.id}
            value={param.value}
            onChange={(value) => onParameterChange(param.id, value)}
            placeholder={param.placeholder}
            required={required}
          />
        ))}
      </div>
    </div>
  );
};

export default ParameterSection;