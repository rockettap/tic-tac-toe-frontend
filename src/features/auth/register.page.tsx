import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ROUTES } from "@/shared/lib/paths";

import useRegister from "@/features/auth/use-register";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, loading } = useRegister();

  const handleRegister = async () => {
    const x = await registerUser(email, password);
    if (!x) {
      toast.error("Помилка!");
    } else {
      navigate(location.state?.from || ROUTES.HOME, {
        replace: true,
      });

      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          RegisterPage
        </h1>
      </div>

      <div className="flex flex-col gap-3 max-w-xl">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Пошта"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={loading || (!email && !password)}
            className="self-start w-full sm:w-auto"
            onClick={handleRegister}
          >
            Створити акаунт
          </Button>
        </div>
      </div>
    </>
  );
}

export const Component = RegisterPage;
