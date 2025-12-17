import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ScenarioType = "static" | "dynamic";
export type AnalysisMethod = "scenario_analysis" | "sensitivity_analysis" | "comprehensive_run";

interface StressTestState {
    // FLOW
    currentStep: number;
    orderId: number | null;

    // STEP 1
    analysisMethod: AnalysisMethod | null;
    economicScenario: ScenarioType | null;

    // STEP 2
    timeHorizon: string | null;
    stressTestingFile: File | null;
    macroHistoricalFile: File | null;

    // STEP 5
    selectedMacroFactors: string[];

    // ACTIONS
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;

    setOrderId: (id: number) => void;

    setStep1: (method: AnalysisMethod, scenario: ScenarioType) => void;
    setStep2Files: (
        time: string,
        stFile: File,
        macroFile: File
    ) => void;

    reset: () => void;
}

export const useStressTestStore = create<StressTestState>()(
    persist(
        (set) => ({
            currentStep: 0,
            orderId: null,

            analysisMethod: null,
            economicScenario: null,

            timeHorizon: null,
            stressTestingFile: null,
            macroHistoricalFile: null,

            selectedMacroFactors: [],

            setStep: (step) => set({ currentStep: step }),
            nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
            prevStep: () => set((s) => ({ currentStep: s.currentStep - 1 })),

            setOrderId: (id) => set({ orderId: id }),

            setStep1: (method, scenario) =>
                set({
                    analysisMethod: method,
                    economicScenario: scenario,
                }),

            setStep2Files: (time, stFile, macroFile) =>
                set({
                    timeHorizon: time,
                    stressTestingFile: stFile,
                    macroHistoricalFile: macroFile,
                }),

            reset: () => set({
                currentStep: 0,
                orderId: null,
                analysisMethod: null,
                economicScenario: null,
                timeHorizon: null,
                stressTestingFile: null,
                macroHistoricalFile: null,
                selectedMacroFactors: [],
            }),
        }),
        {
            name: "stress-test-store",
            partialize: (state) => ({
                currentStep: state.currentStep,
                orderId: state.orderId,
                analysisMethod: state.analysisMethod,
                economicScenario: state.economicScenario,
                timeHorizon: state.timeHorizon,
                selectedMacroFactors: state.selectedMacroFactors,
                // ❗ File tidak bisa di-persist
            }),
        }
    )
);
