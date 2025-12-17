interface SimpleRadioButtonProps {
  label?: string;
  name: string;
  value?: string;
  isSelected?: boolean;
  onchange?: (value: string) => void;
}

const SimpleRadioButton = ({
  label,
  name,
  value,
  isSelected = false,
    onchange
}: SimpleRadioButtonProps) => {
    const handleChange = () => {
        if (onchange && value) {
            onchange(value);
        }
    };
    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                onChange={handleChange}
                className="accent-purple-600 size-4"
            />
            <span className="text-sm">{label}</span>
        </label>
    );
};

export default SimpleRadioButton;