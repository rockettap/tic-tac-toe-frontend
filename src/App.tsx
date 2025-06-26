import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "@/shared/lib/paths";
import { Component as LoginPage } from "@/features/auth/login.page";
import { Component as RegisterPage } from "@/features/auth/register.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.LOGIN} replace />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
