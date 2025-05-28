import React from "react";
import { Title } from "../atoms/Title";
import { SocialLogin } from "../molecules/SocialLogin";
import { LoginForm } from "../molecules/LoginForm";
import { GlassmorphismCard } from "../molecules/GlassmorphismCard";
import Link from "next/link";

interface LoginContentProps {
  onSubmit: (formData: { email: string; password: string }) => Promise<void>;
  googleLogin: () => Promise<void>;
}

export const LoginContent: React.FC<LoginContentProps> = ({
  onSubmit,
  googleLogin,
}) => {
  return (
    <div className="w-full max-w-md box-border" style={{ marginLeft: "100px" }}>
      <GlassmorphismCard className="mt-8 p-4">
        <Title />
        <div className="space-y-6">
          <div>
            <h3 className="text-slate-800 font-bold text-2xl">
              Log in to your Account
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Welcome back! Please enter your details
            </p>
          </div>

          <div>
            <LoginForm onSubmit={onSubmit} />
          </div>

          <div>
            <SocialLogin googleLogin={googleLogin} />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[color:var(--custom-orange)] hover:text-[color:var(--custom-orange)]/80"
            >
              Create an account
            </Link>
          </p>
        </div>
      </GlassmorphismCard>
    </div>
  );
};
