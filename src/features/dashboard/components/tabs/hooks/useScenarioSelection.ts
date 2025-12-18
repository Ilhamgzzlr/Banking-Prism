import { useState } from 'react';
import { DEFAULT_SCENARIO_OPTIONS } from '../data/scenarioConfig';

export type ScenarioType = "Regulatory Macroeconomic Scenarios" | "Custom Macroeconomic Scenarios" | "macroeconomic";

export interface ScenarioOption {
  id: ScenarioType;
  label: string;
  description?: string;
  templatePath?: string;
  templateFileName?: string;
}

export const useScenarioSelection = (
  initialScenario: ScenarioType = "Regulatory Macroeconomic Scenarios",
  customOptions?: ScenarioOption[] // Optional custom options
) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>(initialScenario);

  const scenarioOptions = customOptions || DEFAULT_SCENARIO_OPTIONS;

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId as ScenarioType);
  };

  return {
    selectedScenario,
    scenarioOptions,
    handleScenarioChange,
    setSelectedScenario
  };
};