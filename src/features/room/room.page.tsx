import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

import { API_BASE_URL, api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { type PathParams, ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

import { Board } from "@/features/board";

function RoomPage() {
  const params = useParams<PathParams[typeof ROUTES.ROOM]>();
  const socketRef = useRef<Socket | null>(null);
  const [disconnected, setDisconnected] = useState<boolean>(false);
  const [gameIsActive, setGameIsActive] = useState<boolean>(false);
  const [users, setUsers] = useState<string /* TODO: userId */[]>([]);
  const [boardState, setBoardState] = useState<("X" | "O" | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

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

    socket.on("room:joined", (userId) => {
      console.log("room:joined, userId:", userId);

      toast.info(`${userId} joined the room.`);
      setUsers((prevUsers) =>
        prevUsers.includes(userId) ? prevUsers : [...prevUsers, userId],
      );
    });

    socket.on("room:left", (userId) => {
      console.log("room:left, userId:", userId);

      toast.info(`${userId} left the room.`);
      setUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
    });

    socket.on("game:moveMade", (game) => {
      console.log("game:moveMade, game:", game);

      if (game) {
        setBoardState(game.board.cells);
      }
    });

    socket.on("room:gameStarted", (room) => {
      console.log("room:gameStarted, room:", room);

      setUsers(room._userIds);

      if (room._game) {
        setBoardState(room._game.board.cells);
        setGameIsActive(true);
      }
    });

    socket.on("room:gameFinished", (game) => {
      console.log("room:gameFinished, game:", game);

      if (game) {
        if (game.winner) toast.info(`${game.winner.userId} won!`);
        setBoardState([null, null, null, null, null, null, null, null, null]);
        setGameIsActive(false);
      }
    });

    socket.on("room:error", (message) => {
      console.log("room:error:", message);

      toast.info(message);
    });

    socket.on("connect", () => {
      console.log("connect");

      setDisconnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnect, reason:", reason);

      setDisconnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [params.roomId, navigate, session, token]);

  // TODO: bring out to the "use" model
  const makeMove = async (row: number, column: number) => {
    try {
      const response = await api.post(`/rooms/${params.roomId}/move`, {
        row,
        column,
      });

      if (response.data) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const handleStartGame = async () => {
    try {
      const response = await api.post(`/rooms/${params.roomId}/start`);

      if (response.status === 201) {
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
          RoomPage, roomId={params.roomId}
        </h1>
      </div>

      <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
        gameIsActive={JSON.stringify(gameIsActive)}
      </pre>

      <Button
        disabled={gameIsActive}
        className="self-start w-full sm:w-auto"
        onClick={handleStartGame}
      >
        Розпочати гру
      </Button>

      <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
        users={JSON.stringify(users)}
      </pre>

      {disconnected ? (
        <div className="text-red-500 font-semibold my-6">
          You have been disconnected from the server!
        </div>
      ) : (
        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
          TODO
        </pre>
      )}

      <Board state={boardState} onCellClick={makeMove} />
    </>
  );
}

export const Component = RoomPage;
