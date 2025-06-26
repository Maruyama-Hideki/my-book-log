"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const signUp = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      alert("確認メールを送信しました");
    }
    router.refresh();
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const login = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("メールアドレスかパスワードが間違っています");
    }
    router.refresh();
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    signUp,
    logout,
    error,
    isLoading,
  };
};
