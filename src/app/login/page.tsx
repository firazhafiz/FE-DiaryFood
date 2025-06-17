"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LoginContent } from "@/components/organisms/LoginContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { config } from "@/config";
import { useAuth } from "@/context/AuthContext";
import Loading from "./loading";
import { Suspense } from "react";

interface Tokens {
  access: { token: string; expires: string };
  refresh: { token: string; expires: string };
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const tokensParam = searchParams.get("tokens");

    if (errorParam === "invalid_tokens") {
      setError("Invalid authentication tokens. Please try again.");
    } else if (errorParam === "no_tokens") {
      setError("No authentication tokens received. Please try again.");
    } else if (tokensParam) {
      try {
        const tokens: Tokens = JSON.parse(tokensParam);
        if (tokens?.access?.token) {
          login(tokens.access.token)
            .then(() => {
              router.push("/");
            })
            .catch(() => {
              setError("Failed to process authentication tokens.");
            });
        } else {
          setError("Invalid token structure received.");
        }
      } catch (err) {
        setError("Failed to process authentication tokens.");
      }
    }
    setMounted(true);
  }, [searchParams, login, router]);

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

      if (response.ok) {
        const tokens: Tokens = data.data.tokens;
        if (tokens?.access?.token) {
          await login(tokens.access.token); // Wait for login to complete
          router.push("/");
        } else {
          setError("Invalid token structure in response.");
        }
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${config.apiUrl}/auth/google`;
      console.log(`${config.apiUrl}/auth/google`);
    } catch (err) {
      setError("An error occurred during Google login.");
    }
  };

  if (!mounted || loading) {
    return <Loading />;
  }

  return (
    <AuthTemplate>
      <div className="space-y-4">
        <Suspense fallback={null}>
          <LoginContent googleLogin={handleGoogleLogin} onSubmit={handleLogin} />
        </Suspense>
      </div>
    </AuthTemplate>
  );
}
