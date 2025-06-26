import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BookCardProps = {
  id: string;
  image: string;
};

export const BookCard = (props: BookCardProps) => {
  return (
    <Link href={`/book/${props.id}`}>
      <Image
        src={props.image}
        alt="book"
        width={200}
        height={300}
        className="object-cover cursor-pointer"
      />
    </Link>
  );
};
