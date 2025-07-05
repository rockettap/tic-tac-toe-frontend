import { useState } from "react";

import { api } from "@/shared/api/client";
import useAuthStore from "@/shared/use-auth-store";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuthStore();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      if (response.data && response.data.access_token) {
        login(response.data.access_token);
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch {
      setLoading(false);
      return false;
    }
  };

  return { loginUser, loading };
};

export default useLogin;
