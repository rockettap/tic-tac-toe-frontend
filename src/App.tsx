import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "sonner";

import { ROUTES } from "@/shared/lib/paths";

import { Component as LoginPage } from "@/features/auth/login.page";
import { Component as RegisterPage } from "@/features/auth/register.page";
import { Component as GamePage } from "@/features/game/game.page";
import { Header } from "@/features/header";
import { Component as HomePage } from "@/features/home/home.page";
import { Component as NotFoundPage } from "@/features/not-found/not-found.page";
import { Component as RoomCreatePage } from "@/features/room/room-create.page";
import { Component as RoomJoinPage } from "@/features/room/room-join.page";
import { Component as RoomPage } from "@/features/room/room.page";
import { Component as UserLastGamesPage } from "@/features/user/user-last-games.page";
import { Component as UserStatsPage } from "@/features/user/user-stats.page";
import { Component as UserPage } from "@/features/user/user.page";

function App() {
  return (
    <Router>
      <Header />
      <div className="px-[18px] sm:px-[24px]">
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
      </div>
      <Toaster theme="dark" position="bottom-center" />
    </Router>
  );
}

export default App;
