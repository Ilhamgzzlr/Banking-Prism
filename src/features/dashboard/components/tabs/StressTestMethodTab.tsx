import { useState } from 'react';
import { Section, MethodCard, ContinueButton, ScenarioTypeCard } from '../common';
import { METHOD_OPTIONS, ECONOMIC_SCENARIOS } from './data/stressTestConfig';
import { OrdersAPI } from "@/api/orders.api";
import { useOrderStore } from "@/stores/useOrderStore";

export type ScenarioType = "static" | "dynamic";
export type AnalysisMethod = "Scenario Analysis" | "Sensitivity Analysis" | "Comprehensive Run";

export default function StressTestMethodTab() {
  const { orderId, setOrderId, nextStep, savePageData, page1 } = useOrderStore();

  const [selectedScenario, setSelectedScenario] = useState(
    page1?.economic_scenario ?? null
  );

  const [selectedMethod, setSelectedMethod] = useState(
    page1?.analysis_method?.[0] ?? null
  );


  const handleScenarioChange = (value: ScenarioType) => {
    setSelectedScenario(value);
  };

  const handleMethodChange = (methodTitle: string) => {
    const methodValue = methodTitle.toLowerCase() as AnalysisMethod;
    setSelectedMethod(methodValue);
  };

  const handleContinue = async () => {
    if (!selectedMethod || !selectedScenario) return;

    const payload = {
      analysis_method: [selectedMethod], // backend expects array
      economic_scenario: selectedScenario,
    };

    // if (!orderId) {
      const order = await OrdersAPI.createOrder(payload);
      setOrderId(order.order_id);
    // }
    savePageData(1, payload);
    nextStep();
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