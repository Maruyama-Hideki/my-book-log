import React from "react";
import { BookCardCarousel } from "../molecules/BookCardCarousel";

export const RecommendBooks = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">recommend books</h2>
      <div className="w-full">
        <BookCardCarousel />
      </div>
    </div>
  );
};
