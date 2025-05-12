import React from "react";
import { Title } from "../atoms/Title";
import { SocialLogin } from "../molecules/SocialLogin";
import { RegisterForm } from "../molecules/RegisterForm";
import Link from "next/link";

interface RegisterContentProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  onSubmit,
}) => {
  return (
    <div className="w-full max-w-md m-auto p-8">
      <Title />
      <h2 className="mt-2 text-slate-800 font-bold text-3xl">
        Create your Account
      </h2>
      <p className="mt-1 text-slate-400">
        Join us! Select method to create your account:
      </p>

      <div className="mt-4">
        <SocialLogin />
      </div>

      <div className="mt-6">
        <RegisterForm onSubmit={onSubmit} />
      </div>

      <p className="mt-6 text-center text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[color:var(--custom-orange)] hover:text-[color:var(--custom-orange)]/80"
        >
          Sign in to your account
        </Link>
      </p>
    </div>
  );
};
