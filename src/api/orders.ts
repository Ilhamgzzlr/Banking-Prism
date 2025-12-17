import { http } from "./http";

export interface CreateOrderPayload {
  analysis_method: string[];
  economic_scenario: "static" | "dynamic";
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await http.post("/orders/", payload);
  return res.data; // { order_id, status }
};


export const uploadInputData = async (
  orderId: number,
  payload: {
    time_horizon: string;
    stressTestingFile: File;
    macroFile: File;
  }
) => {
  const form = new FormData();
  form.append("time_horizon", payload.time_horizon);
  form.append("stress_testing_data", payload.stressTestingFile);
  form.append("macro_historical_data", payload.macroFile);

  const res = await http.put(
    `/orders/${orderId}/config/page2`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};