import React from "react";
import { BookCardCarousel } from "../../molecules/bookCardCarousel/BookCardCarousel";
import { BookCardProps } from "@/components/atoms/bookCard";

// APIを繋いで取得したデータをBookCardsに格納する
const BookCards: BookCardProps[] = [
  { image: "https://m.media-amazon.com/images/I/51+hk62YF2L._SL500_.jpg" },
  { image: "https://m.media-amazon.com/images/I/71ld5EcSVSL.jpg" },
  { image: "https://m.media-amazon.com/images/I/51076TYQYPL.jpg" },
  {
    image:
      "https://tshop.r10s.jp/book/cabinet/9313/9784167919313_1_6.jpg?downsize=600:*",
  },
  { image: "https://m.media-amazon.com/images/I/51RsDYXDIwL.jpg" },
  {
    image:
      "https://www.kinokuniya.co.jp/images/goods/ar2/web/eimgdata/9987031323.jpg",
  },
  { image: "https://m.media-amazon.com/images/I/31UzRHnwdlL._SX300_.jpg" },
  { image: "https://m.media-amazon.com/images/I/71Lcp+A51gL.jpg" },
  { image: "https://m.media-amazon.com/images/I/61hSBs5nxWL.jpg" },
];

export const RecommendBooks = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <BookCardCarousel bookCards={BookCards} />
      </div>
    </div>
  );
};
