import React from "react";
import { Header } from "@/components/organisms/header/Header";
import { RecommendBooks } from "@/components/organisms/recommend-books/RecommendBooks";
const page = () => {
  return (
    <div>
      <Header />
      <RecommendBooks />
    </div>
  );
};

export default page;
