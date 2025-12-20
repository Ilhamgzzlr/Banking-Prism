import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Page5Macro } from "@/types/page5Macro";
import type { StressTestParameters } from "@/types/page6";
import type { OrderResultResponse } from "@/types/result"


interface OrderState {
    orderId: number | null;
    currentStep: number;
    status: string;

    calculationStatus?: "NOT_STARTED" | "RUNNING" | "DONE";

    page1?: any;
    page2?: any;
    page3?: {
        scenario_option: "Regulatory Macroeconomic Scenario" | "Custom Scenario Input" | "macroeconomic";
        macro_levels?: any[];
        scenario_upload?: boolean;
        sheet_names?: string[];
    };

    page4?: {
        risk_type: "Credit Risk" | "Liquidity Risk" | "Market Risk";
        metrics?: any[];
    };

    page5?: Page5Macro;

    page6?: {
        parameters: StressTestParameters;
    };

    pageResult?: {
        rawResult?: OrderResultResponse;
    };

    setOrderId: (id: number) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;

    setCalculationStatus: (status: "NOT_STARTED" | "RUNNING" | "DONE") => void;
    savePageData: (page: number, data: any) => void;
    saveResult: (result: OrderResultResponse) => void;
    reset: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orderId: null,
            currentStep: 0,
            status: "Draft",

            calculationStatus: "NOT_STARTED",

            setCalculationStatus: (status) =>
                set({ calculationStatus: status }),

            setOrderId: (id) => set({ orderId: id }),
            setStep: (step) => set({ currentStep: step }),
            nextStep: () =>
                set((s) => ({ currentStep: s.currentStep + 1 })),
            prevStep: () =>
                set((s) => ({ currentStep: s.currentStep - 1 })),

            savePageData: (page, data) =>
                set((state) => ({
                    ...state,
                    [`page${page}`]: data,
                })),

            saveResult: (result: OrderResultResponse) =>
                set(() => ({
                    pageResult: { rawResult: result }
                })),

            reset: () =>
                set({
                    orderId: null,
                    currentStep: 0,
                    status: "Draft",
                    calculationStatus: "NOT_STARTED",
                    page1: undefined,
                    page2: undefined,
                    page3: undefined,
                    page4: undefined,
                    page5: undefined,
                    page6: undefined,
                    pageResult: undefined,
                }),
        }),
        {
            name: "stress-test-order", // localStorage key
        }
    )
);
