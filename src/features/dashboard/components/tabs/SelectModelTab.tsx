import { Section, ModelCard, ContinueButton, BackButton } from "../common";
import { useModelSelection } from "./hooks/useModelSelection";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};

export default function SelectModelTab({ onContinue, onBack }: Props) {
  const {
    models,
    selectedModelId,
    handleModelSelect,
    handleDownload,
    isModelSelected
  } = useModelSelection();


  const handleContinue = () => {
    if (!isModelSelected()) {
      alert("Please select a model to continue");
      return;
    }

    onContinue();
  };

  const handleBack = () => {
    onBack();
  }

  return (
    <div className="space-y-6">
      {/* Title and Instructions */}
      <Section
        title="Select LGD Model"
        required
      >
      </Section>

      {/* Model Selection */}
      <div className="space-y-3">
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
      <div className="flex justify-between gap-3 pt-4">
        <BackButton
          onClick={handleBack}
          label="Back"
        />
        <ContinueButton
          onClick={handleContinue}
          disabled={!isModelSelected()}
          label="Continue"
        />
      </div>
    </div>
  );
}