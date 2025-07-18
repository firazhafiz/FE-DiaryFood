"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Disable static generation

function AuthCallbackContent() {
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
                Cookies.set("refreshToken", parsedTokens.refresh.token, {
                  expires: 7,
                }); // Set expiry for refresh token
              }
              toast.success("Login successful!");
              router.push("/");
            })
            .catch((error) => {
              console.error("Gagal login:", error);
              toast.error("Failed to log in. Please try again.");
              router.push("/login?error=login_failed");
            });
        } else {
          toast.error("Invalid authentication tokens.");
          router.push("/login?error=invalid_tokens");
        }
      } catch (error) {
        console.error("Error parsing tokens:", error);
        toast.error("Invalid token format.");
        router.push("/login?error=invalid_tokens");
      }
    } else {
      toast.error("No authentication tokens provided.");
      router.push("/login?error=no_tokens");
    }
  }, [router, searchParams, login]);

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-slate-800">
            Memproses login...
          </h2>
          <p className="text-gray-600">
            Harap tunggu saat kami menyelesaikan autentikasi Anda.
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default function AuthCallback() {
  return (
    <AuthProvider>
      <AuthCallbackContent />
    </AuthProvider>
  );
}
