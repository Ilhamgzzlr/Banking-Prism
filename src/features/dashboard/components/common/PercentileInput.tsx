interface PercentileInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PercentileInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "e.g., 0.05",
  className = "",
  disabled = false
}: PercentileInputProps) => {
  return (
    <div className="flex items-center justify-between">
      <label className={`block text-md mb-2 ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-96 px-4 py-2 
            border rounded-md 
            outline-none
            /* Hilangkan spinner untuk semua browser */
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:m-0
            [-moz-appearance:textfield]
            [appearance:textfield]
            ${disabled 
              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }
            ${className}
          `}
          placeholder={placeholder}
        />
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
          disabled ? 'text-gray-300' : 'text-gray-400'
        }`}>
          %
        </div>
      </div>
    </div>
  );
};

export default PercentileInput;