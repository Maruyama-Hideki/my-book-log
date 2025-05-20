"use client";

import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false);
  const [showPanel, setShowPanel] = React.useState<boolean>(false);

  return (
    <header className="h-16 flex justify-between items-center py-2 px-4 bg-green-300">
      <h1 className="text-2xl font-bold text-blue-500">My-Book-Log</h1>
      <nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              className="rounded-full object-cover"
              src="https://www.j-14.com/wp-content/uploads/2023/06/karina-aespa.jpg?crop=0px%2C195px%2C3244px%2C1705px&resize=1200%2C630&quality=86&strip=all"
              alt="karina"
              width={48}
              height={48}
              style={{ aspectRatio: "1/1" }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
