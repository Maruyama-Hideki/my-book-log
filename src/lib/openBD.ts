export const getBookImage = async (isbn: string[]) => {
  const res = await fetch("api/openBD", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isbn }),
  });

  if (!res.ok) {
    throw new Error("書籍の画像の取得に失敗しました");
  }

  const data = await res.json();
  console.log("data:", data);

  return data;
};
