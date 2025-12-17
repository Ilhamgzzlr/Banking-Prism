import { Section, MacroFactorItem, PercentileSection, ContinueButton, BackButton } from "../common";
import { useMacroFactors } from "./hooks/useMacroFactors";
import { DEFAULT_MACRO_FACTORS } from "./data/macroFactorConfig";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};


export default function MacroSelectionTab({ onContinue, onBack }: Props) {
  const {
    factors,
    percentiles,
    handleFactorToggle,
    handleSubFactorToggle,
    handlePercentileChange,
    showPercentileSection,
    validatePercentiles
  } = useMacroFactors(DEFAULT_MACRO_FACTORS);

  const selectedCount = factors.filter(f => f.selected).length;
  const selectedSubFactorCount = factors.reduce((total, factor) => 
    total + (factor.selectedSubFactors?.length || 0), 0
  );

  const handleContinue = () => {
    // Validate percentiles if section is shown
    if (showPercentileSection && !validatePercentiles()) {
      alert("Please enter valid percentiles (between 0.1 and 99.9)");
      return;
    }

    const selectedFactors = factors.filter(f => f.selected);
    if (selectedFactors.length === 0) {
      alert("Please select at least one macro factor");
      return;
    }

    onContinue();
  };

  const handleBack = () => {
    onBack();
  }

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
                {selectedSubFactorCount} sub-factor{selectedSubFactorCount !== 1 ? 's' : ''}
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
        level1={percentiles.level1}
        level2={percentiles.level2}
        onLevel1Change={(value) => handlePercentileChange('level1', value)}
        onLevel2Change={(value) => handlePercentileChange('level2', value)}
        show={showPercentileSection}
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