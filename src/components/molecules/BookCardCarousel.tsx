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
  { image: "https://placehold.co/600x400" },
  { image: "https://placehold.co/600x400" },
  { image: "https://placehold.co/600x400" },
  { image: "https://placehold.co/600x400" },
  { image: "https://placehold.co/600x400" },
  { image: "https://placehold.co/600x400" },
];

export const BookCardCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {BookCards.map((bookCard, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
