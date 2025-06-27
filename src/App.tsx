import { Component as LoginPage } from "@/features/auth/login.page";
import { Component as RegisterPage } from "@/features/auth/register.page";
import { Header } from "@/features/header";
import { Component as UserLastGamesPage } from "@/features/user/user-last-games";
import { Component as UserStatsPage } from "@/features/user/user-stats.page";
import { Component as UserPage } from "@/features/user/user.page";
import { ROUTES } from "@/shared/lib/paths";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Header />
      <div className="px-[18px] sm:px-[24px]">
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={ROUTES.LOGIN} replace />}
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.USER} element={<UserPage />} />
          <Route path={ROUTES.USER_STATS} element={<UserStatsPage />} />
          <Route
            path={ROUTES.USER_LAST_GAMES}
            element={<UserLastGamesPage />}
          />
        </Routes>
      </div>
      <Toaster theme="dark" position="bottom-center" />
    </Router>
  );
}

export default App;
