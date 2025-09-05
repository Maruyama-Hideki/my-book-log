import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { deleteBook, fetchBooks } from "@/services/book-service";
import { BookCardProps } from "@/components/atoms/bookCard";
import { getBookData } from "@/lib/gba";

export type GoogleBookItem = {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      publisher?: string;
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
    };
  };

export const useBookshelf = () => {
    const user = useAppSelector((state) => state.auth.user);

    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<GoogleBookItem[]>([]);
    const [bookshelfList, setBookshelfList] = useState<BookCardProps[]>([]);

    useEffect(() => {
        if(!user) {
            setBookshelfList([]);
            return;
        }
        const fetchBookshelf = async () => {
            console.log("fetchBookshelf");
            try {
                setIsLoading(true);
                const bookshelf = await fetchBooks(user.id, "read");
                const formattedBooks = bookshelf.map((book) => ({
                    id: String(book.id),
                    image: book.image_url || null,
                    title: book.title || "",
                }));
                setBookshelfList(formattedBooks);
            } catch (error) {
                console.error("本棚のデータ取得に失敗しました:", error);
                setBookshelfList([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBookshelf();
    }, [user]);

    const onClickSearch = async (title: string, author: string) => {
        if(!title && !author) {
            alert("タイトルまたは著者名を入力してください");
            return;
        }
        try {
            setIsLoading(true);
            const data = await getBookData(title, author);
            if(data?.items) {
                setSearchResult(data.items);
            } else {
                alert("本が見つかりませんでした");
                setSearchResult([]);
            }
        } catch (error) {
            console.error("本の検索に失敗しました:", error);
            setSearchResult([]);
        } finally {
            setIsLoading(false);
        }
    };

    const onClickDelete = async (bookId: string) => {
        if(!user) {
            alert("ログインしてください");
            return;
        }
        const originalBookshelfList = [...bookshelfList];
        if(!window.confirm("本を削除しますか？")) {
            return;
        }
        try {
            setIsLoading(true);
            setBookshelfList(bookshelfList.filter((book) => book.id !== bookId));//Memo: 楽観的UI(DBの更新前にUIを更新する)
            await deleteBook(user.id, bookId, "read");
        } catch (error) {
            console.error("本の削除に失敗しました:", error);
            alert("本の削除に失敗しました");
            setBookshelfList(originalBookshelfList);//Memo: DBの更新に失敗した場合、元の本棚リストを復元する
        } finally {
            setIsLoading(false);
        }
    }

    return { bookshelfList, setBookshelfList, onClickSearch, onClickDelete, isLoading, searchResult, setSearchResult };
}