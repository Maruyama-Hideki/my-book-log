// 読みたい本ページ

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

type WishListBookCardProps = {
  id: string;
  title: string;
  image: string | null;
};

const supabase = createClient();

export const WishlistBooks = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [books, setBooks] = useState<WishListBookCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickDelete = async (bookId: string) => {
    if (!user) return;

    if (!window.confirm("読みたい本リストから削除しますか？")) return;

    try {
      const { error } = await supabase
        .from("books")
        .select("*")
        .eq("id", bookId)
        .eq("user_id", user.id)
        .eq("status", "wishlist")
        .single();

      if (error) {
        console.error("読みたい本の削除に失敗しました:", error);
      }

      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("読みたい本の削除に失敗しました:", error);
      alert("読みたい本の削除に失敗しました");
    }
  };

  useEffect(() => {
    const fetchWishlistBooks = async () => {
      if (user) {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "wishlist")
          .order("created_at", { ascending: false });

        if (data) {
          const formattedBooks = data.map((book) => ({
            id: String(book.id),
            title: book.title,
            image: book.image_url || null,
          }));
          setBooks(formattedBooks);
        }
        if (error) {
          console.error("読みたい本のデータ取得に失敗しました:", error);
        }
      }
      setIsLoading(false);
    };
    fetchWishlistBooks();
  }, [user]);

  return (
    <div className="flex flex-col gap-4 w-[954px] mx-auto">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">
        {isLoading ? "本棚を読み込んでいます..." : "読みたい本"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books.map((book) => (
          <div key={book.id} className="relative group">
            <Link href={`/book/${book.id}`}>
              {book.image ? (
                <div className="relative">
                  <Image
                    src={book.image}
                    alt="book image"
                    width={200}
                    height={300}
                    className="w-[200px] h-[300px]"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickDelete(book.id);
                    }}
                    className="absolute top-1 right-8 bg-transparent rounded-full p-1 hidden group-hover:block"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative flex justify-center items-center w-[200px] h-[300px] px-4 bg-gray-200 text-gray-600">
                  <div className="flex flex-col items-center justify-center border-l-4 border-gray-300">
                    <div className="flex items-center justify-center w-[176px] h-[280px] ml-2 border border-gray-400 text-center">
                      {book.title}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickDelete(book.id);
                    }}
                    className="absolute top-2 right-2 bg-transparent rounded-full hidden group-hover:block"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
