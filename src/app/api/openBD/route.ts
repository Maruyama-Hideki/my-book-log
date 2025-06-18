import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { isbn } = await request.json();
  const cleanIsbn = isbn.map((isbn: string) => isbn.replace(/-/g, ""));
  console.log("cleanIsbn:", cleanIsbn);
  const res = await fetch(
    `https://api.openbd.jp/v1/get?isbn=${cleanIsbn.join(",")}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
