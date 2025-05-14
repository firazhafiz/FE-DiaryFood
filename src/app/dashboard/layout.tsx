"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Title } from "@/components/atoms/Title";
import Swal from "sweetalert2";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - 1/5 width */}
      <nav className="bg-white shadow-sm w-1/5 px-6 h-screen fixed">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex-shrink-0 flex items-center">
            <Title />
          </div>
          <div className="hidden sm:flex h-full flex-col gap-5">
            <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Users
            </Link>
            <Link href="/dashboard/recipes" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Recipes
            </Link>
            <Link href="/dashboard/approve-recipes" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Approve Recipes
            </Link>
            <button onClick={handleLogout} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-left">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - 4/5 width */}
      <div className="w-4/5 ml-[20%]">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
