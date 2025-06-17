import { askGemini } from "@/lib/gemini";

/**
 * おすすめの本を推薦するAPIエンドポイント
 * @param request Requestオブジェクト
 * @returns Geminiからのレスポンス
 */
export async function POST(request: Request) {
  return askGemini(request);
}
