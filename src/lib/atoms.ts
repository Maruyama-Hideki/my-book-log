import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["users"]["Row"];

export const supabaseAtom = atom(() => createClient());
export const userAtom = atom<User | null>(null);
export const profileAtom = atom<Profile | null>(null);
export const isLoadingAtom = atom<boolean>(false);

export const refreshProfileAtom = atom(null, async (get, set) => {
  const supabase = get(supabaseAtom);
  const user = get(userAtom);

  if (!user) {
    set(profileAtom, null);
    return;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    set(profileAtom, data);
  } catch (error) {
    console.error("refreshProfileAtom:プロフィールの取得エラー:", error);
    set(profileAtom, null);
  }
});
