import React from "react";
import { BookCardCarousel } from "../../molecules/BookCardCarousel";

export const RecommendBooks = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <BookCardCarousel />
      </div>
    </div>
  );
};
