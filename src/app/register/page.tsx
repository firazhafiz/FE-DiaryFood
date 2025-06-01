"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterContent } from "@/components/organisms/RegisterContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import Loading from "./loading";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (formData: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(formData);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  if (!mounted) {
    return <Loading />;
  }

  return (
    <AuthTemplate>
      <RegisterContent onSubmit={handleRegister} />
    </AuthTemplate>
  );
}
