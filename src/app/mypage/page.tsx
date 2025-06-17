import React from "react";
import { Header } from "@/components/organisms/header/Header";
import { RecentBooks } from "@/components/organisms/recent-books";
const page = () => {
  return (
    <div>
      <Header />
      <RecentBooks />
    </div>
  );
};

export default page;
