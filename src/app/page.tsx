import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-8 h-screen bg-gray-100">
        <Link href="/login">
          <Button
            variant="outline"
            className="border-none w-[400px] h-[60px] text-xl font-bold bg-white"
          >
            ログイン
          </Button>
        </Link>
      </div>
    </>
  );
}
