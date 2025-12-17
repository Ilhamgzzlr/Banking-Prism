interface MethodCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  name: string;
  isSelected?: boolean;
  onChange?: () => void;
}

const MethodCard = ({
  title,
  desc,
  icon,
  name,
  isSelected = false,
  onChange
}: MethodCardProps) => {
  return (
    <label
      className={`group flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-purple-500 shadow-md transition-colors duration-300 ${
        isSelected ? 'border-purple-500 bg-purple-50' : ''
      }`}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
        isSelected ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
      }`}>
        <div>{icon}</div>
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <input
        type="radio"
        name={name}
        className="accent-purple-600 size-4"
        checked={isSelected}
        onChange={onChange}
      />
    </label>
  );
};

export default MethodCard;