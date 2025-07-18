"use client";
import { AuthProvider } from "@/context/AuthContext";

export default function WithAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
