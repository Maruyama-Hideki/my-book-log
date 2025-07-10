import React from "react";
import { BookRowListCard } from "@/components/molecules/book-row-list-card";
import { GoogleBookItem } from "@/components/organisms/bookshelf/Bookshelf";
import { BookCardProps } from "@/components/atoms/bookCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

type BookRowListProps = {
  results: GoogleBookItem[];
  bookList: BookCardProps[];
  setBookList: (bookList: BookCardProps[]) => void;
  setSearchResult: (searchResult: GoogleBookItem[]) => void;
};

export const BookRowList = (props: BookRowListProps) => {
  const { results, bookList, setBookList, setSearchResult } = props;
  const { user } = useAuthContext();
  const supabase = createClient();

  const onClickAdd = async (item: GoogleBookItem) => {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    const BookDataToInsert = {
      user_id: user.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(","),
      image_url: item.volumeInfo.imageLinks?.thumbnail,
      google_book_id: item.id,
      publisher: item.volumeInfo.publisher,
      published_date: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
    };

    const { data: newBookData, error } = await supabase
      .from("books")
      .insert(BookDataToInsert)
      .select()
      .single();
    if (error) {
      console.error("本棚のデータ登録に失敗しました:", error);
      return;
    } else if (newBookData) {
      const newBook: BookCardProps = {
        title: newBookData.title,
        id: String(newBookData.id),
        image: newBookData.image_url || null,
      };
      setBookList([newBook, ...bookList]);
      setSearchResult([]);
    }
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
