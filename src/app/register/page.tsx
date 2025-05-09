"use client";

import { RegisterForm } from "@/components/organisms/RegisterForm";
import { AuthLayout } from "@/components/templates/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleRegister = async (formData: { name: string; email: string; password: string; confirmPassword: string }) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to login page after successful registration
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration", error);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Already have an account? ">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <RegisterForm onSubmit={handleRegister} />
      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
          Sign in to your account
        </Link>
      </div>
    </AuthLayout>
  );
}
