import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

import { api } from "./api/client";

type Session = {
  sub: string;
  exp: number;
  iat: number;
};

interface AuthState {
  token: string | null;
  session: Session | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const isTokenExpired = (exp: number) => {
  return Date.now() >= exp * 1000;
};

const useAuthStore = create<AuthState>((set, get) => {
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
    refreshToken: async () => {
      const { login, logout } = get();

      if (!token || !session) return false;

      if (!isTokenExpired(session.exp)) return true;

      console.warn("refreshToken");
      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );
        login(res.data.access_token);
        return true;
      } catch {
        localStorage.removeItem("token");
        logout();
        return false;
      }
    },
  };
});

export default useAuthStore;
