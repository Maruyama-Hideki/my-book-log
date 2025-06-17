import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const askGemini = async (request: Request) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new NextResponse("GEMINI_API_KEY is not set", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const reqBody = await request.json();
  const prompt = `最近読んだ本は「${reqBody.recentBooks.join(
    "、"
  )}」です。今の気分は「${
    reqBody.mood
  }」です。次に読むべきおすすめの本を3冊、理由つきで教えてください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
