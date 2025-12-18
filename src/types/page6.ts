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
    lgd_mode: "RR" | "Modelling RR" | "Modelling LGD";
    rr_value?: number;
    historical_data_file?: File | null;
    related_macro_data?: string[];
    modelling_approach?: "auto" | "custom";
  };
}

export interface StressTestParameters {
  train_ratio: string;
  resid_mode_pd: "Normal" | "Bootstrapping" | "Residual";
  write_off_value: string;
  n_paths_pd: string;
  cure_rate_value: string;
  equity: string;

  exposure_corporation: string;
  exposure_micro: string;
  exposure_housing: string;
  exposure_civil: string;

  ead_growth_assumption: "constant" | "manual" | "gdp";
  gdp_column: string;
  ead_corporation: string;
  ead_micro: string;
  ead_housing: string;
  ead_civil: string;

  npl_corporation: string;
  npl_micro: string;
  npl_housing: string;
  npl_civil: string;

  rwa_credit: string;
  rwa_non_credit: string;
  rwa_operational: string;

  lgd_method: "rr" | "modelling_rr" | "modelling_lgd";
  rr_value: string;
  rr_file: File | null;
  rr_macro_column: string;
  rr_modelling_approach: "auto" | "custom";
  lgd_file: File | null;
  lgd_macro_column: string;
  lgd_modelling_approach: "auto" | "custom";
}

