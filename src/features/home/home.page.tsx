import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance my-6">
        HomePage
      </h1>
      <ul className="ml-6 list-none [&>li]:mt-2 [&>li]:list-inside">
        <li className="before:content-['–'] before:mr-2">
          <a
            href="#"
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
            onClick={() => {}}
          >
            приєднатись до кімнати
          </a>
        </li>
        <li className="before:content-['–'] before:mr-2">
          <a
            href="#"
            className="text-blue-400 hover:text-blue-500 focus:text-blue-600 transition-colors duration-200"
            onClick={() => {}}
          >
            створити кімнату
          </a>
        </li>
      </ul>
    </>
  );
}

export const Component = HomePage;
