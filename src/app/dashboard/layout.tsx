"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Title } from "@/components/atoms/Title";
import Swal from "sweetalert2";
import { FaBook, FaCheckCircle, FaHome, FaTags, FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff725e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#ff725e",
        });

        router.push("/login");
      }
    });
  };

  return children;
}
