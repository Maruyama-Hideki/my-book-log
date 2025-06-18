"use client";

import React, { useState } from "react";
import { useGemini } from "@/hooks/useGemini";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { PlusIcon } from "lucide-react";
import { RecommendBookCard } from "../../molecules/recommend-book-card";

export const RecommendBooks = () => {
  const { getRecommendation, recommendation, isLoading, error } = useGemini();
  const [mood, setMood] = useState("");
  const [recentBooks, setRecentBooks] = useState<string[]>([""]);

  const addBook = () => {
    setRecentBooks([...recentBooks, ""]);
  };

  const removeBook = (index: number) => {
    if (recentBooks.length > 1) {
      setRecentBooks(recentBooks.filter((_, i) => i !== index));
    }
  };

  const updateBook = (index: number, value: string) => {
    const newBooks = [...recentBooks];
    newBooks[index] = value;
    setRecentBooks(newBooks);
  };

  return (
    <div className="flex flex-col gap-4 pt-[60px] items-center">
      <div className="flex flex-col items-start w-full max-w-[400px]">
        <p className="mb-[12px] text-lg">今の気分は？</p>
        <Input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full h-[40px]"
        />
      </div>
      <div className="flex flex-col items-start w-full max-w-[400px]">
        <p className="mb-[12px] text-lg">最近読んだ本</p>
        {recentBooks.map((book, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={book}
              onChange={(e) => updateBook(index, e.target.value)}
              placeholder={`本 ${index + 1}`}
              className="w-[400px] h-[40px] text-lg"
            />
            {recentBooks.length > 1 && (
              <Button onClick={() => removeBook(index)} variant="secondary">
                削除
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addBook} variant="secondary">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      <Button
        onClick={() =>
          getRecommendation({
            mood,
            recentBooks: recentBooks.filter((book) => book.trim() !== ""),
          })
        }
        className="mt-[12px]"
        variant="secondary"
      >
        本を探す
      </Button>
      {isLoading && <p>読み込み中...</p>}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>エラーが発生しました:</p>
          <p>{error}</p>
        </div>
      )}
      <RecommendBookCard recommendation={recommendation} />
    </div>
  );
};
