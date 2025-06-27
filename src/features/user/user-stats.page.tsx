import { type PathParams, ROUTES } from "@/shared/lib/paths";
import { useParams } from "react-router-dom";

function UserStatsPage() {
  const params = useParams<PathParams[typeof ROUTES.USER]>();

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance py-6">
        UserStatsPage, userId={params.userId}
      </h1>
    </>
  );
}

export const Component = UserStatsPage;
