import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BookCardProps = {
  image: string;
};

export const BookCard = (props: BookCardProps) => {
  return (
    <Link href="/book">
      <Image
        src={props.image}
        alt="book"
        width={300}
        height={400}
        className="object-cover cursor-pointer"
      />
    </Link>
  );
};
