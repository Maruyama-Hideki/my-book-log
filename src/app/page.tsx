import { Header } from "@/components/organisms/header/Header";
import { RecentBooks } from "@/components/organisms/recent-books";
import { RecommendBooks } from "@/components/recommend-books";

export default function Home() {
  return (
    <>
      <Header />
      <RecentBooks />
      <RecommendBooks />
    </>
  );
}
