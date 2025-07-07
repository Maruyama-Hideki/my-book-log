"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";

export const SettingsForm = () => {
  const {
    username,
    birthday,
    avatarUrl,
    setUsername,
    setBirthday,
    updateProfile,
    uploadAvatar,
    loading,
    uploading,
    validationError,
  } = useProfile();

  return (
    <div className="w-[954px] mx-auto mt-[24px]">
      <h1 className="text-2xl font-bold mb-[24px]">プロフィール設定</h1>
      <div className="space-y-[32px]">
        <div>
          <Label htmlFor="avatar">プロフィール写真</Label>
          <div className="mt-2 flex items-center gap-4">
            <Image
              src={avatarUrl || "https://placehold.jp/100x100.png"}
              alt="プロフィール写真"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full object-cover bg-gray-200"
              priority
            />
            <div>
              <Button asChild>
                <Label htmlFor="avatar-upload">
                  {uploading ? "アップロード中..." : "画像を変更"}
                </Label>
              </Button>
              <Input
                type="file"
                id="avatar-upload"
                onChange={uploadAvatar}
                className="hidden"
                disabled={uploading}
                accept="image/*"
              />
              <p className="text-xs text-gray-500 mt-1">
                写真は1MB以下のJPG、PNG、GIFファイルを選択してください
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            placeholder="ユーザー名"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          {validationError?.username && (
            <p className="text-sm text-red-500">
              {validationError.username[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthDay">誕生日(任意)</Label>
          <Input
            id="birthday"
            type="date"
            value={birthday || ""}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={loading}
          />
          {validationError?.birthday && (
            <p className="text-sm text-gray-500">
              {validationError.birthday[0]}
            </p>
          )}
        </div>
        <div>
          <Button
            type="submit"
            onClick={() => updateProfile()}
            // disabled={loading || uploading}
          >
            {loading || uploading ? "保存中..." : "更新"}
          </Button>
        </div>
      </div>
    </div>
  );
};
