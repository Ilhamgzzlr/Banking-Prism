import { Section, ScenarioTypeCard, ContinueButton, ScenarioRenderer, BackButton } from "../common";
import { useScenarioSelection } from "./hooks/useScenarioSelection";
import { useState } from "react";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};


export default function InputScenarioTab({ onContinue, onBack }: Props) {
  const {
    selectedScenario,
    scenarioOptions,
    handleScenarioChange
  } = useScenarioSelection("Regulatory Macroeconomic Scenarios");

  const [regulatoryFile, setRegulatoryFile] = useState<File | null>(null);
  const [customFile, setCustomFile] = useState<File | null>(null);
  // const [customLevels, setCustomLevels] = useState<any[]>([]);
  const [macroLevels, setMacroLevels] = useState<any[]>([]);

  const handleContinue = () => {
    const isValid = validateScenarioData();
    if (isValid) {
      onContinue();
    } else {
      alert("Please fill all required fields");
    }
  };

  const handleBack = () => {
    onBack();
  }

  const validateScenarioData = () => {
    switch (selectedScenario) {
      case "Regulatory Macroeconomic Scenarios":
        return validateRegulatoryScenario();
      case "Custom Macroeconomic Scenarios":
        return validateCustomScenario();
      case "macroeconomic":
        return validateMacroeconomicScenario();
      default:
        return false;
    }
  };

  const validateRegulatoryScenario = () => {
    return regulatoryFile !== null;
  };

  // const validateCustomScenario = () => {
  //   // Validasi minimal 1 level, semua level harus memiliki nama dan file
  //   if (customLevels.length === 0) return false;

  //   return customLevels.every(level =>
  //     level.name && level.name.trim() !== "" && level.file !== null
  //   );
  // };
  const validateCustomScenario = () => {
    return customFile !== null;
  };


  const validateMacroeconomicScenario = () => {
    if (macroLevels.length === 0) return false;

    return macroLevels.every(level =>
      level.name &&
      level.name.trim() !== "" &&
      level.percentile >= 0 &&
      level.percentile <= 100
    );
  };

  const isContinueDisabled = !validateScenarioData();

  // Handler untuk update data dari child components
  const handleRegulatoryFileChange = (file: File | null) => {
    setRegulatoryFile(file);
  };

  // const handleCustomLevelsChange = (levels: any[]) => {
  //   setCustomLevels(levels);
  // };

  const handleCustomFileChange = (file: File | null) => {
    setCustomFile(file);
  };


  const handleMacroLevelsChange = (levels: any[]) => {
    setMacroLevels(levels);
  };

  return (
    <div className="flex flex-col flex-1">

      {/* ===== CONTENT ===== */}
      <div className="space-y-6">
        <Section
          title="Economic Stress Testing Scenario Input Options"
          required
        >
          <div className="space-x-4 flex">
            {scenarioOptions.map((option) => (
              <ScenarioTypeCard
                key={option.id}
                id={option.id}
                label={option.label}
                description={option.description}
                isSelected={selectedScenario === option.id}
                onChange={handleScenarioChange}
                name="scenarioType"
              />
            ))}
          </div>
        </Section>

        <div className="mt-6">
          <ScenarioRenderer
            scenarioType={selectedScenario}
            onRegulatoryFileChange={handleRegulatoryFileChange}
            onCustomFileChange={handleCustomFileChange}
            onMacroLevelsChange={handleMacroLevelsChange}
          />
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="mt-auto pt-6 flex justify-between gap-3">
        <BackButton onClick={handleBack} label="Back" />
        <ContinueButton
          onClick={handleContinue}
          disabled={isContinueDisabled}
          label="Continue"
        />
      </div>

    </div>
  );
}