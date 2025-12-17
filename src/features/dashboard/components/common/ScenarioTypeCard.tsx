import SimpleRadioButton from "./SimpleRadioButton";

interface ScenarioTypeCardProps {
    id: string;
    label: string;
    isSelected: boolean;
    onChange: (id: string) => void;
    name: string;
    description?: string;
}

const ScenarioTypeCard = ({
    id,
    label,
    isSelected,
    onChange,
    name,
}: ScenarioTypeCardProps) => {
    return (
        <label
            className={`flex flex-1 items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${isSelected
                ? "border-purple-500 bg-purple-50"
                : "hover:border-purple-300"
                }`}
        >

            <SimpleRadioButton
                name={name}
                value={id}
                isSelected={isSelected}
                onchange={() => onChange(id)}
            />

            <div className="flex-1">
                <p className="font-medium text-gray-900">{label}</p>
            </div>
        </label>
    );
};

export default ScenarioTypeCard;