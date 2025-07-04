import React from "react";
import { Header } from "@/components/organisms/header";
import { MyPageSwitch } from "@/components/organisms/my-page-switch/MyPageSwitch";

export const MyPageTemplate = () => {
  return (
    <div>
      <Header />
      <MyPageSwitch />
    </div>
  );
};
