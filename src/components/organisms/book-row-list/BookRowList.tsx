import React from "react";
import { BookRowListCard } from "@/components/molecules/book-row-list-card";
import { GoogleBookItem } from "@/components/organisms/bookshelf/Bookshelf";
import { BookCardProps } from "@/components/atoms/bookCard";

type BookRowListProps = {
  results: GoogleBookItem[];
  bookList: BookCardProps[];
  setBookList: (bookList: BookCardProps[]) => void;
  setSearchResult: (searchResult: GoogleBookItem[]) => void;
};

export const BookRowList = (props: BookRowListProps) => {
  const { results, bookList, setBookList, setSearchResult } = props;

  const onClickAdd = (item: GoogleBookItem) => {
    const newBook: BookCardProps = {
      id: item.id,
      image: item.volumeInfo.imageLinks?.thumbnail || "",
    };
    setBookList([newBook, ...bookList]);
    setSearchResult([]);
  };

  return (
    <div className="flex flex-col gap-[4px]">
      {results.map((item) => (
        <BookRowListCard
          key={item.id}
          {...item}
          onClick={() => onClickAdd(item)}
        />
      ))}
    </div>
  );
};
