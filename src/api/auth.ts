// export type LoginRequestBody = {
//   message: string;
//   token?: string;
//   user?: {
//     id: number;
//     username: string;
//     password: string;
//   };
// };

// export const authApi = async (username: string, password: string) => {
//   const response = await fetch("/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "ログインに失敗しました");
//   }

//   return data as LoginRequestBody;
// };
