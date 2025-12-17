interface PercentileInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PercentileInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "e.g., 0.05",
  className = ""
}: PercentileInputProps) => {
  return (
    <div className="flex items-center justify-between">
      <label className="block text-md text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 ${className}`}
          placeholder={placeholder}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          %
        </div>
      </div>
    </div>
  );
};

export default PercentileInput;