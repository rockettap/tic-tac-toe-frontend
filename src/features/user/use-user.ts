import { useEffect, useState } from "react";

import { api } from "@/shared/api/client";

interface User {
  id: string;
}

const useUser = (userId: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/users/${userId}`);
        if (response.data) {
          setUser(response.data);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch {
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading };
};

export default useUser;
