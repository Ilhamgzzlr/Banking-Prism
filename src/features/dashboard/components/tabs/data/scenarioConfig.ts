import type { ScenarioOption } from "../hooks/useScenarioSelection";

export const DEFAULT_SCENARIO_OPTIONS: ScenarioOption[] = [
  {
    id: "Regulatory Macroeconomic Scenarios",
    label: "Regulatory Macroeconomic Scenarios",
    description: "Use predefined Regulatory Macroeconomic Scenarios stress testing scenarios with official parameters",
    templatePath: "/src/templates/template_regulatory_scenario.xlsx",
    templateFileName: "template_regulatory_scenario.xlsx"
  },
  {
    id: "Custom Macroeconomic Scenarios",
    label: "Custom Macroeconomic Scenarios",
    description: "Upload your own custom scenario data in Excel or CSV format",
    templatePath: "/src/templates/template_custom_scenario.xlsx",
    templateFileName: "template_custom_scenario.xlsx"
  },
  {
    id: "macroeconomic",
    label: "Macroeconomic Scenario Generator",
    description: "Generate scenarios based on macroeconomic models and historical data"
  },
] as const;

export const SCENARIO_TITLES = {
  regulatorymacroeconomicscenarios: "Regulatory Macroeconomic Scenarios Configuration",
  custom: "Custom Macroeconomic Scenarios Configuration",
  macroeconomic: "Macroeconomic Scenario Generator"
} as const;