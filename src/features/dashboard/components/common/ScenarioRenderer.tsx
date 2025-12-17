import {
  RegulatoryMacroeconomicScenarios,
  CustomMacroeconomicScenarios,
  MacroeconomicScenarioGenerator
} from "../tabs/scenario-types";

interface ScenarioRendererProps {
  scenarioType: string;
  onRegulatoryFileChange?: (file: File | null) => void;
  // onCustomLevelsChange?: (levels: any[]) => void;
  onCustomFileChange?: (file: File | null) => void;
  onMacroLevelsChange?: (levels: any[]) => void;
}

const ScenarioRenderer = ({ 
  scenarioType, 
  onRegulatoryFileChange,
  onCustomFileChange,
  onMacroLevelsChange 
}: ScenarioRendererProps) => {
  switch (scenarioType) {
    case "Regulatory Macroeconomic Scenarios":
      return <RegulatoryMacroeconomicScenarios onFileChange={onRegulatoryFileChange} />;
    case "Custom Macroeconomic Scenarios":
      return <CustomMacroeconomicScenarios onCustomFileChange={onCustomFileChange} />;
    case "macroeconomic":
      return <MacroeconomicScenarioGenerator onLevelsChange={onMacroLevelsChange} />;
    default:
      return <div className="p-8 text-center text-gray-500">Select a scenario type</div>;
  }
};

export default ScenarioRenderer;