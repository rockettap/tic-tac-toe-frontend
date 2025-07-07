import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import QRCode from "qrcode";
import { io } from "socket.io-client";
import { toast } from "sonner";

import { API_BASE_URL, api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { type PathParams, ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

import { Board, type Mark, type MarkOrNull } from "@/features/board";

type Player = {
  userId: string;
  value: MarkOrNull;
};

function RoomPage() {
  const params = useParams<PathParams[typeof ROUTES.ROOM]>();
  const [disconnected, setDisconnected] = useState(false);
  const [gameIsActive, setGameIsActive] = useState(false);
  const [users, setUsers] = useState<Player[]>([]);
  const [boardState, setBoardState] = useState<MarkOrNull[]>(
    Array(9).fill(null),
  );
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const { session, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!session?.sub) {
      navigate(ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true,
      });
    }

    QRCode.toDataURL(window.location.href, {
      errorCorrectionLevel: "L",
    }).then(setUrl);

    const socket = io(API_BASE_URL, {
      query: {
        roomId: params.roomId,
      },
      auth: async (cb) => {
        await refreshToken();
        cb({ token: useAuthStore.getState().token });
      },
    });

    socket.on("connect", () => {
      console.log("connect");
      setDisconnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
      setDisconnected(true);
      setUsers([]);
    });

    socket.on("room:joined", (userId: string) => {
      console.log("room:joined", userId);
      toast.info(`${userId} приєднався до кімнати.`);
      setUsers((prev) =>
        prev.some((player) => player.userId === userId)
          ? prev
          : [...prev, { userId, value: null }],
      );
    });

    socket.on("room:left", (userId: string) => {
      console.log("room:left", userId);
      toast.info(`${userId} покинув кімнату.`);
      setUsers((prev) => prev.filter((player) => player.userId !== userId));
    });

    socket.on("game:moveMade", (game) => {
      console.log("game:moveMade", game);
      if (game) {
        setBoardState(game.board.cells);
      }
    });

    socket.on("room:gameStarted", (room) => {
      console.log("room:gameStarted", room);

      if (room._game) {
        const playerMarksMap = new Map(
          room._game.players.map((player: { userId: string; mark: Mark }) => [
            player.userId,
            player.mark,
          ]),
        );

        const usersWithMarks = room._userIds.map((userId: string) => ({
          userId,
          value: playerMarksMap.get(userId) ?? null,
        }));

        setBoardState(room._game.board.cells);
        setGameIsActive(true);
        setUsers(usersWithMarks);
      } else {
        const usersWithoutMarks = room._userIds.map((userId: string) => ({
          userId,
          value: null,
        }));

        setUsers(usersWithoutMarks);
      }
    });

    socket.on("room:gameFinished", (game) => {
      console.log("room:gameFinished", game);

      if (game.winner?.userId) {
        toast.info(`${game.winner.userId} виграв!`);
      } else if (game.winner === "Draw") {
        toast.info("Нічия!");
      } else {
        toast.info("Гру було перервано.");
      }

      setBoardState(Array(9).fill(null));
      setGameIsActive(false);
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          value: null,
        })),
      );
    });

    socket.on("room:error", (message) => {
      console.log("room:error", message);
      toast.info(message);
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          кімната {params.roomId}
        </h1>
      </div>

      {url && <img src={url} alt="QR Code" />}

      <div className="my-6">
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">users:</p>
          <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto overflow-y-hidden">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>

        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">gameIsActive:</p>
          <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto overflow-y-hidden">
            {JSON.stringify(gameIsActive)}
          </pre>
        </div>

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
