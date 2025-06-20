"use client";

import { BookCardProps } from "@/components/atoms/bookCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { getBookData } from "@/lib/gba";
import { BookRowList } from "../book-row-list";

export type GoogleBookItem = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
};

export const Bookshelf = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [searchResult, setSearchResult] = useState<GoogleBookItem[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [bookList, setBookList] = useState<BookCardProps[]>([
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/51+hk62YF2L._SL500_.jpg",
    },
    { id: "2", image: "https://m.media-amazon.com/images/I/71ld5EcSVSL.jpg" },
    { id: "3", image: "https://m.media-amazon.com/images/I/51076TYQYPL.jpg" },
    {
      id: "4",
      image:
        "https://tshop.r10s.jp/book/cabinet/9313/9784167919313_1_6.jpg?downsize=600:*",
    },
    { id: "5", image: "https://m.media-amazon.com/images/I/51RsDYXDIwL.jpg" },
    {
      id: "6",
      image:
        "https://www.kinokuniya.co.jp/images/goods/ar2/web/eimgdata/9987031323.jpg",
    },
    {
      id: "7",
      image: "https://m.media-amazon.com/images/I/31UzRHnwdlL._SX300_.jpg",
    },
    { id: "8", image: "https://m.media-amazon.com/images/I/71Lcp+A51gL.jpg" },
    { id: "9", image: "https://m.media-amazon.com/images/I/61hSBs5nxWL.jpg" },
  ]);

  const onClickSearch = async () => {
    const data = await getBookData(title, author);
    console.log(data);
    if (data.items) {
      setSearchResult(data.items);
      setIsSearchDialogOpen(false);
    } else {
      alert("本が見つかりませんでした");
      setSearchResult([]);
    }
  };

  const isModalOpen = searchResult.length > 0;

  return (
    <div className="flex flex-col gap-4 w-[954px] mx-auto">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">本棚</h2>
      <div className="grid grid-cols-3 gap-[12px]">
        {/* 本を検索するモーダル */}
        <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
          <form>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center w-[300px] h-[400px] bg-gray-100 border-4 border-dashed border-gray-200 rounded-lg">
                <PlusIcon className="w-10 h-10" />
              </div>
            </DialogTrigger>
            <DialogContent className="w-[600px] h-[400px]">
              <DialogHeader>
                <DialogTitle>本を検索する</DialogTitle>
                <DialogDescription>
                  タイトル、著者名を指定して本を検索できます
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1" className="text-md">
                    タイトル
                  </Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="桃太郎"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1" className="text-md">
                    著者名
                  </Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="山田太郎"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="submit" onClick={onClickSearch}>
                  検索する
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        {/* 検索結果を表示するモーダル */}
        <Dialog
          open={isModalOpen}
          onOpenChange={(isOpen) => !isOpen && setSearchResult([])}
        >
          <DialogContent className="max-w-[700px] w-full max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>検索結果</DialogTitle>
              <DialogDescription>
                本棚に追加したい書籍を選択してください。
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto">
              <BookRowList
                results={searchResult}
                bookList={bookList}
                setBookList={setBookList}
                setSearchResult={setSearchResult}
              />
            </div>
          </DialogContent>
        </Dialog>

        {bookList.map((book) => (
          <div key={book.id}>
            <Image src={book.image} alt="book" width={300} height={400} />
          </div>
        ))}
      </div>
    </div>
  );
};
