import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { type PathParams, ROUTES } from "@/shared/lib/paths";

import useGames from "./use-games";

function UserLastGamesPage() {
  const params = useParams<PathParams[typeof ROUTES.USER]>();

  const { userLastGames, games, loading } = useGames();

  useEffect(() => {
    if (params.userId) {
      userLastGames(params.userId);
    }
  }, [params.userId, userLastGames]);

  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance my-6">
          UserLastGamesPage, userId={params.userId}
        </h1>
      </div>

      {loading ? (
        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
          LOADING
        </pre>
      ) : (
        <pre className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold my-6">
          {JSON.stringify(games, null, 2)}
        </pre>
      )}
    </>
  );
}

export const Component = UserLastGamesPage;
