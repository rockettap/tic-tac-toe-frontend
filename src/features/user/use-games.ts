import { useCallback, useState } from "react";

import { api } from "@/shared/api/client";

import type { Mark, MarkOrNull } from "@/features/board";

export type Player = {
  userId: string;
  mark: Mark;
};

interface Board {
  cells: MarkOrNull[];
  history: MarkOrNull[][];
  currentTurn: Mark;
}

interface Game {
  id: string;
  players: Player[];
  board: Board;
  status: "IN_PROGRESS" | "FINISHED" | "INTERRUPTED";
  winner: Mark | "Draw" | null;
  createdAt: Date;
  updatedAt: Date;
}

const useGames = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[] | undefined>([]);

  const userLastGames = useCallback(async (userId: string) => {
    setLoading(true);

    try {
      const response = await api.get("/games", {
        params: {
          userId,
        },
      });

      if (response.status === 200) {
        setGames(response.data);
        setLoading(false);
        return true;
      } else {
        setGames([]);
        setLoading(false);
        return false;
      }
    } catch {
      setGames(undefined);
      setLoading(false);
      return false;
    }
  }, []);

  return { userLastGames, games, loading };
};

export default useGames;
