import React from "react";
import { Header } from "@/components/organisms/header";
import { LoginForm } from "@/components/organisms/login-form/LoginForm";

export const LoginFormTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <LoginForm />
      </div>
    </div>
  );
};
