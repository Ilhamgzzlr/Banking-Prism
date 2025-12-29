export interface Page6Params {
  init_params: {
    TRAIN_RATIO: number;
    RESID_MODE_PD: "Normal" | "Bootstrapping" | "Residual";
    WRITE_OFF_VALUE: number;
    N_PATHS_PD: number;
    CURE_RATE_VALUE: number;
    EQUITY: number;
  };

  ead_config: {
    ead_growth_assumption: "Constant" | "Manual" | "GDP Growth";
    ead_values: {
      ead_column: string;
      value: number;
      elasticity_value?: number;
    }[];
    gdp_column_name?: string;
  };

  npl_values: Record<string, number>;

  rwa_config: {
    credit_rwa: number;
    non_credit_rwa: number;
    operational_rwa: number;
  };

  lgd_config: {
    lgd_mode: "Constant" | "RR Model" | "LGD Model";
    lgd_constant_value?: number;
    historical_data_file?: File | null;
    related_macro_data?: string[];
    modelling_approach?: "auto" | "custom";
  };
}

// Updated StressTestParameters with dynamic fields
export interface StressTestParameters {
  // Initialization parameters
  train_ratio: string;
  resid_mode_pd: "Normal" | "Bootstrapping" | "Residual";
  write_off_value: string;
  n_paths_pd: string;
  cure_rate_value: string;
  equity: string;

  // Dynamic EAD parameters (now objects instead of individual fields)
  exposure: Record<string, string>;  // { corporation: "1000", micro: "2000", ... }
  ead: Record<string, string>;       // { corporation: "1.5", micro: "1.2", ... }
  npl: Record<string, string>;       // { corporation: "500", micro: "300", ... }

  // Growth assumption
  ead_growth_assumption: "constant" | "manual" | "gdp";
  gdp_column: string;

  // RWA parameters
  rwa_credit: string;
  rwa_non_credit: string;
  rwa_operational: string;

  // LGD parameters
  lgd_method: "constant" | "rr_model" | "lgd_model";
  lgd_constant_value: string;
  rr_file: File | null;
  rr_macro_columns: string[];
  rr_modelling_approach: "auto" | "custom";
  lgd_file: File | null;
  lgd_macro_columns: string[];
  lgd_modelling_approach: "auto" | "custom";
}