import { Button } from "@/components/ui/button";

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
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default BackButton;