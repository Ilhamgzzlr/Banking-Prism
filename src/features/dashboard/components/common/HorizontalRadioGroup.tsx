interface HorizontalRadioGroupProps {
  title: string;
  options: string[];
  name: string;
  required?: boolean;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const HorizontalRadioGroup = ({
  title,
  options,
  name,
  required = false,
  selectedValue,
  onValueChange
}: HorizontalRadioGroupProps) => {
  const handleChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      <div className="flex gap-4">
        {options.map((item) => {
          const value = item.toLowerCase();
          const isSelected = selectedValue === value;
          
          return (
            <label
              key={item}
              className={`flex flex-1 items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-50"
                  : "hover:border-purple-300"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                onChange={() => handleChange(value)}
                className="accent-purple-600 size-4 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalRadioGroup;