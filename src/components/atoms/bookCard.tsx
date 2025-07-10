import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BookCardProps = {
  id: string;
  image: string;
  title: string;
};

export const BookCard = (props: BookCardProps) => {
  const imageUrl = props.image
    ? props.image
    : "https://placehold.jp/184x260.png";
  return (
    <Link href={`/book/${props.id}`}>
      <Image
        src={imageUrl}
        alt="book"
        width={200}
        height={300}
        className="object-cover cursor-pointer"
      />
    </Link>
  );
};
