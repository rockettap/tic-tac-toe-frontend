import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

type Session = {
  sub: string;
  exp: number;
  iat: number;
};

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  session: Session | null;
}

const isTokenExpired = (exp: number) => {
  return Date.now() >= exp * 1000;
};

const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token");
  const session = token ? jwtDecode<Session>(token) : null;

  return {
    token,
    session,
    login: (token) => {
      localStorage.setItem("token", token);
      const session = jwtDecode<Session>(token);
      set({ token, session });
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ token: null, session: null });
    },
    isTokenExpired,
  };
});

export default useAuthStore;
