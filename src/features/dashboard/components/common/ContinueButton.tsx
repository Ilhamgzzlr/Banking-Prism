interface ContinueButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const ContinueButton = ({ 
  onClick, 
  disabled = false, 
  label = "Continue" 
}: ContinueButtonProps) => {
  return (
    <button 
      className="px-4 py-2 bg-purple-600 text-white text-md font-medium transition-colors rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ContinueButton;