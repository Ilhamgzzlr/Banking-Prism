// formatMetric.ts
// metrics.ts
export type MetricType = "ratio_pct" | "ratio_pct_small" | "number";

export const METRIC_CONFIG = {
  nplGross: {
    label: "NPL Gross Ratio",
    type: "ratio_pct",
    decimals: 2
  },
  nplNet: {
    label: "NPL Net Ratio",
    type: "ratio_pct",
    decimals: 2
  },
  car: {
    label: "Capital Adequacy Ratio (CAR)",
    type: "ratio_pct_small",
    decimals: 5
  }
} as const;


export function formatMetric(
  value: number,
  type: MetricType,
  decimals: number
): string {
  switch (type) {
    case "ratio_pct":
      return `${(value * 100).toFixed(decimals)}%`;

    case "ratio_pct_small":
      return `${(value * 100).toFixed(decimals)}%`;

    case "number":
    default:
      return value.toFixed(decimals);
  }
}
