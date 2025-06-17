import { askGemini } from "@/lib/gemini";

/**
 * おすすめの本を推薦するAPIエンドポイント
 * @param request Requestオブジェクト
 * @returns Geminiからのレスポンス
 */
export async function POST(request: Request) {
  try {
    console.log("API endpoint called");
    const result = await askGemini(request);
    console.log("API result:", result);
    return result;
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
