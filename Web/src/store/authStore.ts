import { create } from "zustand";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  setAuth: (token: string, user: User) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("conversa_token"),
  isLoading: true,

  setAuth: (token, user) => {
    localStorage.setItem("conversa_token", token);

    set({
      token,
      user,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  logout: () => {
    localStorage.removeItem("conversa_token");

    set({
      token: null,
      user: null,
    });
  },
}));

export default useAuthStore;
