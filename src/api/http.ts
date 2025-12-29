import axios from "axios";

const getBaseURL = () => {
  // Di production, gunakan URL Railway langsung
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL;
  }
  // Di development, gunakan proxy
  return "/api/v1";
};

export const http = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});
