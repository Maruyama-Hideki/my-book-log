import { NextRequest, NextResponse } from "next/server";

// type IndustryIdentifier = {
//   type: string;
//   identifier: string;
// };

// type VolumeInfo = {
//   industryIdentifiers?: IndustryIdentifier[];
// };

// type BookItem = {
//   volumeInfo?: VolumeInfo;
// };

export async function POST(request: NextRequest) {
  const { title, author } = await request.json();
  const query = `intitle:${title}+inauthor:${author}`;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Google Books API エラー" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);

  // if (!data.items || !Array.isArray(data.items)) {
  //   return NextResponse.json(
  //     { error: "該当する書籍が見つかりませんでした" },
  //     { status: 404 }
  //   );
  // }
  // const items = data.items as BookItem[];
  // const ISBN = items
  //   .flatMap((item: BookItem) => item.volumeInfo?.industryIdentifiers || [])
  //   .find(
  //     (id: IndustryIdentifier) => id.type === "ISBN_13" || id.type === "ISBN_10"
  //   )?.identifier;
  // return NextResponse.json({ ISBN });
}
