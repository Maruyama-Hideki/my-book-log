import React from "react";
import { Header } from "../organisms/header";
import { MyPageSwitch } from "../organisms/my-page-switch/MyPageSwitch";

export const MyPageTemplate = () => {
  return (
    <div>
      <Header />
      <MyPageSwitch />
    </div>
  );
};
