"use client";

import { LoginForm } from "@/components/organisms/LoginForm";
import { AuthLayout } from "@/components/templates/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store the token in localStorage or a secure cookie
        localStorage.setItem("token", data.token);
        // Redirect to dashboard or home page
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login", error);
    }
  };

  return (
    <AuthLayout title="Sign in to your account" subtitle="Don't have an account? ">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <LoginForm onSubmit={handleLogin} />
      <div className="mt-4 text-center">
        <Link href="/register" className="text-sm text-blue-600 hover:text-blue-500">
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
}
