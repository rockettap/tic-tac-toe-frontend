import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import useRegister from "@/features/auth/use-register";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const { registerUser, loading } = useRegister();

  const handleRegister = async () => {
    const x = await registerUser(email, password);
    if (!x) toast.error("Помилка!");
  };

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance my-6">
        RegisterPage
      </h1>
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
