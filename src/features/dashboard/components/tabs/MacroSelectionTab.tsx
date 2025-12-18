import { Section, MacroFactorItem, PercentileSection, ContinueButton, BackButton } from "../common";
import { useMacroFactors } from "./hooks/useMacroFactors";
import { useOrderStore } from "@/stores/useOrderStore";
import { buildMacroFactors } from "@/features/dashboard/utils/buildMacroFactors";
import { OrdersAPI } from "@/api/orders.api";
import { useEffect } from "react";

export default function MacroSelectionTab() {
  const {
    orderId,
    page2,
    page3,
    page5,
    savePageData,
    nextStep,
    prevStep,
  } = useOrderStore();


  const stressColumns = page2?.stress_columns || [];
  const macroColumns = page2?.macro_columns || [];

  const sheetNames = page3?.sheet_names || [];

  const hasCustomOrRegulatoryScenario =
    page3?.scenario_option === "Custom Scenario Input" ||
    page3?.scenario_option === "Regulatory Macroeconomic Scenario";

  const factorsFromFiles = buildMacroFactors(
    stressColumns,
    macroColumns,
    page5?.macro_factors
  );

  const {
    factors,
    percentiles,
    handleFactorToggle,
    handleSubFactorToggle,
    handlePercentileChange,
    showPercentileSection,
    validatePercentiles,
  } = useMacroFactors(
    factorsFromFiles,
    page5?.no_macro_percentile
  );

  useEffect(() => {
    savePageData(5, {
      macro_factors: factors,
      percentiles,
    });
  }, [factors, percentiles]);

  const hasNoMacro = factors.some(f => f.selected === false);

  const buildPage5Payload = () => {
    return {
      macro_factors: factors.map(f => ({
        column_name: f.id,
        is_macro_factor: f.selected,
        related_historical_macros: f.selected
          ? f.selectedSubFactors ?? []
          : null,
      })),
      no_macro_percentile: hasNoMacro
        ? Object.values(percentiles).filter(Boolean)
        : null,
    };
  };


  const selectedCount = factors.filter(f => f.selected).length;
  const selectedSubFactorCount = factors.reduce((total, factor) =>
    total + (factor.selectedSubFactors?.length || 0), 0
  );

  const handleContinue = async () => {
    if (!orderId) return alert("Order not found");

    if (showPercentileSection && !validatePercentiles()) {
      alert("Please enter valid percentiles (between 0.1 and 99.9)");
      return;
    }

    const selectedFactors = factors.filter(f => f.selected);
    if (selectedFactors.length === 0) {
      alert("Please select at least one macro factor");
      return;
    }

    try {
      const payload = buildPage5Payload();

      await OrdersAPI.savePage5(orderId, payload);

      savePageData(5, payload);
      nextStep();
    } catch (e) {
      console.error(e);
      alert("Failed to save macro configuration");
    }
  };


  const handleBack = () => {
    prevStep();
  };


  const isContinueEnabled = factors.some(f => f.selected) &&
    (!showPercentileSection || validatePercentiles());

  return (
    <div className="space-y-6">
      {/* Title with selection summary */}
      <Section
        title="Choose Macroeconomics Factor"
        required
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Select macro factors to include in your stress testing analysis
          </p>
          <div className="flex gap-3">
            <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {selectedCount} factor{selectedCount !== 1 ? 's' : ''} selected
            </span>
            {selectedSubFactorCount > 0 && (
              <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                {selectedSubFactorCount} Macrofactor{selectedSubFactorCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </Section>

      {/* Macro Factors List */}
      <div className="space-y-3">
        {factors.map((factor) => (
          <MacroFactorItem
            key={factor.id}
            factor={factor}
            onToggle={handleFactorToggle}
            onSubFactorToggle={handleSubFactorToggle}
          />
        ))}
      </div>

      {/* Percentile Section */}
      <PercentileSection
        percentiles={percentiles}
        onPercentileChange={handlePercentileChange}
        show={showPercentileSection}
        levelNames={hasCustomOrRegulatoryScenario ? sheetNames : undefined}
      />

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 pt-4">
        <BackButton
          onClick={handleBack}
          label="Back"
        />
        <ContinueButton
          onClick={handleContinue}
          disabled={!isContinueEnabled}
          label="Continue"
        />
      </div>
    </div>
  );
}