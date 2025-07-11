"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { setUser, setLoading, fetchProfile } from "./slices/authSlice";
import { useAppDispatch } from "./hooks";

const supabase = createClient();

const AuthStateInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      dispatch(setUser(sessionUser));
      if (sessionUser) {
        dispatch(fetchProfile(sessionUser));
      }
      dispatch(setLoading(false));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthStateInitializer>{children}</AuthStateInitializer>
    </Provider>
  );
}
