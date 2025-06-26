import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/organisms/header";

type BookDetailPageProps = {
  params: {
    id: string;
  };
};

const BookDetailPage = async ({ params }: BookDetailPageProps) => {
  const supabase = createClient();
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            {book.image_url && (
              <Image
                src={book.image_url}
                alt={book.title || "本の表紙"}
                width={300}
                height={450}
                className="rounded-lg shadow-lg"
                priority
              />
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-1">
              著者: {book.author || "情報なし"}
            </p>
            <p className="text-lg text-gray-500 mb-4">
              出版社: {book.publisher || "情報なし"} (
              {book.published_date || "日付不明"})
            </p>
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              あらすじ
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {book.description || "あらすじ情報はありません。"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
