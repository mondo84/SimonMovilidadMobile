import { useAuthStore } from "../store/auth-store";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
  };
};
