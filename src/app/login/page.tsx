// "use client";

import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const onClickLogin = () => {
  //   setIsLogin(true);
  // };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <Button
          className="w-3xs h-10 bg-green-300 hover:bg-amber-200 text-amber-200 hover:text-black cursor-pointer"
          variant="outline"
          size="lg"
          asChild
          // onClick={onClickLogin}
        >
          <Link href="/">ログイン</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
