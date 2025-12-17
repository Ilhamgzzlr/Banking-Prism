interface BackButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const BackButton = ({
  onClick,
  disabled = false,
  label = "Back",
}: BackButtonProps) => {
  return (
    <button
      className="px-4 py-2 text-gray-800 rounded-md hover:bg-[#F1f5f9] border border-[#E2e8f0] text-md font-medium transition-colors"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default BackButton;
