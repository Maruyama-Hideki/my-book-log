// "passthrough" をmswからインポートする
import { http, passthrough } from "msw";
import { LoginRequestBody } from "@/api/auth";

type LoginRequest = {
  username: string;
  password: string;
};

export const handlers = [
  // 既存のログインAPIのモック
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;
    if (body.username === "hideki" && body.password === "password") {
      return new Response(
        JSON.stringify({
          message: "Login Success!",
          token: "12345678",
          user: {
            id: 1,
            username: body.username,
            password: body.password,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login Failed..",
      } as LoginRequestBody),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }),

  // ▼▼▼ ここから追加 ▼▼▼
  // Next.jsの画像最適化リクエストは、MSWの対象外にしてそのまま通す
  http.get("http://localhost:3000/_next/image", () => {
    return passthrough();
  }),
  // ▲▲▲ ここまで追加 ▲▲▲
];
