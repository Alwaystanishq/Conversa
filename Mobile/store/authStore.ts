import { create } from "zustand";
import { storage } from "../utils/storage";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  setAuth: async (token: string, user: any) => {
    await storage.setToken(token);
    set({ user, isLoading: false });
  },

  setUser: (user: any) => {
    set({ user, isLoading: false });
  },

  logout: async () => {
    await storage.removeToken();
    set({ user: null, isLoading: false });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));

export default useAuthStore;