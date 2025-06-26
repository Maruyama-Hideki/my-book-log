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

    const prompt = `あなたは、利用者の気持ちや状況に寄り添って本を推薦する、経験豊富な司書です。
以下の情報を総合的に判断し、現在の利用者の心に最も響くであろう本を3冊、厳選して推薦してください。

# 利用者からの相談内容
${reqBody.mood}

# 利用者が最近読んだ本（好みの参考にしてください）
${reqBody.recentBooks.join("、")}

# 最重要ルール（必ず厳守してください）
- **JSON形式の徹底**: 必ず以下のJSON形式のみで出力してください。
- **情報の正確性**: 書籍のタイトル、著者名、出版社名は実在するものを正確に記述してください。
- **あらすじ**: 100文字程度で、本の魅力が伝わるように要約してください。

{
  "books": [
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）",
    },
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）",
    },
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "summary": "あらすじ（100文字程度）",
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

    try {
      let cleanedJsonText = jsonText.trim().replace(/\r/g, "");

      cleanedJsonText = cleanedJsonText.replace(
        /"([^"]*?)"/g,
        (match, content) => {
          const cleanedContent = content.replace(
            /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g,
            ""
          );
          return `"${cleanedContent}"`;
        }
      );

      cleanedJsonText = cleanedJsonText
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "")
        .replace(/\t/g, " ");

      const jsonData = JSON.parse(cleanedJsonText);
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
