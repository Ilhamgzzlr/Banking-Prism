import { AlertTriangle, TrendingUp, Layers } from "lucide-react";

export const METHOD_OPTIONS = [
  {
    title: "Scenario Analysis",
    desc: "Conduct a resilience test of the system under extreme conditions and worst-case scenarios.",
    icon: <AlertTriangle className="size-6" />,
    value: "scenario_analysis"
  },
  {
    title: "Sensitivity Analysis",
    desc: "Analyze the impact of changes in input variables on the overall output.",
    icon: <TrendingUp className="size-6" />,
    value: "sensitivity_analysis"
  },
  {
    title: "Comprehensive Run",
    desc: "Run both analyses simultaneously to produce a comprehensive risk profile.",
    icon: <Layers className="size-6" />,
    value: "comprehensive_run"
  },
];

export const ECONOMIC_SCENARIOS = [
  { label: "Static", value: "static" },
  { label: "Dynamic", value: "dynamic" },
];
