import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/ui/loader";
import type { PathParams, ROUTES } from "@/shared/lib/paths";

import { Board, type MarkOrNull } from "@/features/board";
import { Component as NotFoundPage } from "@/features/not-found/not-found.page";

import type { Player } from "../user/use-games";

function GamePage() {
  const params = useParams<PathParams[typeof ROUTES.GAME]>();
  const [boardState, setBoardState] = useState<MarkOrNull[][]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [winner, setWinner] = useState<Player | "Draw" | null | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/games/${params.gameId}`);
        if (response.data) {
          const q: MarkOrNull[][] = response.data.board.history;
          q.push([null, null, null, null, null, null, null, null, null]);
          setBoardState(q);
          setCurrentMove(q.length - 1);
          setWinner(response.data.winner);
          setLoading(false);
        }
      } catch {
        setBoardState([]);
        setWinner(undefined);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [params.gameId]);

  if (loading) {
    return <Loader />;
  }

  if (boardState.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <>
      {<Board state={boardState[currentMove]} notAllowed={true} />}

      {winner !== undefined && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">winner:</p>
          <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto overflow-y-hidden">
            {typeof winner === "object" && winner !== null ? (
              <>{winner.userId}</>
            ) : (
              <>{JSON.stringify(winner)}</>
            )}
          </pre>
        </div>
      )}

      <div className="flex gap-4 my-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={() =>
            setCurrentMove((prev) =>
              boardState ? Math.min(prev + 1, boardState.length - 1) : prev,
            )
          }
          disabled={!boardState || currentMove === boardState.length - 1}
          className="cursor-pointer"
        >
          <IconChevronLeft />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={() => setCurrentMove((prev) => Math.max(prev - 1, 0))}
          disabled={currentMove === 0}
          className="cursor-pointer"
        >
          <IconChevronRight />
        </Button>
      </div>
    </>
  );
}

export const Component = GamePage;
