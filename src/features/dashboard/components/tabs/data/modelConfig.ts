import type { Model } from "../hooks/useModelSelection";

export const DEFAULT_MODELS: Model[] = [
    {
        id: "A",
        name: "Model A",
    },
    {
        id: "B",
        name: "Model B",
    },
    {
        id: "C",
        name: "Model C",
    },
    {
        id: "D",
        name: "Model D",
    },
];

export const MODEL_TYPES = {
    arima: "ARIMA",
    regression: "Regression",
    ml: "Machine Learning"
} as const;