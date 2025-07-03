import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { api } from "@/shared/api/client";
import { Button } from "@/shared/components/ui/button";
import { Loader } from "@/shared/components/ui/loader";
import type { PathParams, ROUTES } from "@/shared/lib/paths";

import { Board } from "@/features/board";
import { Component as NotFoundPage } from "@/features/not-found/not-found.page";

function GamePage() {
  const params = useParams<PathParams[typeof ROUTES.GAME]>();
  const [boardState, setBoardState] = useState<(null | "X" | "O")[][]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/games/${params.gameId}`);
        if (response.data) {
          const q: (null | "X" | "O")[][] = response.data.board.history;
          q.push([null, null, null, null, null, null, null, null, null]);
          setBoardState(q);
          setCurrentMove(q.length - 1);
          setLoading(false);
        }
      } catch {
        setBoardState([]);
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
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          GamePage
        </h1>
      </div>

      {<Board state={boardState[currentMove]} notAllowed={true} />}

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
