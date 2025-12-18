// src/api/orders.api.ts
import { http } from "./http";
import type { Page5Macro } from "@/types/page5Macro";
import type { Page6Params } from "@/types/page6";

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


    // src/api/orders.api.ts
    savePage6: async (orderId: number, params: Page6Params) => {
        // Buat payload tanpa file
        const payload: any = {
            init_params: params.init_params,
            ead_config: params.ead_config,
            npl_values: params.npl_values,
            rwa_config: params.rwa_config,
            lgd_config: {
                lgd_mode: params.lgd_config.lgd_mode,
                rr_value: params.lgd_config.rr_value,
                related_macro_data: params.lgd_config.related_macro_data,
                modelling_approach: params.lgd_config.modelling_approach
            }
        };

        // Jika ada file, gunakan FormData
        if (params.lgd_config.historical_data_file instanceof File) {
            const formData = new FormData();

            // Tambahkan JSON payload sebagai field 'data'
            formData.append('data', JSON.stringify(payload));

            // Tambahkan file
            formData.append('historical_data_file', params.lgd_config.historical_data_file);

            return http.put(`/orders/${orderId}/config/page6`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            // Tidak ada file, kirim sebagai JSON biasa
            return http.put(`/orders/${orderId}/config/page6`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
        }
    },


    runCalculation: (orderId: number) =>
        http.post(`/orders/${orderId}/run`).then(res => res.data),

    getResult: (orderId: number) =>
        http.get(`/orders/${orderId}/result`),
};
