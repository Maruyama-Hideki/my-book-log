"use client";

import React from "react";
import { BookCardCarousel } from "../../molecules/book-card-carousel/BookCardCarousel";
import { BookCardProps } from "@/components/atoms/bookCard";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

export const RecentBooks = () => {
  const { user } = useAuthContext();
  const [recentBooks, setRecentBooks] = useState<BookCardProps[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchRecentBooks = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("最近読んだ本の取得に失敗しました:", error);
        } else if (data) {
          const formattedBooks = data.map((book) => ({
            id: String(book.id),
            image: book.image_url || "",
          }));
          setRecentBooks(formattedBooks);
        }
      }
    };
    fetchRecentBooks();
  }, [user, supabase]);

  if (recentBooks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">
        recent books
      </h2>
      <div className="w-full">
        <BookCardCarousel bookCards={recentBooks} />
      </div>
    </div>
  );
};
