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
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recentBooks, mood }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const data = await res.json();
      setRecommendation(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
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
