import { Suspense, lazy } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "sonner";

import { ROUTES } from "@/shared/lib/paths";

import { Component as LoginPage } from "@/features/auth/login.page";
import { Component as RegisterPage } from "@/features/auth/register.page";
import { Header } from "@/features/header";
import { Component as HomePage } from "@/features/home/home.page";
import { Component as NotFoundPage } from "@/features/not-found/not-found.page";

import { Loader } from "./shared/components/ui/loader";

const RoomPage = lazy(() =>
  import("@/features/room/room.page").then((m) => ({ default: m.Component })),
);
const GamePage = lazy(() =>
  import("@/features/game/game.page").then((m) => ({ default: m.Component })),
);
const RoomCreatePage = lazy(() =>
  import("@/features/room/room-create.page").then((m) => ({
    default: m.Component,
  })),
);
const RoomJoinPage = lazy(() =>
  import("@/features/room/room-join.page").then((m) => ({
    default: m.Component,
  })),
);
const UserPage = lazy(() =>
  import("@/features/user/user.page").then((m) => ({ default: m.Component })),
);
const UserStatsPage = lazy(() =>
  import("@/features/user/user-stats.page").then((m) => ({
    default: m.Component,
  })),
);
const UserLastGamesPage = lazy(() =>
  import("@/features/user/user-last-games.page").then((m) => ({
    default: m.Component,
  })),
);

function App() {
  return (
    <Router>
      <Header />
      <div className="px-[18px] sm:px-[24px]">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.GAME} element={<GamePage />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />

            <Route path={ROUTES.ROOM} element={<RoomPage />} />
            <Route path={ROUTES.ROOM_CREATE} element={<RoomCreatePage />} />
            <Route path={ROUTES.ROOM_JOIN} element={<RoomJoinPage />} />

            <Route path={ROUTES.USER} element={<UserPage />} />
            <Route path={ROUTES.USER_STATS} element={<UserStatsPage />} />
            <Route
              path={ROUTES.USER_LAST_GAMES}
              element={<UserLastGamesPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster theme="dark" position="bottom-center" />
    </Router>
  );
}

export default App;
