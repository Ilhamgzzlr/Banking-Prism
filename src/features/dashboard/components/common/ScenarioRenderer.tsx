import {
  RegulatoryMacroeconomicScenarios,
  CustomMacroeconomicScenarios,
  MacroeconomicScenarioGenerator
} from "../tabs/scenario-types";
import { DEFAULT_SCENARIO_OPTIONS } from "../tabs/data/scenarioConfig";

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

  const scenarioConfig = DEFAULT_SCENARIO_OPTIONS.find(opt => opt.id === scenarioType);

  switch (scenarioType) {
    case "Regulatory Macroeconomic Scenarios":
      return (
        <RegulatoryMacroeconomicScenarios
          onFileChange={onRegulatoryFileChange}
          templatePath={scenarioConfig?.templatePath}
          templateFileName={scenarioConfig?.templateFileName}
        />
      );
    case "Custom Macroeconomic Scenarios":
      return (
        <CustomMacroeconomicScenarios
          onCustomFileChange={onCustomFileChange}
          templatePath={scenarioConfig?.templatePath}
          templateFileName={scenarioConfig?.templateFileName}
        />
      );
    case "macroeconomic":
      return <MacroeconomicScenarioGenerator onLevelsChange={onMacroLevelsChange} />;
    default:
      return <div className="p-8 text-center text-gray-500">Select a scenario type</div>;
  }
};

export default ScenarioRenderer;