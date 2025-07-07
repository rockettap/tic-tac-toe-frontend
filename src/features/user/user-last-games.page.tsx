import { useEffect } from "react";

import { href, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Loader } from "@/shared/components/ui/loader";
import { type PathParams, ROUTES } from "@/shared/lib/paths";

import { Component as NotFoundPage } from "@/features/not-found/not-found.page";

import useGames from "./use-games";

function UserLastGamesPage() {
  const params = useParams<PathParams[typeof ROUTES.USER]>();

  const { userLastGames, games, loading } = useGames();

  useEffect(() => {
    if (params.userId) {
      userLastGames(params.userId);
    }
  }, [params.userId, userLastGames]);

  if (loading) {
    return <Loader />;
  }

  if (!games) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          останні 10 матчів користувача {params.userId}
        </h1>
      </div>

      <ul className="ml-6 list-none [&>li]:mt-2 [&>li]:list-inside">
        {games.map((item) => (
          <li key={item.id} className="before:content-['–'] before:mr-2">
            <Link
              to={href(ROUTES.GAME, { gameId: item.id })}
              className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
            >
              {item.id}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const Component = UserLastGamesPage;
