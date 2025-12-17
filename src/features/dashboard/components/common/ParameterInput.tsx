interface ParameterInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "percentage";
  required?: boolean;
  className?: string;
}

const ParameterInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "number",
  required = false,
  className = ""
}: ParameterInputProps) => {
  const inputType = type === "percentage" ? "text" : type;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default ParameterInput;