import React from "react";
import { Header } from "../organisms/header";
import { SignUpForm } from "../organisms/sign-up-form/SignUpForm";

export const SignUpFormTemplate = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <SignUpForm />
      </div>
    </div>
  );
};
