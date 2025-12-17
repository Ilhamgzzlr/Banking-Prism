import { Section, RiskTypeCard, ContinueButton, RiskTypeRenderer, BackButton } from "../common";
import { useRiskTypeSelection } from "./hooks/useRiskTypeSelection";
import { useState } from "react";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};


export default function SelectRiskTypeTab({ onContinue, onBack }: Props) {
  const {
    selectedRiskType,
    riskTypeOptions,
    handleRiskTypeChange,
    isRiskTypeEnabled
  } = useRiskTypeSelection("Credit Risk");

  const [riskMetrics, setRiskMetrics] = useState<any[]>([]);

  const handleContinue = () => {
    if (!isRiskTypeEnabled(selectedRiskType)) {
      alert("Selected risk type is not available yet");
      return;
    }

    const isValid = validateRiskTypeData();
    if (!isValid) {
      alert("Please fill all required fields");
      return;
    }

    onContinue();
  };

  const handleBack = () => {
    onBack();
  }

  const validateRiskTypeData = () => {
    // Validasi berdasarkan tipe risiko yang dipilih
    switch (selectedRiskType) {
      case "Credit Risk":
        return validateCreditRiskData();
      case "Liquidity Risk":
      case "Market Risk":
        // Untuk tipe risiko yang belum tersedia, cukup validasi bahwa tipe risiko dipilih
        return true;
      default:
        return false;
    }
  };

  const validateCreditRiskData = () => {
    // Validasi untuk Credit Risk
    if (riskMetrics.length === 0) return false;

    // Setiap metric harus memiliki riskLimit, riskAppetite, dan riskCapacity yang terisi
    return riskMetrics.every(metric =>
      metric.riskLimit.trim() !== "" &&
      metric.riskTolerance.trim() !== "" &&
      metric.riskAppetite.trim() !== "" &&
      metric.riskCapacity.trim() !== ""
    );
  };

  // Handler untuk update metrics dari child component
  const handleRiskMetricsChange = (metrics: any[]) => {
    setRiskMetrics(metrics);
  };

  const isContinueDisabled = !validateRiskTypeData() || !isRiskTypeEnabled(selectedRiskType);

  return (
    <div className="space-y-6">
      {/* Risk Type Selection */}
      <Section
        title="Select Risk Types for Review"
        required
      >
        <div className="flex gap-4">
          {riskTypeOptions.map((option) => (
            <div key={option.id} className="flex-1">
              <RiskTypeCard
                id={option.id}
                label={option.label}
                isSelected={selectedRiskType === option.id}
                onChange={handleRiskTypeChange}
                name="riskType"
                enabled={option.enabled}
                badge={option.badge}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Dynamic Risk Type Content */}
      <div className="mt-6">
        <h3 className="font-semibold mb-4 text-lg">
          {selectedRiskType} Configuration
        </h3>
        <div className="border rounded-lg p-6 bg-white">
          <RiskTypeRenderer
            riskType={selectedRiskType}
            onMetricsChange={handleRiskMetricsChange}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 pt-4">
        <BackButton
          onClick={handleBack}
          label="Back"
        />
        <ContinueButton
          onClick={handleContinue}
          disabled={isContinueDisabled}
          label="Continue"
        />
      </div>
    </div>
  );
}