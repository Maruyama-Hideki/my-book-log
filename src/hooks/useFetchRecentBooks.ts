import { useEffect, useState } from "react";
import { BookCardProps } from "@/components/atoms/bookCard";
import { useAppSelector } from "@/lib/store/hooks";
import { fetchBooks } from "@/services/book-service";

export const useFetchRecentBooks = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [fetchedRecentBooks, setFetchedRecentBooks] = useState<BookCardProps[]>([]);

    useEffect(() => {
      const fetchRecentBooks = async () => {
        if(!user){
            setFetchedRecentBooks([]);
            return;
        }
        try {
            const books = await fetchBooks(user.id, "read");
            const formattedBooks = books.map((book) => ({
                id: String(book.id),
                image: book.image_url || null,
                title: book.title || "",
            }));
            setFetchedRecentBooks(formattedBooks);
        } catch (error) {
            console.error("最近読んだ本の取得に失敗しました:", error);
            setFetchedRecentBooks([]);
        }
        }
      fetchRecentBooks();
    }, [user]);

    return { fetchedRecentBooks, setFetchedRecentBooks };
}