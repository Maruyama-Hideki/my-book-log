import React from "react";
import { GoogleBookItem } from "@/components/organisms/bookshelf/Bookshelf";
import Image from "next/image";

type BookRowListCardProps = GoogleBookItem & {
  onClick: () => void;
};

export const BookRowListCard = (props: BookRowListCardProps) => {
  const { volumeInfo, onClick } = props;
  const { title, authors, publishedDate, imageLinks } = volumeInfo;
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-[32px] border-2 rounded-[4px]"
    >
      {imageLinks?.thumbnail && (
        <Image
          src={imageLinks.thumbnail}
          alt={title}
          width={90}
          height={120}
          className="rounded-l-[4px]"
        />
      )}
      <div>
        <h3 className="text-2xl font-medium mb-[8px]">{title}</h3>
        <p>著者: {authors?.join(", ")}</p>
        <div className="flex gap-2">
          <p>出版社: {publishedDate}</p>
          <p>出版日: {publishedDate}</p>
        </div>
      </div>
    </div>
  );
};
