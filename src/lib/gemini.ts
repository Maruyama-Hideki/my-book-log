import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const askGemini = async (request: Request) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  console.log("API Key check:", {
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length,
    apiKeyPrefix: apiKey?.substring(0, 10) + "...",
  });

  if (!apiKey) {
    return new NextResponse("GOOGLE_API_KEY is not set", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    }」です。次に読むべきおすすめの本を3冊、理由つきで教えてください。`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return NextResponse.json({ text });
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
