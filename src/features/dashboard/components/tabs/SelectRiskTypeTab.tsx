import { Section, RiskTypeCard, ContinueButton, RiskTypeRenderer, BackButton } from "../common";
import { useRiskTypeSelection } from "./hooks/useRiskTypeSelection";
import { useOrderStore } from "@/stores/useOrderStore";
import { OrdersAPI } from "@/api/orders.api";
import { mapCreditRiskMetricsToPayload } from "@/api/mapper/risk";
import { useEffect, useState } from "react";


// type Props = {
//   onContinue: () => void;
//   onBack: () => void;
// };


export default function SelectRiskTypeTab() {
  const {
    orderId,
    page4,
    savePageData,
    nextStep,
    prevStep,
  } = useOrderStore();

  const {
    selectedRiskType,
    riskTypeOptions,
    handleRiskTypeChange,
    isRiskTypeEnabled,
    setSelectedRiskType,
  } = useRiskTypeSelection(
    page4?.risk_type ?? "Credit Risk"
  );

  useEffect(() => {
    if (page4?.risk_type !== selectedRiskType) {
      savePageData(4, {
        ...page4,
        risk_type: selectedRiskType,
      });
    }
  }, [selectedRiskType]);



  const [riskMetrics, setRiskMetrics] = useState<any[]>(
    page4?.metrics ?? []
  );

  useEffect(() => {
    if (riskMetrics.length > 0) {
      savePageData(4, {
        ...page4,
        metrics: riskMetrics,
      });
    }
  }, [riskMetrics]);


  const handleContinue = async () => {
    if (!orderId) return alert("Order not found");

    if (!isRiskTypeEnabled(selectedRiskType)) {
      alert("Selected risk type is not available yet");
      return;
    }

    const isValid = validateRiskTypeData();
    if (!isValid) {
      alert("Please fill all required fields");
      return;
    }

    const creditRiskPayload = mapCreditRiskMetricsToPayload(riskMetrics);

    try {
      await OrdersAPI.savePage4(orderId, {
        risk_type: selectedRiskType,
        ...creditRiskPayload,
      });

      savePageData(4, {
        risk_type: selectedRiskType,
        metrics: riskMetrics,
      });

      nextStep();
    } catch (e) {
      console.error(e);
      alert("Failed to save risk configuration");
    }
  };


  const handleBack = () => {
    prevStep();
  };


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
            metrics={riskMetrics}
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