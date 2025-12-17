import { http } from "@/api/http";

export const uploadInputData = async (
    orderId: number,
    data: {
        time_horizon: string;
        stress_testing_data: File;
        macro_historical_data: File;
    }
) => {
    const form = new FormData();
    form.append("time_horizon", data.time_horizon);
    form.append("stress_testing_data", data.stress_testing_data);
    form.append("macro_historical_data", data.macro_historical_data);

    return http.put(`/orders/${orderId}/config/page2`, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
