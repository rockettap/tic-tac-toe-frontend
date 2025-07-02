import { useCallback, useState } from "react";

import { api } from "@/shared/api/client";

interface Player {
  userId: string;
  mark: "X" | "O";
}

interface Board {
  cells: ("X" | "O" | null)[];
  history: ("X" | "O" | null)[][];
  currentTurn: "X" | "O";
}

interface Game {
  id: string;
  players: Player[];
  board: Board;
  status: "IN_PROGRESS" | "FINISHED" | "INTERRUPTED";
  winner: "X" | "O" | "Draw" | null;
  createdAt: Date;
  updatedAt: Date;
}

const useGames = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);

  const userLastGames = useCallback(async (userId: string) => {
    setLoading(true);

    try {
      const response = await api.get("/games", {
        params: {
          userId,
        },
      });

      if (response.data) {
        setGames(response.data);
        setLoading(false);
        return response.data;
      } else {
        setGames([]);
        setLoading(false);
        return null;
      }
    } catch {
      setGames([]);
      setLoading(false);
      return null;
    }
  }, []);

  return { userLastGames, games, loading };
};

export default useGames;
