"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { isLogin } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(username, password);
    setUsername("");
    setPassword("");
  };

  const router = useRouter();
  useEffect(() => {
    if (isLogin) {
      router.push("/mypage");
    }
  }, [isLogin]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center items-center w-[800px]"
    >
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="w-[100px] cursor-pointer hover:opacity-60"
      >
        Submit
      </Button>
    </form>
  );
};
