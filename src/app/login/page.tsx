"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginContent } from "@/components/organisms/LoginContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

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
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <AuthTemplate>
      <LoginContent onSubmit={handleLogin} />
    </AuthTemplate>
  );
}
