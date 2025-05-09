import React from "react";
import { Title } from "../atoms/Title";
import { SocialLogin } from "../molecules/SocialLogin";
import { LoginForm } from "../molecules/LoginForm";
import Link from "next/link";

interface LoginContentProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginContent: React.FC<LoginContentProps> = ({ onSubmit }) => {
  return (
    <div className="w-full max-w-md m-auto p-8 ">
      <Title />
      <h2 className="mt-2 text-slate-800 font-bold text-3xl">Log in to your Account</h2>
      <p className="mt-1 text-slate-400">Welcome back! select method to log in:</p>

      <div className="mt-4">
        <SocialLogin />
      </div>

      <div className="mt-6">
        <LoginForm onSubmit={onSubmit} />
      </div>

      <p className="mt-6 text-center text-gray-500">
        Don't have an account?{" "}
        <Link href="/register" className="text-orange-600 hover:text-orange-700">
          Create an account
        </Link>
      </p>
    </div>
  );
};
