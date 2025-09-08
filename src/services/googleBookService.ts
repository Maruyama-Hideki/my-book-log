import { getBookData } from "@/lib/gba";

export const fetchGoogleBookData = async (title: string, author: string) => {
  const googleBookData = await getBookData(title, author);
  if (!googleBookData?.items || googleBookData.items.length === 0) {
    throw new Error('Google Books APIで書籍が見つかりませんでした')
  }
  return googleBookData.items[0];//Memo: 何冊かある検索結果の最初の本(最も一致しそうな本)を返す
};