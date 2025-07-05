import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import QRCode from "qrcode";
import { io } from "socket.io-client";
import { toast } from "sonner";

import { API_BASE_URL, api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { type PathParams, ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

import { Board } from "@/features/board";

function RoomPage() {
  const params = useParams<PathParams[typeof ROUTES.ROOM]>();
  const [disconnected, setDisconnected] = useState(false);
  const [gameIsActive, setGameIsActive] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [boardState, setBoardState] = useState<(null | "X" | "O")[]>(
    Array(9).fill(null),
  );
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const { session, refreshToken } = useAuthStore();

  const [isReady, setIsReady] = useState<boolean>(false);

  const refreshAndSetReady = async () => {
    const success = await refreshToken();
    if (success) {
      setIsReady(true);
    }
  };

  useEffect(() => {
    refreshAndSetReady();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const socket = io(API_BASE_URL, {
      query: { token: useAuthStore.getState().token, roomId: params.roomId },
    });

    socket.on("connect", () => {
      console.log("connect");
      setDisconnected(false);
    });

    socket.io.on("reconnect", () => {
      console.warn("RECONNECT...");
      refreshAndSetReady();
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
      setDisconnected(true);
      setUsers([]);
    });

    socket.on("room:joined", (userId) => {
      console.log("room:joined", userId);
      toast.info(`${userId} joined the room.`);
      setUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
    });

    socket.on("room:left", (userId) => {
      console.log("room:left", userId);
      toast.info(`${userId} left the room.`);
      setUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.on("game:moveMade", (game) => {
      console.log("game:moveMade", game);
      if (game) {
        setBoardState(game.board.cells);
      }
    });

    socket.on("room:gameStarted", (room) => {
      console.log("room:gameStarted", room);
      setUsers(room._userIds);
      if (room._game) {
        setBoardState(room._game.board.cells);
        setGameIsActive(true);
      }
    });

    socket.on("room:gameFinished", (game) => {
      console.log("room:gameFinished", game);
      if (!game) return;

      if (game.winner?.userId) {
        toast.info(`${game.winner.userId} won!`);
      } else if (game.winner === "Draw") {
        toast.info("It's a draw!");
      } else {
        toast.info("The game was interrupted.");
      }

      setBoardState(Array(9).fill(null));
      setGameIsActive(false);
    });

    socket.on("room:error", (message) => {
      console.log("room:error", message);
      toast.info(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [isReady, params.roomId]);

  const makeMove = async (row: number, column: number) => {
    const success = await refreshToken();

    if (!success || !session?.sub) {
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true,
      });
    }

    try {
      const response = await api.post(`/rooms/${params.roomId}/move`, {
        row,
        column,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  };

  const handleStartGame = async () => {
    const success = await refreshToken();

    if (!success || !session?.sub) {
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true,
      });
    }

    try {
      const response = await api.post(`/rooms/${params.roomId}/start`);
      return response.status === 201;
    } catch {
      return false;
    }
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          RoomPage, roomId={params.roomId}
        </h1>
      </div>

      {url && <img src={url} alt="QR Code" />}

      <div className="my-6">
        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mb-6">
          users={JSON.stringify(users)}
        </pre>

        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mb-6">
          gameIsActive={JSON.stringify(gameIsActive)}
        </pre>

        <Button
          disabled={gameIsActive || users.length < 2}
          className="self-start w-full sm:w-auto"
          onClick={handleStartGame}
        >
          Розпочати гру
        </Button>

        {disconnected && (
          <div className="text-red-500 font-semibold mt-6">
            You have been disconnected from the server!
          </div>
        )}
      </div>

      <Board
        state={boardState}
        notAllowed={!gameIsActive}
        onCellClick={makeMove}
      />
    </>
  );
}

export const Component = RoomPage;
