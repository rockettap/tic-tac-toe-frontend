import { Link, href } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Loader } from "@/shared/components/ui/loader";
import { type PathParams, ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

import { Component as NotFoundPage } from "@/features/not-found/not-found.page";

import useUser from "./use-user";

function UserPage() {
  const { logout, session } = useAuthStore();

  const params = useParams<PathParams[typeof ROUTES.USER]>();

  const { user, loading } = useUser(params.userId);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          користувач {params.userId}
        </h1>
      </div>

      <ul className="ml-6 list-none [&>li]:mt-2 [&>li]:list-inside">
        <li className="before:content-['–'] before:mr-2">
          <Link
            to={href(ROUTES.USER_STATS, { userId: params.userId })}
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
          >
            загальна статистика
          </Link>
        </li>
        <li className="before:content-['–'] before:mr-2">
          <Link
            to={href(ROUTES.USER_LAST_GAMES, {
              userId: params.userId,
            })}
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
          >
            останні 10 матчів
          </Link>
        </li>
        {session?.sub === params.userId && (
          <li className="before:content-['–'] before:mr-2">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
              onClick={logout}
            >
              вийти з акаунту
            </a>
          </li>
        )}
      </ul>
    </>
  );
}

export const Component = UserPage;
