"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useAtomValue } from "jotai";
import { userAtom, profileAtom, isLoadingAtom } from "@/lib/atoms";

export const Header = () => {
  const user = useAtomValue(userAtom);
  const profile = useAtomValue(profileAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  const { logout } = useAuth();

  const onClickLogout = () => {
    logout();
  };

  if (isLoading) {
    return <header className="w-full h-20 border-b" />;
  }

  return (
    <header className="w-full h-20 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-4 pl-[24px]">
        <Link href="/" className="text-xl font-bold">
          my book log
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={profile?.avatar_url || "https://placehold.jp/100x100.png"}
                alt="avatar"
              />
            </Avatar>
            <p>{profile?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 cursor-pointer">
                <DropdownMenuLabel>menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/mypage">
                  <DropdownMenuCheckboxItem className="cursor-pointer">
                    my page
                  </DropdownMenuCheckboxItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuCheckboxItem className="cursor-pointer">
                    settings
                  </DropdownMenuCheckboxItem>
                </Link>
                <Link href="/">
                  <DropdownMenuCheckboxItem
                    className="cursor-pointer"
                    onClick={onClickLogout}
                  >
                    Logout
                  </DropdownMenuCheckboxItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button>ログイン</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
