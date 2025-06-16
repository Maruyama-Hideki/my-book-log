import { http } from "msw";
import { LoginRequestBody } from "@/api/auth";

type LoginRequest = {
  username: string;
  password: string;
};

export const handlers = [
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
];
