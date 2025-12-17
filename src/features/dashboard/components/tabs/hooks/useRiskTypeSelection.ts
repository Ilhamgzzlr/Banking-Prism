import { useState } from 'react';
import { DEFAULT_RISK_TYPE_OPTIONS } from '../data/riskTypeConfig';

export type RiskType = "Credit Risk" | "Liquidity Risk" | "Market Risk";

export interface RiskTypeOption {
  id: RiskType;
  label: string;
  enabled: boolean;
  badge?: string;
  description?: string;
}

export const useRiskTypeSelection = (
  initialRiskType: RiskType = "Credit Risk",
  customOptions?: RiskTypeOption[]
) => {
  const [selectedRiskType, setSelectedRiskType] = useState<RiskType>(initialRiskType);

  const riskTypeOptions = customOptions || DEFAULT_RISK_TYPE_OPTIONS;

  const handleRiskTypeChange = (riskTypeId: string) => {
    const option = riskTypeOptions.find(opt => opt.id === riskTypeId);
    if (option?.enabled) {
      setSelectedRiskType(riskTypeId as RiskType);
    }
  };

  const getEnabledRiskTypes = () => {
    return riskTypeOptions.filter(option => option.enabled);
  };

  const isRiskTypeEnabled = (riskTypeId: string) => {
    const option = riskTypeOptions.find(opt => opt.id === riskTypeId);
    return option?.enabled || false;
  };

  return {
    selectedRiskType,
    riskTypeOptions,
    handleRiskTypeChange,
    setSelectedRiskType,
    getEnabledRiskTypes,
    isRiskTypeEnabled
  };
};