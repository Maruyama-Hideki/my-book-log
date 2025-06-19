import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json({ error: "ISBNが必要です" }, { status: 400 });
  }

  try {
    const imageUrl = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;
    console.log("画像URL:", imageUrl);

    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error("画像取得エラー:", response.status, response.statusText);
      return NextResponse.json(
        { error: "画像が見つかりません" },
        { status: 404 }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400", // 24時間キャッシュ
      },
    });
  } catch (error) {
    console.error("画像取得エラー:", error);
    return NextResponse.json({ error: "画像取得エラー" }, { status: 500 });
  }
}
