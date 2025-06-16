"use client";

import { useState } from "react";
import { authApi } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";

type User = {
  id: number;
  username: string;
  password: string;
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { setIsLogin } = useAuthContext();

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi(username, password);
      if (response.token && response.user) {
        setUser(response.user);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      setIsLogin(true);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    user,
  };
};
