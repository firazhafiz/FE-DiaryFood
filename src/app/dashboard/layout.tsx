import React from "react";
import Link from "next/link";
import { Title } from "@/components/atoms/Title";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <nav className="bg-white shadow-sm w-1/5 px-6">
        <div className="flex flex-col  gap-6 py-6 ">
          <div className="flex-shrink-0 flex items-center">
            <Title />
          </div>
          <div className="hidden  sm:flex  h-full  flex-col gap-5">
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
            <Link href={"/login"} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-6 w-4/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}
