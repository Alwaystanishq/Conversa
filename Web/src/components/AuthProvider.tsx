import { useEffect } from "react";
import api from "../api/client";
import useAuthStore from "../store/authStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
}
