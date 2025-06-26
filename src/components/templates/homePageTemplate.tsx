import React from "react";
import { Header } from "../organisms/header";
import { RecentBooks } from "../organisms/recent-books";
import { RecommendBooks } from "../organisms/recommend-books";

export const HomePageTemplate = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[64px]">
        <RecommendBooks />
        <RecentBooks />
      </div>
    </>
  );
};
