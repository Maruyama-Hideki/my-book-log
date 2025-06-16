import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { BookCard, BookCardProps } from "../atoms/bookcard";

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

export const BookCardCarousel = () => {
  return (
    <div className="w-full relative pt-[16px] px-[16px]">
      <h2 className="text-2xl font-bold mb-[16px]">recommend books</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {BookCards.map((bookCard, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            >
              <BookCard image={bookCard.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-4 absolute left-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};
