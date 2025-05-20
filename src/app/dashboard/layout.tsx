"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Title } from "@/components/atoms/Title";
import Swal from "sweetalert2";
import { FaBook, FaCheckCircle, FaHome, FaTags, FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

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
    <div className="min-h-screen relative">
      {/* Background gradient with blur effect - improved colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200  to-violet-200 z-0"></div>

      {/* Decorative blobs for more visual interest */}
      <div className="h-[500px] w-[400px] rounded-full blur-3xl bg-purple-100 absolute top-20 right-50 z-0 opacity-60"></div>
      <div className="h-[500px] w-[600px] rounded-full blur-3xl backdrop-blur-3xl bg-blue-100 absolute top-5 left-10 z-0 opacity-60"></div>

      <div className="flex relative z-10">
        {/* Sidebar with improved glassmorphism effect */}
        <nav className="w-1/6 px-6 h-screen  fixed bg-white/40 backdrop-blur-lg rounded-3xl m-4 border-2 border-white/60 shadow">
          <div className="flex flex-col h-full gap-8 py-6 justify-center items-center">
            <div className="flex-shrink-0 flex items-center">
              <Title />
            </div>
            <div className="flex flex-col h-full gap-8">
              <div className="hidden sm:flex h-full flex-col gap-8">
                <Link href="/dashboard" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3 ">
                  <FaHome className="text-lg" />
                  Dashboard
                </Link>
                <Link href="/dashboard/users" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
                  <FaUsers className="text-lg" />
                  Users
                </Link>
                <Link href="/dashboard/categories" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
                  <FaTags className="text-lg" />
                  Categories
                </Link>
                <Link href="/dashboard/recipes" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
                  <FaBook className="text-lg" />
                  Recipes
                </Link>
                <Link href="/dashboard/approve-recipes" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
                  <FaCheckCircle className="text-lg" />
                  Approve Recipes
                </Link>
                <Link href="/dashboard/feedback" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
                  <FaMessage className="text-lg" />
                  Feedback
                </Link>
              </div>
              <div className="w-full mb-6 ">
                <button
                  onClick={handleLogout}
                  className=" text-slate-700 font-semibold hover:text-white hover:bg-slate-700 hover:border-slate-300 transition-all duration-300 items-center rounded-full px-5 py-1 border text-sm text-left border-slate-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - 4/5 width */}
        <div className="w-5/6 ml-[17%]">
          <div className="my-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Content container with subtle glass effect */}
              <div className="bg-white/30 backdrop-blur-sm  overflow-hidden rounded-2xl border-2 border-white/60 shadow">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
