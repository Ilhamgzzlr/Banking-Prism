export const TIME_HORIZON_OPTIONS = ["Yearly", "Quarterly", "Monthly"];

export const UPLOAD_CONFIG = {
  STRESS_TEST: {
    title: "Stress Testing Data Input",
    acceptedTypes: ".xlsx,.xls,.csv",
    description: "Upload your stress testing data file"
  },
  MACROECONOMIC: {
    title: "Macroeconomic Scenario Data Input",
    acceptedTypes: ".xlsx,.xls,.csv",
    description: "Upload macroeconomic scenario data"
  }
} as const;