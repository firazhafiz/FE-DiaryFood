"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokens = searchParams.get("tokens");

    if (tokens) {
      try {
        const parsedTokens = JSON.parse(tokens);
        if (parsedTokens.access?.token) {
          // Simpan token ke localStorage
          localStorage.setItem("token", parsedTokens.access.token);
          if (parsedTokens.refresh?.token) {
            localStorage.setItem("refreshToken", parsedTokens.refresh.token);
          }
          // Redirect ke dashboard
          router.push("/");
        }
      } catch (error) {
        console.error("Error parsing tokens:", error);
        router.push("/login?error=invalid_tokens");
      }
    } else {
      router.push("/login?error=no_tokens");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing login...</h2>
        <p className="text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}
