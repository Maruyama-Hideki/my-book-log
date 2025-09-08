// Geminiから取得したおすすめの本を表示するところかな？至急リファクタ

"use client";

import React, { useEffect, useState } from "react";
import { useGemini } from "@/hooks/useGemini";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { PlusIcon } from "lucide-react";
import { RecommendBookCard } from "../../molecules/recommend-book-card";
import { getBookData } from "@/lib/gba";
import { type BookRecommendation } from "@/components/molecules/recommend-book-card";
import { useAppSelector } from "@/lib/store/hooks";
import { useFetchRecentBooks } from "@/hooks/useFetchRecentBooks";
import { fetchGoogleBookData } from "@/services/googleBookService";
import { formatBookData } from "../../../../utils/bookFormatter";
import { insertUserBook } from "@/services/book-service";
import { DataBaseError, DuplicateBookError } from "@/lib/errors/bookErrors";

type RecommendationResponse = {
  books: Array<BookRecommendation>;
};

export const RecommendBooks = () => {
  const authState = useAppSelector((state) => state.auth);
  const { user } = authState;
  const { getRecommendation, recommendation, isLoading, error } = useGemini();
  const [mood, setMood] = useState("");
  const [recentBooks, setRecentBooks] = useState<string[]>([""]);
  const { fetchedRecentBooks } = useFetchRecentBooks();
  const [urls, setUrls] = useState<(string | null)[]>([]);


  // recommendationの画像を取得
  useEffect(() => {
    if (!recommendation) {
      return;
    }
    const fetchImages = async () => {
      try {
        const data = JSON.parse(recommendation) as RecommendationResponse;

        if (data && data.books) {
          const fetchedUrls = await Promise.all(
            data.books.map(async (book) => {
              try {
                const gbaData = await getBookData(book.title, book.author);
                if (!gbaData?.items) {
                  return null;
                }
                let imageUrl: string | null = null;
                for (const item of gbaData.items) {
                  const foundUrl = item.volumeInfo?.imageLinks?.thumbnail;
                  if (foundUrl) {
                    imageUrl = foundUrl;
                    break;
                  }
                }
                return imageUrl;
              } catch (error) {
                console.error(
                  `'${book.title}'の画像取得プロセスでエラー:`,
                  error
                );
                return null;
              }
            })
          );
          setUrls(fetchedUrls);
        }
      } catch (e) {
        console.error("recommendationのパースに失敗", e);
      }
    };
    fetchImages();
  }, [recommendation]);

  // 読みたいリストにおすすめされた本を追加
  const onClickAddToWishlist = async (book: BookRecommendation) => {
    if (!user) return;

    try {
      const bestMatch = await fetchGoogleBookData(book.title, book.author)
      const bookDataToInsert = formatBookData(bestMatch, user.id);

      await insertUserBook(bookDataToInsert);
        alert("本を読みたいリストに追加しました");
    } catch (error) {
      if (error instanceof DuplicateBookError) {
        alert("本がすでに本棚に登録されています");
      } else if (error instanceof DataBaseError) {
        alert("データベースに接続できませんでした");
      }
      alert("本の追加に失敗しました:" + error);
      console.error("本の追加に失敗しました:", error);
    }
  };

  // inputの最近読んだ本に登録する本の追加、削除、更新
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
        <p className="text-lg">
          最近読んだ本
          <br />
          (本棚に登録した本が自動的に適応されます)
        </p>
        {!user && (
          <p className="text-sm text-gray-500">
            ※ログイン後、本棚を使用できます。
          </p>
        )}
        <p className="mb-[12px] text-sm text-gray-500">
          ※入力された本が本棚の本より優先されます。
        </p>
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
            recentBooks:
              recentBooks.filter((book) => book.trim() !== "").length > 0
                ? recentBooks.filter((book) => book.trim() !== "")
                : fetchedRecentBooks.map((book) => book.title),
          })
        }
        className="mt-[12px] font-semibold text-gray-500 hover:bg-black hover:text-white hover:border-black cursor-pointer"
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
      <RecommendBookCard
        recommendation={recommendation}
        urls={urls}
        onClickAddToWishlist={onClickAddToWishlist}
      />
    </div>
  );
};
