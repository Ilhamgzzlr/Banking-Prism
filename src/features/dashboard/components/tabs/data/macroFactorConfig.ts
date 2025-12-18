import type{ MacroFactor } from "../hooks/useMacroFactors";

export const DEFAULT_MACRO_FACTORS: MacroFactor[] = [
  { 
    id: "PD_A", 
    name: "PD_A", 
    selected: false, 
    subFactors: ["Macro A", "Macro B", "Macro C"], 
    selectedSubFactors: [],
    description: "Probability of Default - Group A"
  },
  { 
    id: "PD_B", 
    name: "PD_B", 
    selected: false,
    subFactors: ["Macro A", "Macro B", "Macro C"], 
    selectedSubFactors: [],
    description: "Probability of Default - Group B"
  },
  { 
    id: "PD_C", 
    name: "PD_C", 
    selected: false,
    subFactors: ["Macro A", "Macro B", "Macro C"], 
    selectedSubFactors: [],
    description: "Probability of Default - Group C"
  },
  { 
    id: "PD_D", 
    name: "PD_D", 
    selected: false,
    subFactors: ["Macro A", "Macro B", "Macro C"],
    selectedSubFactors: [],
    description: "Probability of Default - Group D"
  },
];

export const PERCENTILE_CONFIG = {
  MIN: 0.1,
  MAX: 99.9,
  DEFAULT_LEVEL1: "5.0",
  DEFAULT_LEVEL2: "10.0"
} as const;