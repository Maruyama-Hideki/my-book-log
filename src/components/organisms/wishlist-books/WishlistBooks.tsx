"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { BookCardProps } from "@/components/atoms/bookCard";
import Link from "next/link";
import Image from "next/image";

export const WishlistBooks = () => {
  const supabase = createClient();
  const { user } = useAuthContext();
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [user, supabase]);

  return (
    <div className="flex flex-col gap-4 w-[954px] mx-auto">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">
        {isLoading ? "本棚を読み込んでいます..." : "読みたい本"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books.map((book) => (
          <Link href={`/book/${book.id}`} key={book.id}>
            {book.image ? (
              <Image
                src={book.image}
                alt="book image"
                width={200}
                height={300}
              />
            ) : (
              <div className="flex justify-center items-center w-[200px] h-[300px] bg-gray-200">
                画像が見つかりません
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
