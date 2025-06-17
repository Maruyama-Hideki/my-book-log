"use client";

import React, { useState } from "react";
import { useGemini } from "@/hooks/useGemini";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

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
    <div className="flex flex-col gap-4 pt-[60px]">
      <div>
        <p>今の気分は？</p>
        <Input value={mood} onChange={(e) => setMood(e.target.value)} />
      </div>
      <div>
        <p>最近読んだ本</p>
        {recentBooks.map((book, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={book}
              onChange={(e) => updateBook(index, e.target.value)}
              placeholder={`本 ${index + 1}`}
            />
            {recentBooks.length > 1 && (
              <Button onClick={() => removeBook(index)} variant="destructive">
                削除
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addBook} variant="outline">
          本を追加
        </Button>
      </div>
      <Button
        onClick={() =>
          getRecommendation({
            mood,
            recentBooks: recentBooks.filter((book) => book.trim() !== ""),
          })
        }
      >
        本を探す
      </Button>
      {isLoading && <p>読み込み中...</p>}
      {error && <p>エラーが発生しました: {error}</p>}
      {recommendation && <p>{recommendation}</p>}
    </div>
  );
};
