import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Socket, io } from "socket.io-client";

import { API_BASE_URL } from "@/shared/api/client";
import { type PathParams, ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

import { Board } from "@/features/board";

function RoomPage() {
  const params = useParams<PathParams[typeof ROUTES.ROOM]>();
  const socketRef = useRef<Socket | null>(null);
  const [disconnected, setDisconnected] = useState<boolean>(false);

  // TODO: ProtectedRoute
  const navigate = useNavigate();
  const { session, token } = useAuthStore();

  useEffect(() => {
    if (!session?.sub) {
      navigate(ROUTES.LOGIN);
    }

    if (!params.roomId) {
      navigate(ROUTES.HOME);
    }

    const socket = io(API_BASE_URL, {
      query: { token, roomId: params.roomId },
    });
    socketRef.current = socket;

    socket.on("disconnect", () => {
      setDisconnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [params.roomId, navigate, session, token]);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance my-6">
        RoomPage
      </h1>

      {disconnected ? (
        <div className="text-red-500 font-semibold my-6">
          You have been disconnected from the server.
        </div>
      ) : (
        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
          TODO
        </pre>
      )}

      <Board />
    </>
  );
}

export const Component = RoomPage;
