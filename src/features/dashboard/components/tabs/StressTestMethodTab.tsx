import { useState } from 'react';
import { Section, MethodCard, ContinueButton, ScenarioTypeCard } from '../common';
import { METHOD_OPTIONS, ECONOMIC_SCENARIOS } from './data/stressTestConfig';
import { createOrder } from "@/api/orders";

export type ScenarioType = "static" | "dynamic";
export type AnalysisMethod = "Scenario Analysis" | "Sensitivity Analysis" | "Comprehensive Run";

type Props = {
  onContinue: () => void;
  onCreated: (orderId: number) => void;
};


export default function StressTestMethodTab({ onContinue, onCreated }: Props) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<AnalysisMethod | null>(null);

  const handleScenarioChange = (value: ScenarioType) => {
    setSelectedScenario(value);
  };

  const handleMethodChange = (methodTitle: string) => {
    // Konversi title ke value yang sesuai
    // Anda mungkin perlu menyesuaikan logika ini berdasarkan data METHOD_OPTIONS
    const methodValue = methodTitle.toLowerCase() as AnalysisMethod;
    setSelectedMethod(methodValue);
  };

  const handleContinue = async () => {
    if (!selectedMethod || !selectedScenario) return;

    // const payload = {
    //   analysis_method: [selectedMethod], // backend expects array
    //   economic_scenario: selectedScenario,
    // };

    // const res = await createOrder(payload);

    // onCreated(res.order_id);
    onContinue();
  };
  const isAllInputFilled = selectedMethod !== null && selectedScenario !== null;

  return (
    <div className="space-y-3">
      {/* Select Analysis Method */}
      <Section title="Select Analysis Method" required>
        <div className="space-y-2">
          {METHOD_OPTIONS.map((option) => (
            <MethodCard
              key={option.title}
              title={option.title}
              desc={option.desc}
              icon={option.icon}
              name="analysisMethod"
              isSelected={selectedMethod === option.value}
              onChange={() => handleMethodChange(option.value || option.title)}
            />
          ))}
        </div>
      </Section>

      {/* Economic Scenario */}
      <Section title="Economic Scenario" required>
        <div className="flex gap-4 mb-10">
          {ECONOMIC_SCENARIOS.map((scenario) => (
            <ScenarioTypeCard
              key={scenario.value}
              id={scenario.value}
              label={scenario.label}
              isSelected={selectedScenario === scenario.value}
              onChange={() => handleScenarioChange(scenario.value as ScenarioType)}
              name="economicScenario"
            />
          ))}
        </div>
      </Section>

      {/* Action */}
      <div className="flex justify-end">
        <ContinueButton
          onClick={handleContinue}
          disabled={!isAllInputFilled}
        />
      </div>
    </div>
  );
}