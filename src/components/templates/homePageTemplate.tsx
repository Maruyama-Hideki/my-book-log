import React from "react";
import { Header } from "../organisms/header";
import { RecentBooks } from "../organisms/recent-books";
import { RecommendBooks } from "../organisms/recommend-books";

export const HomePageTemplate = () => {
  return (
    <>
      <Header />
      <RecommendBooks />
      <RecentBooks />
    </>
  );
};
