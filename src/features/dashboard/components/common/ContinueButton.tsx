import { Button } from "@/components/ui/button";

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
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-purple-600 hover:bg-purple-700"
    >
      {label}
    </Button>
  );
};

export default ContinueButton;