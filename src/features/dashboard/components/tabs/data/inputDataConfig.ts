export const TIME_HORIZON_OPTIONS = ["Yearly", "Quarterly", "Monthly"];

export const UPLOAD_CONFIG = {
  STRESS_TEST: {
    title: "Stress Testing Data Input",
    acceptedTypes: ".xlsx,.xls,.csv",
    description: "Upload your stress testing data file",
    templatePath: "/templates/template_npl_ratio.xlsx",
    templateFileName: "template_npl_ratio.xlsx"
  },
  MACROECONOMIC: {
    title: "Macroeconomic Scenario Data Input",
    acceptedTypes: ".xlsx,.xls,.csv",
    description: "Upload macroeconomic scenario data",
    templatePath: "/templates/template_hist_macro.xlsx",
    templateFileName: "template_hist_macro.xlsx"
  }
} as const;