import type { RiskTypeOption } from "../hooks/useRiskTypeSelection";

export const DEFAULT_RISK_TYPE_OPTIONS: RiskTypeOption[] = [
  {
    id: "Credit Risk",
    label: "Credit Risk",
    enabled: true,
    badge: "Available",
    description: "Analyze credit risk exposure, default probabilities, and portfolio quality"
  },
  {
    id: "Liquidity Risk",
    label: "Liquidity Risk",
    enabled: false,
    badge: "Q3 2024",
    description: "Assess liquidity gaps, funding risks, and cash flow mismatches"
  },
  {
    id: "Market Risk",
    label: "Market Risk",
    enabled: false,
    badge: "Q4 2024",
    description: "Evaluate market price fluctuations, interest rate risk, and FX exposure"
  },
] as const;

export const RISK_TYPE_DESCRIPTIONS = {
  "Credit Risk": "Analysis of loan portfolios, default rates, and creditworthiness",
  "Liquidity Risk": "Assessment of cash flow stability and funding availability",
  "Market Risk": "Evaluation of market volatility and price sensitivity"
} as const;