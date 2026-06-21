import { create } from "zustand";
import { User } from "../types/user";
import { storage } from "../utils/storage";

type AuthState = {
  user: User | null;
  isLoading: boolean;

  setAuth: (token: string, user: User) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setAuth: async (token, user) => {
    await storage.setToken(token);
    set({ user, isLoading: false });
  },

  setUser: (user) => {
    set({ user, isLoading: false });
  },

  logout: async () => {
    await storage.removeToken();
    set({ user: null, isLoading: false });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },
}));

export default useAuthStore;
