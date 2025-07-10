"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { BookCard, BookCardProps } from "@/components/atoms/bookCard";
import Autoplay from "embla-carousel-autoplay";
import { type EmblaCarouselType } from "embla-carousel";

export const BookCardCarousel = ({
  bookCards,
}: {
  bookCards: BookCardProps[];
}) => {
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  );

  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();

  const [randomIndex] = useState(() => {
    if (!bookCards || bookCards.length === 0) {
      return 0;
    } else {
      return Math.floor(Math.random() * bookCards.length);
    }
  });

  const handleInteraction = useCallback(() => {
    if (!emblaApi) return;
    autoplayRef.current.stop();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleInteraction);
    emblaApi.on("pointerDown", handleInteraction);

    return () => {
      emblaApi.off("select", handleInteraction);
      emblaApi.off("pointerDown", handleInteraction);
    };
  }, [emblaApi, handleInteraction]);

  return (
    <div className="w-full relative px-[16px] pb-[24px]">
      <Carousel
        plugins={[autoplayRef.current]}
        setApi={setEmblaApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          startIndex: randomIndex,
        }}
        className="w-full"
      >
        <CarouselContent className="cursor-grab active:cursor-grabbing">
          {bookCards.map((bookCard, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <BookCard
                id={bookCard.id}
                image={bookCard.image}
                title={bookCard.title}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
