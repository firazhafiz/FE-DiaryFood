"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterContent } from "@/components/organisms/RegisterContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import Loading from "./loading";
import { config } from "@/config";
import { toast } from "react-toastify"; // Import toast for error handling
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (formData: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Register response:", data);

      if (response.ok) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      } else {
        const errorMessage = data.message || "Failed to register. Please try again.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${config.apiUrl}/auth/google`;
    } catch (err) {
      console.log(err);
    }
  };

  if (!mounted) {
    return <Loading />;
  }

  return (
    <AuthTemplate>
      <Suspense fallback={null}>
        <RegisterContent onSubmit={handleRegister} googleLogin={handleGoogleLogin} />
      </Suspense>
    </AuthTemplate>
  );
}
