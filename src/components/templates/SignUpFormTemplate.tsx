import React from "react";
import { Header } from "@/components/organisms/header";
import { SignUpForm } from "@/components/organisms/sign-up-form/SignUpForm";

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
