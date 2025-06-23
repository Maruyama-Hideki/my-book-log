import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { BookCard, BookCardProps } from "../../atoms/bookCard";

export const BookCardCarousel = ({
  bookCards,
}: {
  bookCards: BookCardProps[];
}) => {
  return (
    <div className="w-full relative px-[16px]">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {bookCards.map((bookCard, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
            >
              <BookCard id={bookCard.id} image={bookCard.image} />
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
