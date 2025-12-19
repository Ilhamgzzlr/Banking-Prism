export const LOAN_SEGMENTS = ["corporation", "micro", "housing", "civil"] as const;

export const INITIALIZATION_PARAMETERS = [
  { id: "train_ratio", label: "TRAIN_RATIO", placeholder: "e.g., 80%", unit: "%" },
  { id: "n_paths_pd", label: "N_PATHS_PD", placeholder: "e.g., 100000" },
  { id: "resid_mode_pd", label: "RESID_MODE_PD", placeholder: 'e.g., "gaussian"' },
  { id: "cure_rate_value", label: "CURE_RATE_VALUE", placeholder: "e.g., 0.5", unit: "%" },
  { id: "write_off_value", label: "WRITE_OFF_VALUE", placeholder: "e.g., 0.02", unit: "%" },
  { id: "equity", label: "EQUITY", placeholder: "e.g., 10", unit: "units" },
] as const;

export const GROWTH_ASSUMPTION_OPTIONS = [
  {
    value: "constant" as const,
    label: "Constant",
    description: "EAD stays unchanged throughout operating periods"
  },
  {
    value: "manual" as const,
    label: "Manual",
    description: "Annual EAD growth assumption by segment"
  },
  {
    value: "gdp" as const,
    label: "GDP Growth",
    description: "Can grow follows GDP growth based on the Correlation"
  }
] as const;

export const LGD_METHODS = [
  {
    value: "rr" as const,
    label: "Loss Given Default",
  },
  {
    value: "modelling_rr" as const,
    label: "Modelling RR",
  },
  {
    value: "modelling_lgd" as const,
    label: "Modelling LGD",
  }
] as const;

export const DEFAULT_PARAMETER_VALUES = {
  // Initialization
  train_ratio: "",
  n_paths_pd: "",
  resid_mode_pd: "",
  cure_rate_value: "",
  write_off_value: "",
  equity: "",

  // EAD
  exposure_corporation: "",
  exposure_micro: "",
  exposure_housing: "",
  exposure_civil: "",

  // Growth Assumption
  ead_growth_assumption: "constant" as const,
  gdp_column: "",
  ead_corporation: "",
  ead_micro: "",
  ead_housing: "",
  ead_civil: "",

  // NPL
  npl_corporation: "",
  npl_micro: "",
  npl_housing: "",
  npl_civil: "",

  // RWA
  rwa_credit: "",
  rwa_non_credit: "",
  rwa_operational: "",

  // LGD
  lgd_method: "rr" as const,
  rr_value: "",
  rr_file: null,
  rr_macro_column: "",
  rr_modelling_approach: "auto" as const,
  lgd_file: null,
  lgd_macro_column: "",
  lgd_modelling_approach: "auto" as const,
};