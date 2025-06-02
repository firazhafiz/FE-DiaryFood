// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const tokens = searchParams.get("tokens");

    if (tokens) {
      try {
        const parsedTokens = JSON.parse(tokens);
        if (parsedTokens.access?.token) {
          login(parsedTokens.access.token)
            .then(() => {
              if (parsedTokens.refresh?.token) {
                Cookies.set("refreshToken", parsedTokens.refresh.token);
              }
              router.push("/");
            })
            .catch((error) => {
              console.error("Gagal login:", error);
              router.push("/login?error=login_failed");
            });
        } else {
          router.push("/login?error=invalid_tokens");
        }
      } catch (error) {
        console.error("Error parsing tokens:", error);
        router.push("/login?error=invalid_tokens");
      }
    } else {
      router.push("/login?error=no_tokens");
    }
  }, [router, searchParams, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Memproses login...</h2>
        <p className="text-gray-600">Harap tunggu saat kami menyelesaikan autentikasi Anda.</p>
      </div>
    </div>
  );
}
