import React from "react";

export type BookCardProps = {
  image: string;
};

export const BookCard = (props: BookCardProps) => {
  return (
    <img
      src={props.image}
      alt="book"
      className="w-[300px] h-[400px] object-cover"
    />
  );
};
