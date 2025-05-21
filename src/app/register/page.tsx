"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterContent } from "@/components/organisms/RegisterContent";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleRegister = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <AuthTemplate>
      <RegisterContent onSubmit={handleRegister} />
    </AuthTemplate>
  );
}
