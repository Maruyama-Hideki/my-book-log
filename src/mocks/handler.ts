import { http } from "msw";
import { LoginRequestBody } from "@/api/auth";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;
    if (
      body.user?.username === "hideki" &&
      body.user?.password === "password"
    ) {
      return new Response(
        JSON.stringify({
          message: "Login Success!",
          token: "12345678",
          user: {
            id: 1,
            username: body.user?.username,
            password: body.user?.password,
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
];
