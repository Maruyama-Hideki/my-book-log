import React from "react";
import Image from "next/image";

type BookRecommendation = {
  title: string;
  author: string;
  publisher: string;
  summary: string;
  ISBN: string[];
};

type RecommendationResponse = {
  books: BookRecommendation[];
};

export const RecommendBookCard = ({
  recommendation,
  urls,
}: {
  recommendation: string | null;
  urls: (string | null)[] | null;
}) => {
  if (!recommendation) return null;
  try {
    const data: RecommendationResponse = JSON.parse(recommendation);

    if (data.books && Array.isArray(data.books)) {
      return (
        <div className="w-[1024px] space-y-4 mb-[240px]">
          <h3 className="text-lg font-semibold">おすすめの本</h3>
          <div className="flex gap-4">
            {data.books.map((book, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                {urls && urls[index] && (
                  <Image
                    src={urls[index]}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-[300px] h-[400px]"
                  />
                )}
                <h3 className="text-2xl font-medium">{book.title}</h3>
                <div className="text-md text-gray-600">
                  <p>著者: {book.author}</p>
                  <p>出版社: {book.publisher}</p>
                  <p>ISBN: {book.ISBN}</p>
                </div>
                <p className="text-md">{book.summary}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error("JSONパースエラー:", error);
    console.error("パースしようとしたデータ:", recommendation);
    return <p className="whitespace-pre-wrap">{recommendation}</p>;
  }

  return <p className="whitespace-pre-wrap">{recommendation}</p>;
};
