// ホームに表示される最近読んだ本

"use client";

import React from "react";
import { BookCardCarousel } from "../../molecules/book-card-carousel/BookCardCarousel";
import { useFetchRecentBooks } from "@/hooks/useFetchRecentBooks";


export const RecentBooks = () => {
  const { fetchedRecentBooks } = useFetchRecentBooks();

  if (fetchedRecentBooks.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-[32px]">
      <div className="flex flex-col w-full border rounded-lg relative">
        <h2 className="text-2xl font-bold text-gray-600 absolute -top-4 left-4 bg-white px-[16px]">
          recent books
        </h2>
        <div className="w-full pt-[36px]">
          <BookCardCarousel bookCards={fetchedRecentBooks} />
        </div>
      </div>
    </div>
  );
};
