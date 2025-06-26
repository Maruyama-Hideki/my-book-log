"use client";

import { useState } from "react";

type RecommendataionRequest = {
  recentBooks: string[];
  mood: string;
};

export const useGemini = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const getRecommendation = async ({
    recentBooks,
    mood,
  }: RecommendataionRequest) => {
    alert(
      `=== useGemini.getRecommendation が呼ばれました ===\nrecentBooks: ${JSON.stringify(
        recentBooks
      )}\nmood: ${mood}`
    );

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recentBooks, mood }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "レコメンデーションの取得に失敗しました");
      }

      // 構造化されたデータの場合はJSON.stringifyで文字列化
      if (data.books && Array.isArray(data.books)) {
        setRecommendation(JSON.stringify(data));
      } else if (data.text) {
        setRecommendation(data.text);
      } else {
        setRecommendation(JSON.stringify(data));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
      setRecommendation(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRecommendation,
    isLoading,
    error,
    recommendation,
  };
};
