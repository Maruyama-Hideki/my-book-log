import React from "react";
import { BookCardCarousel } from "../../molecules/book-card-carousel/BookCardCarousel";
import { BookCardProps } from "@/components/atoms/bookCard";

// APIを繋いで取得したデータをBookCardsに格納する
const BookCards: BookCardProps[] = [
  {
    id: "1",
    image: "https://m.media-amazon.com/images/I/51+hk62YF2L._SL500_.jpg",
  },
  { id: "2", image: "https://m.media-amazon.com/images/I/71ld5EcSVSL.jpg" },
  { id: "3", image: "https://m.media-amazon.com/images/I/51076TYQYPL.jpg" },
  {
    id: "4",
    image:
      "https://tshop.r10s.jp/book/cabinet/9313/9784167919313_1_6.jpg?downsize=600:*",
  },
  { id: "5", image: "https://m.media-amazon.com/images/I/51RsDYXDIwL.jpg" },
  {
    id: "6",
    image:
      "https://www.kinokuniya.co.jp/images/goods/ar2/web/eimgdata/9987031323.jpg",
  },
  {
    id: "7",
    image: "https://m.media-amazon.com/images/I/31UzRHnwdlL._SX300_.jpg",
  },
  { id: "8", image: "https://m.media-amazon.com/images/I/71Lcp+A51gL.jpg" },
  { id: "9", image: "https://m.media-amazon.com/images/I/61hSBs5nxWL.jpg" },
];

export const RecentBooks = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">
        recent books
      </h2>
      <div className="w-full">
        <BookCardCarousel bookCards={BookCards} />
      </div>
    </div>
  );
};
