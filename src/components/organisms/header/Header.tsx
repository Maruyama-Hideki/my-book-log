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

export const Header = () => {
  return (
    <header className="w-full h-20 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-4 pl-[24px]">
        <Link href="/" className="text-xl font-bold">
          my book log
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/mypage">
              <DropdownMenuCheckboxItem>my page</DropdownMenuCheckboxItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuCheckboxItem>settings</DropdownMenuCheckboxItem>
            </Link>
            <Link href="/panel">
              <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
