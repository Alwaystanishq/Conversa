import axios from "axios";
import { backendURL } from "./config";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: `${backendURL}/api`,
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
