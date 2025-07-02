import React, { useState } from "react";

import { href, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { isValidObjectId } from "@/shared/lib/is-valid-object-id";
import { ROUTES } from "@/shared/lib/paths";

function RoomJoinPage() {
  const [roomId, setRoomId] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomId(e.target.value);
    setIsValid(isValidObjectId(e.target.value));
  }

  function handleJoinRoom() {
    if (!isValid) {
      toast.error("Помилка!");
    } else {
      navigate(href(ROUTES.ROOM, { roomId }));
    }
  }

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden my-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          RoomJoinPage
        </h1>
      </div>

      <div className="flex flex-col gap-3 max-w-xl">
        <Input
          type="roomId"
          value={roomId}
          onChange={handleInputChange}
          placeholder="ID кімнати"
        />
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={!isValid}
            className="self-start w-full sm:w-auto"
            onClick={handleJoinRoom}
          >
            Приєднатись
          </Button>
        </div>
      </div>
    </>
  );
}

export const Component = RoomJoinPage;
