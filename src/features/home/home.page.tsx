import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

function HomePage() {
  // TODO: ProtectedRoute
  const navigate = useNavigate();
  const { session } = useAuthStore();

  useEffect(() => {
    if (!session?.sub) {
      navigate(ROUTES.LOGIN);
    }
  }, [session, navigate]);

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          HomePage
        </h1>
      </div>

      <ul className="ml-6 list-none [&>li]:mt-2 [&>li]:list-inside">
        <li className="before:content-['–'] before:mr-2">
          <Link
            to={ROUTES.ROOM_JOIN}
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
            onClick={() => {}}
          >
            приєднатись до кімнати
          </Link>
        </li>
        <li className="before:content-['–'] before:mr-2">
          <Link
            to={ROUTES.ROOM_CREATE}
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
            onClick={() => {}}
          >
            створити кімнату
          </Link>
        </li>
      </ul>
    </>
  );
}

export const Component = HomePage;
