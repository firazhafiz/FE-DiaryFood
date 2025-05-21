"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginContent } from "@/components/organisms/LoginContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import Loading from "./loading";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      -(
        // try {
        //   const response = await fetch("/api/auth/login", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        //   });

        //   const data = await response.json();

        //   if (data.success) {
        //     localStorage.setItem("token", data.token);
        //     router.push("/dashboard");
        //   } else {
        //     setError(data.message);
        //   }
        // } catch (error) {
        //   setError("An error occurred during login");
        // }
        router.push("/dashboard")
      );
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      {isLoading && <Loading />}
      <LoginContent onSubmit={handleLogin} />
    </AuthTemplate>
  );
}
