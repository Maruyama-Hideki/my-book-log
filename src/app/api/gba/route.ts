import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, author } = await request.json();
  const queryParts = [];
  if (title) {
    queryParts.push(`intitle:${title}`);
  }
  if (author) {
    queryParts.push(`inauthor:${author}`);
  }
  if (queryParts.length === 0) {
    return NextResponse.json(
      { error: "タイトルまたは著者名を入力してください" },
      { status: 400 }
    );
  }

  const query = queryParts.join("+");
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
}
