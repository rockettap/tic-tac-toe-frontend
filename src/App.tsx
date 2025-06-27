import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "@/shared/lib/paths";
import { Component as LoginPage } from "@/features/auth/login.page";
import { Component as RegisterPage } from "@/features/auth/register.page";
import { Component as UserPage } from "@/features/user/user.page";
import { Header } from "@/features/header";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
