import { create } from "zustand";
import { storage } from "../utils/storage";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  followers: string[];
  following: string[];
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
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

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));

export default useAuthStore;
