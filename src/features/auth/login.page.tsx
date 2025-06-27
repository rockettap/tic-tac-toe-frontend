import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

function LoginPage() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance py-6">
        LoginPage
      </h1>

      <div className="flex flex-col gap-3 max-w-xl">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <Button className="self-start" onClick={() => console.log("Click!")}>
          Click {email?.trim() ? `(${email.trim()})` : ""}
        </Button>
      </div>
    </>
  );
}

export const Component = LoginPage;
