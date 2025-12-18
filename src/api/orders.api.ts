// src/api/orders.api.ts
import { http } from "./http";
import type { Page5Macro } from "@/types/page5Macro";

export const OrdersAPI = {
    createOrder: (payload: {
        analysis_method: string[];
        economic_scenario: "dynamic" | "static";
    }) =>
        http.post("/orders/", payload).then(res => res.data),

    savePage2: (
        orderId: number,
        payload: {
            time_horizon: string;
            stressTestingFile: File;
            macroFile: File;
        }
    ) => {
        const formData = new FormData();
        formData.append("time_horizon", payload.time_horizon);
        formData.append("stress_testing_data", payload.stressTestingFile);
        formData.append("macro_historical_data", payload.macroFile);

        return http
            .put(`/orders/${orderId}/config/page2`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(res => res.data);
    },

    savePage3: (
        orderId: number,
        payload:
            | { scenario_option: "Regulatory Macroeconomic Scenario"; scenario_upload: File }
            | { scenario_option: "Custom Scenario Input"; scenario_upload: File }
            | { scenario_option: "macroeconomic"; levels: any[] }
    ) => {
        const formData = new FormData();
        formData.append("scenario_option", payload.scenario_option);

        if ("scenario_upload" in payload) {
            formData.append("scenario_upload", payload.scenario_upload);
        }

        if ("levels" in payload) {
            formData.append("levels", JSON.stringify(payload.levels));
        }

        return http
            .put(`/orders/${orderId}/config/page3`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(r => r.data);
    },

    savePage4: (
        orderId: number,
        payload: {
            risk_type: string;
            npl_gross_limits?: any;
            npl_net_limits?: any;
            car_limits?: any;
        }
    ) =>
        http
            .put(`/orders/${orderId}/config/page4`, payload)
            .then(res => res.data),

    savePage5: (
        orderId: number,
        payload: Page5Macro
    ) =>
        http
            .put(`/orders/${orderId}/config/page5`, payload)
            .then(res => res.data),


    savePage6: (orderId: number, payload: any) =>
        http.put(`/orders/${orderId}/config/page6`, payload).then(res => res.data),

    runCalculation: (orderId: number) =>
        http.post(`/orders/${orderId}/run`).then(res => res.data),

    getResult: (orderId: number) =>
        http.get(`/orders/${orderId}/result`).then(res => res.data),
};
