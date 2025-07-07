import { useEffect } from "react";

import { href, useNavigate } from "react-router-dom";

import { api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

function RoomCreatePage() {
  // TODO: ProtectedRoute
  const navigate = useNavigate();
  const { session, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!session?.sub) {
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [session, navigate]);

  const handleCreateGame = async () => {
    const success = await refreshToken();

    if (!success || !session?.sub) {
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true,
      });
    }

    try {
      const response = await api.post(`/rooms`);

      if (response.status === 201) {
        navigate(href(ROUTES.ROOM, { roomId: response.data.id }));
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          створення кімнати
        </h1>
      </div>

      <Button
        className="self-start w-full sm:w-auto"
        onClick={handleCreateGame}
      >
        Створити гру
      </Button>
    </>
  );
}

export const Component = RoomCreatePage;
