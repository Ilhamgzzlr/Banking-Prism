import { useState } from 'react';
import {
  // DEFAULT_PARAMETER_VALUES,
  // LOAN_SEGMENTS,
  getDefaultParameterValues
} from '../data/parameterConfig';

export interface Parameters {
  // Initialization
  train_ratio: string;
  n_paths_pd: string;
  resid_mode_pd: string;
  cure_rate_value: string;
  write_off_value: string;
  equity: string;

  // EAD
  // exposure_corporation: string;
  // exposure_micro: string;
  // exposure_housing: string;
  // exposure_civil: string;

  exposure: Record<string, string>;
  ead: Record<string, string>;
  npl: Record<string, string>;

  // Growth Assumption
  ead_growth_assumption: "constant" | "manual" | "gdp";
  gdp_column: string;
  // ead_corporation: string;
  // ead_micro: string;
  // ead_housing: string;
  // ead_civil: string;

  // // NPL
  // npl_corporation: string;
  // npl_micro: string;
  // npl_housing: string;
  // npl_civil: string;

  // RWA
  rwa_credit: string;
  rwa_non_credit: string;
  rwa_operational: string;

  // LGD
  lgd_method: "constant" | "modelling_rr" | "modelling_lgd";
  lgd_constant_value: string;
  rr_file: File | null;
  rr_macro_column: string;
  rr_modelling_approach: "auto" | "custom";
  lgd_file: File | null;
  lgd_macro_column: string;
  lgd_modelling_approach: "auto" | "custom";
}

export const useParameters = (initialParams?: Partial<Parameters>, stressColumns: string[] = []) => {
  const [parameters, setParameters] = useState<Parameters>(() => {
    const defaults = getDefaultParameterValues(stressColumns);
    return {
      ...defaults,
      ...initialParams,
      // Ensure nested objects are properly merged
      exposure: { ...defaults.exposure, ...initialParams?.exposure },
      ead: { ...defaults.ead, ...initialParams?.ead },
      npl: { ...defaults.npl, ...initialParams?.npl },
    };
  });

  const [showElasticityTooltip, setShowElasticityTooltip] = useState(false);

  const updateParameter = <K extends keyof Parameters>(
    field: K,
    value: Parameters[K]
  ) => {
    setParameters(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof Parameters, file: File | null) => {
    updateParameter(field, file);
  };

  // const handleSegmentChange = (segment: keyof Parameters, value: string) => {
  //   updateParameter(segment, value);
  // };

  // const getSegmentValues = (segmentType: "exposure" | "ead" | "npl") => {
  //   const prefixes = {
  //     exposure: "exposure_",
  //     ead: "ead_",
  //     npl: "npl_"
  //   };

  //   const prefix = prefixes[segmentType];
  //   return LOAN_SEGMENTS.map(segment => ({
  //     segment,
  //     value: parameters[`${prefix}${segment}` as keyof Parameters] as string
  //   }));
  // };

  const validateParameters = () => {
    // Validate required fields
    const requiredFields: (keyof Parameters)[] = [
      'train_ratio', 'n_paths_pd', 'resid_mode_pd',
      // 'exposure_corporation', 'exposure_micro', 'exposure_housing', 'exposure_civil'
    ];

    for (const field of requiredFields) {
      if (!parameters[field]) {
        return false;
      }
    }

    for (const segment of stressColumns) {
      if (!parameters.exposure[segment]) {
        return false;
      }
    }

    // Validate LGD method
    if (parameters.lgd_method === "constant" && !parameters.lgd_constant_value) {
      return false;
    }

    if (parameters.lgd_method === "modelling_rr" && !parameters.rr_file) {
      return false;
    }

    if (parameters.lgd_method === "modelling_lgd" && !parameters.lgd_file) {
      return false;
    }

    return true;
  };

  const resetToDefaults = () => {
    setParameters(getDefaultParameterValues(stressColumns));
  };

  return {
    parameters,
    updateParameter,
    handleFileChange,
    // handleSegmentChange,
    // getSegmentValues,
    validateParameters,
    resetToDefaults,
    showElasticityTooltip,
    setShowElasticityTooltip
  };
};