import type { Model } from "../hooks/useModelSelection";

export const DEFAULT_MODELS: Model[] = [
    {
        id: "arima_1_1_0",
        name: "ARIMA (1,1,0)",
    },
    {
        id: "arima_1_0_1",
        name: "ARIMA (1,0,1)",
    },
    {
        id: "arima_0_0_1",
        name: "ARIMA (0,0,1)",
    },
];

export const MODEL_TYPES = {
    arima: "ARIMA",
    regression: "Regression",
    ml: "Machine Learning"
} as const;