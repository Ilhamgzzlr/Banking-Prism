import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Section, ModelCard } from "../common";
import { useModelSelection } from "../tabs/hooks/useModelSelection";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (model: { id: string; name: string }) => void;
};

export default function SelectModelDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  const {
    models,
    selectedModelId,
    handleModelSelect,
    handleDownload,
    isModelSelected,
  } = useModelSelection();

  const selectedModel = models.find((m) => m.id === selectedModelId);

  const handleConfirm = () => {
    if (!selectedModel) return;
    onConfirm({
      id: selectedModel.id,
      name: selectedModel.name,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select LGD Model</DialogTitle>
        </DialogHeader>

        <Section title="Select LGD Model" required />

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              id={model.id}
              name={model.name}
              isSelected={selectedModelId === model.id}
              onSelect={handleModelSelect}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={!isModelSelected()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
