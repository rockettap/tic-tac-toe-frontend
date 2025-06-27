import { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance py-6">
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

        <Button className="self-start" onClick={() => console.log("Click!")}>
          Зареєструватись {email?.trim() ? `(${email.trim()})` : ""}
        </Button>
      </div>
    </>
  );
}

export const Component = RegisterPage;
