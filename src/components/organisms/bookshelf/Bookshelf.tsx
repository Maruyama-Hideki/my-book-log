// 本棚

"use client";

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
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { BookRowList } from "@/components/organisms/book-row-list";
import Link from "next/link";
import { useBookshelf } from "@/hooks/useBookshelf";

export const Bookshelf = () => {
  const { bookshelfList, setBookshelfList, onClickSearch, onClickDelete, isLoading, searchResult, setSearchResult } = useBookshelf();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const isSearchResultModalOpen = searchResult.length > 0;

  return (
    <div className="flex flex-col gap-4 w-[954px] mx-auto">
      <h2 className="text-2xl font-bold mb-[16px] pl-[16px] pt-[16px]">
        {isLoading ? "本棚を読み込んでいます..." : "本棚"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* 本を検索するモーダル */}
        <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
          <form>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center w-full h-full aspect-[2/3] bg-gray-100 border-4 border-dashed border-gray-200 rounded-lg">
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
                <Button variant="outline" type="submit" onClick={() => onClickSearch(title, author)}>
                  検索する
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        {/* 検索結果を表示するモーダル */}
        <Dialog
          open={isSearchResultModalOpen}
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
                bookList={bookshelfList}
                setBookList={setBookshelfList}
                setSearchResult={setSearchResult}
              />
            </div>
          </DialogContent>
        </Dialog>
        {/* 本棚に追加した本を表示する */}
        {bookshelfList.map((book) => (
          <Link
            href={`/book/${book.id}`}
            key={book.id}
            className="relative group"
          >
            {book.image ? (
              <>
                <Image
                  src={book.image}
                  alt="book"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-[8px] p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full cursor-pointer bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickDelete(book.id);
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex justify-center items-center w-[200px] h-[300px] px-4 bg-gray-200 text-gray-600">
                  <div className="flex flex-col items-center justify-center border-l-4 border-gray-300">
                    <div className="flex items-center justify-center w-[176px] h-[280px] ml-2 border border-gray-400 text-center">
                      {book.title}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickDelete(book.id);
                    }}
                    className="absolute top-2 right-2 bg-transparent rounded-full hidden group-hover:block"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
