"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, login, isLoading, error } =
    useAuth();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/mypage");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-[800px]">
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-[100px] cursor-pointer hover:opacity-60"
          onClick={login}
        >
          {isLoading ? "Loading..." : "ログイン"}
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          variant="secondary"
          className="w-[100px] cursor-pointer hover:opacity-60"
          onClick={() => router.push("/signUp")}
        >
          {isLoading ? "Loading..." : "新規登録"}
        </Button>
      </div>
    </div>
  );
};
