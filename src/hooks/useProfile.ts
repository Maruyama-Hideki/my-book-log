"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["users"]["Row"];

export const useProfile = () => {
  const { user } = useAuthContext();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setBirthday(data.birthday);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("プロフィールの取得に失敗しました");
      console.error("プロフィール取得エラー:", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const updateProfile = async (newAvatarUrl?: string) => {
    if (!user) return;
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
      if (!file) return;
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
  };
};
