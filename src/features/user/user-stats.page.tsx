import { useParams } from "react-router-dom";

import { type PathParams, ROUTES } from "@/shared/lib/paths";

function UserStatsPage() {
  const params = useParams<PathParams[typeof ROUTES.USER]>();

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          UserStatsPage, userId={params.userId}
        </h1>
      </div>
    </>
  );
}

export const Component = UserStatsPage;
