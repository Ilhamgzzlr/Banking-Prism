import { useState } from "react";
import { StressTestMethodTab, InputDataTab, InputScenarioTab, SelectRiskTypeTab, MacroSelectionTab, InputParameterTab, SelectModelTab, ResultTab } from "./tabs";
import { useOrderStore } from "@/stores/useOrderStore";

const steps = [
  "Stress Test Method",
  "Input Data",
  "Input Scenario",
  "Select Risk Type",
  "Macro Selection",
  "Input Parameter",
  "Select Model",
  "Result",
];

interface FileColumnsState {
  macroeconomic: string[];
}


export default function StressModelTabs() {
  // const [currentStep, setCurrentStep] = useState(0);
  const [fileColumns, setFileColumns] = useState<FileColumnsState>({
    macroeconomic: []
  });

  // const [orderId, setOrderId] = useState<number | null>(null);

  // const nextStep = () => {
  //   setCurrentStep((prev) => prev + 1);
  // };

  // const prevStep = () => {
  //   setCurrentStep((prev) => prev - 1);
  // }


  // const handleFileDataContinue = (columns: FileColumnsState) => {
  //   setFileColumns(columns);
  //   nextStep();
  // };

  const {
    currentStep,
    nextStep,
    prevStep,
    setStep,
  } = useOrderStore();

  return (
    <div className="w-full flex flex-col flex-1">
      {/* steps Header */}
      {/* <div className="flex gap-2 mb-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`px-4 py-2 rounded-md text-sm font-medium
              ${index === currentStep
                ? "bg-purple-600 text-white"
                : "text-gray-600"
              }`}
          >
            {step}
          </div>
        ))}
      </div> */}
      <div className="flex gap-2 mb-4">
        {steps.map((step, index) => (
          <div
            key={step}
            onClick={() => setStep(index)}
            className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer
              ${index === currentStep
                ? "bg-purple-600 text-white"
                : "text-gray-600"
              }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <StressTestMethodTab
        // onContinue={nextStep}
        // onCreated={(id) => setOrderId(id)}
        />
      )}

      {currentStep === 1 && (
        <InputDataTab
        // orderId={orderId}
        // onContinue={handleFileDataContinue}
        // onBack={prevStep}
        />
      )}


      {currentStep === 2 && (
        <InputScenarioTab
        // onContinue={nextStep}
        // onBack={prevStep}
        />
      )}

      {currentStep === 3 && (
        <SelectRiskTypeTab
          // onContinue={nextStep}
          // onBack={prevStep}
        />
      )}

      {currentStep === 4 && (
        <MacroSelectionTab onContinue={nextStep} onBack={prevStep} />
      )}

      {currentStep === 5 && (
        <InputParameterTab
          onContinue={nextStep}
          fileColumns={fileColumns}
          onBack={prevStep}
        />
      )}

      {currentStep === 6 && (
        <SelectModelTab onContinue={nextStep} onBack={prevStep} />
      )}

      {currentStep === 7 && (
        <ResultTab />
      )}

    </div >
  );
}
