"use client";

import React from "react";
import { BookCardCarousel } from "../../molecules/book-card-carousel/BookCardCarousel";
import { BookCardProps } from "@/components/atoms/bookCard";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const RecentBooks = () => {
  const { user } = useAuthContext();
  const [recentBooks, setRecentBooks] = useState<BookCardProps[]>([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "read")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("最近読んだ本の取得に失敗しました:", error);
        } else if (data) {
          const formattedBooks = data.map((book) => ({
            id: String(book.id),
            image: book.image_url || null,
            title: book.title || "",
          }));
          setRecentBooks(formattedBooks);
        }
      }
    };
    fetchRecentBooks();
  }, [user]);

  useEffect(() => {
    const whenLogout = () => {
      if (!user) {
        setRecentBooks([]);
      }
    };
    whenLogout();
  }, [user]);

  if (recentBooks.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-[32px]">
      <div className="flex flex-col w-full border rounded-lg relative">
        <h2 className="text-2xl font-bold text-gray-600 absolute -top-4 left-4 bg-white px-[16px]">
          recent books
        </h2>
        <div className="w-full pt-[36px]">
          <BookCardCarousel bookCards={recentBooks} />
        </div>
      </div>
    </div>
  );
};
