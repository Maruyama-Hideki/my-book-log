"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import { z } from "zod";
import { ProfileSchema } from "@/lib/schema";
import { useAppDispatch } from "@/lib/store/hooks";
import { refreshProfile } from "@/lib/store/slices/authSlice";

type Profile = Database["public"]["Tables"]["users"]["Row"];

export const useProfile = () => {
  const authState = useAppSelector((state) => state.auth);
  const { user, profile } = authState;
  const dispatch = useAppDispatch();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<
    z.ZodError["formErrors"]["fieldErrors"] | null
  >(null);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setBirthday(profile.birthday);
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const updateProfile = async (newAvatarUrl?: string) => {
    if (!user) return;

    const result = ProfileSchema.safeParse({ username, birthday });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setValidationError(fieldErrors);
      return;
    }

    setValidationError(null);

    try {
      setLoading(true);

      const updates: Partial<Profile> = {
        id: user.id,
        username,
        birthday,
        avatar_url: newAvatarUrl ? newAvatarUrl : avatarUrl,
      };

      const { error } = await supabase.from("users").upsert(updates);
      if (error) throw error;
      alert("プロフィールを更新しました");
      await dispatch(refreshProfile(user));
    } catch (error) {
      alert("プロフィールの更新に失敗しました");
      console.error("プロフィール更新エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) throw new Error("ファイルが選択されていません");
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      await updateProfile(publicUrl);
    } catch (error) {
      alert("アバターのアップロードに失敗しました");
      console.error("アバターアップロードエラー:", error);
    } finally {
      setUploading(false);
    }
  };

  return {
    loading,
    uploading,
    username,
    birthday,
    avatarUrl,
    setUsername,
    setBirthday,
    updateProfile,
    uploadAvatar,
    validationError,
  };
};
