import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers.Authorization !== false) {
    return config;
  }
  return config;
});

export default axiosInstance;
