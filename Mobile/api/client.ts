import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;