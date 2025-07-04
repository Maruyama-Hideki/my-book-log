import React from "react";
import { Header } from "@/components/organisms/header";
import { RecentBooks } from "@/components/organisms/recent-books";
import { RecommendBooks } from "@/components/organisms/recommend-books";

export const HomePageTemplate = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[100px]">
        <RecommendBooks />
        <RecentBooks />
      </div>
    </>
  );
};
