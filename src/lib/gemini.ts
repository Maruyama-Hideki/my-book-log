import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const askGemini = async (request: Request) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    return new NextResponse("GOOGLE_API_KEY is not set", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.1,
      topP: 0.8,
      topK: 40,
    },
  });

  try {
    const reqBody = await request.json();

    if (!reqBody.recentBooks || !reqBody.mood) {
      return new NextResponse(
        JSON.stringify({ error: "必要なパラメータが不足しています" }),
        { status: 400 }
      );
    }

    const prompt = `最近読んだ本は「${reqBody.recentBooks.join(
      "、"
    )}」です。今の気分は「${
      reqBody.mood
    }」です。次に読むべきおすすめの本を3冊、以下のJSON形式で返してください。

必ず以下の形式で返してください。余分な説明やテキストは含めないでください：

{
  "books": [
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）"
      "ISBN": "ISBN"
    },
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）"
      "ISBN": "ISBN"
    },
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）"
      "ISBN": "ISBN"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // レスポンステキストからJSONを抽出
    let jsonText = text;

    // コードブロックで囲まれている場合は除去
    if (text.includes("```json")) {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
    } else if (text.includes("```")) {
      const jsonMatch = text.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
    }

    // JSONとしてパースを試行
    try {
      const jsonData = JSON.parse(jsonText.trim());
      return NextResponse.json(jsonData);
    } catch (error) {
      console.error("JSONパースエラー:", error);
      console.error("パースしようとしたテキスト:", jsonText);
      return NextResponse.json({ text });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "予期せぬエラーが発生しました",
      },
      { status: 500 }
    );
  }
};
