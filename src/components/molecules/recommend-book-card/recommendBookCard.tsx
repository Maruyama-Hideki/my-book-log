import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type BookRecommendation = {
  title: string;
  author: string;
  publisher: string;
  summary: string;
};

type RecommendationResponse = {
  books: BookRecommendation[];
};

export const RecommendBookCard = ({
  recommendation,
  urls,
  onClickAddToWishlist,
}: {
  recommendation: string | null;
  urls: (string | null)[] | null;
  onClickAddToWishlist: (book: BookRecommendation) => Promise<void>;
}) => {
  if (!recommendation) return null;
  try {
    const data: RecommendationResponse = JSON.parse(recommendation);

    if (data.books && Array.isArray(data.books)) {
      return (
        <div className="w-[1024px] space-y-4">
          <h3 className="text-lg font-semibold">おすすめの本</h3>
          <div className="flex gap-4 items-stretch">
            {data.books.map((book, index) => (
              <div key={index} className="border rounded-lg p-4 w-1/3">
                {urls && urls[index] ? (
                  <Image
                    src={urls[index]}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-[400px] object-cover mb-4 shadow-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-[400px] bg-gray-100 mb-4">
                    <p className="text-md text-gray-600">
                      本の画像が見つかりませんでした
                    </p>
                  </div>
                )}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-medium">{book.title}</h3>
                  <div className="text-md text-gray-600">
                    <p>著者: {book.author}</p>
                    <p>出版社: {book.publisher}</p>
                  </div>
                </div>
                <p className="text-md mt-auto pt-4">{book.summary}</p>
                <Button
                  onClick={() => onClickAddToWishlist(book)}
                  className="mt-4 cursor-pointer"
                  variant="secondary"
                >
                  読みたいリストに追加
                </Button>
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
