"use client";

import React from "react";
import { Title } from "../atoms/Title";
import { SocialLogin } from "../molecules/SocialLogin";
import { RegisterForm } from "../molecules/RegisterForm";
import { GlassmorphismCard } from "../molecules/GlassmorphismCard";
import Link from "next/link";

interface RegisterContentProps {
  onSubmit: (data: { name: string; email: string; password: string }) => Promise<void>;
  googleLogin: () => Promise<void>;
}

export const RegisterContent: React.FC<RegisterContentProps> = ({ onSubmit, googleLogin }) => {
  return (
    <div className="w-full max-w-md">
      <GlassmorphismCard className="mt-8 p-4 sm:p-6">
        <Title />
        <div className="space-y-6">
          <div>
            <h3 className="text-slate-800 font-bold text-xl sm:text-2xl">Create your Account</h3>
            <p className="mt-2 text-sm text-slate-400">Join us! Select method to create your account</p>
          </div>

          <div>
            <RegisterForm onSubmit={onSubmit} />
          </div>

          <div>
            <SocialLogin googleLogin={googleLogin} />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[color:var(--custom-orange)] hover:text-[color:var(--custom-orange)]/80">
              Sign in to your account
            </Link>
          </p>
        </div>
      </GlassmorphismCard>
    </div>
  );
};
