"use client";

import { Provider, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  supabaseAtom,
  userAtom,
  profileAtom,
  isLoadingAtom,
} from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { User } from "@supabase/supabase-js";

const AuthStateInitializer = ({ children }: { children: React.ReactNode }) => {
  const supabase = useAtomValue(supabaseAtom);
  const setUser = useSetAtom(userAtom);
  const setProfile = useSetAtom(profileAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);

  useEffect(() => {
    const fetchProfile = async (sessionUser: User | null) => {
      if (!sessionUser) {
        setProfile(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("JotaiProvider:プロフィールの取得エラー:", error);
        setProfile(null);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      fetchProfile(sessionUser);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setProfile, setIsLoading]);

  return <>{children}</>;
};

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <AuthStateInitializer>{children}</AuthStateInitializer>
    </Provider>
  );
};
