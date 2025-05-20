import { Header } from "@/components/organisms/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-8 h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700">がんばろー！</h1>
        <Link href="/login">ログイン</Link>
      </div>
    </>
  );
}
