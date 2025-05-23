"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LoginContent } from "@/components/organisms/LoginContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { config } from "@/config";
import Loading from "./loading";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "invalid_tokens") {
      setError("Invalid authentication tokens. Please try again.");
    } else if (errorParam === "no_tokens") {
      setError("No authentication tokens received. Please try again.");
    }
  }, [searchParams]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
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
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Redirect ke endpoint Google OAuth di backend Express
      window.location.href = `${config.apiUrl}/auth/google`;
    } catch (err) {
      setError("An error occurred during Google login", err);
    }
  };

  return (
    <AuthTemplate>
      <div className="space-y-4">
        <LoginContent googleLogin={handleGoogleLogin} onSubmit={handleLogin} />
      </div>
    </AuthTemplate>
  );
}
