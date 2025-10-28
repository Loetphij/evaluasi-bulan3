import { useAuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const { isAuthenticated, login, logout } = useAuthContext();
  return { isAuthenticated, login, logout };
};
