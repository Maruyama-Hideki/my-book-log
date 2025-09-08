import { GoogleBookItem } from "@/hooks/useBookshelf";

export const formatBookData = (bookData: GoogleBookItem, userId: string) => {
  return {
    user_id: userId,
    title: bookData.volumeInfo.title,
    author: bookData.volumeInfo.authors?.join(", "),
    publisher: bookData.volumeInfo.publisher,
    published_date: bookData.volumeInfo.publishedDate,
    description: bookData.volumeInfo.description,
    image_url: bookData.volumeInfo.imageLinks?.thumbnail,
    google_book_id: bookData.id,
    status: "wishlist",
  };
};