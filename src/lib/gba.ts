export const getBookImage = async (title: string, author: string) => {
  const res = await fetch("api/gba", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  });

  if (!res.ok) {
    throw new Error("書籍の画像の取得に失敗しました");
  }

  const data = await res.json();
  console.log("data:", data);

  return data || null;
};
