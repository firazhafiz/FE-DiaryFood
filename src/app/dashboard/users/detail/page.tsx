"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { CatDinner } from "../../../../../public/assets";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  recipeCount?: number;
  bio?: string;
  location?: string;
  joinDate?: string;
}

const DetailUser: React.FC = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("published");

  useEffect(() => {
    const userId = searchParams.get("id");
    if (userId) {
      fetchUserData(userId);
    }
  }, [searchParams]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl p-8 ">
          <p className="text-slate-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl p-8 ">
          <p className="text-slate-700">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/30 p-8">
      <Link href={"/dashboard/users"} className="inline-flex items-center gap-2 backdrop-blur-lg bg-white/30 border border-white/50 mb-6 py-2 px-6 rounded-xl text-slate-700 hover:bg-white/40 transition-all duration-300 ">
        <FaArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/30 rounded-2xl border border-white/50 overflow-hidden ">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-full blur-xl"></div>
              <img src="/assets/images/image_login.png" alt={user.name} className="relative w-32 h-32 rounded-full border-4 border-white/50 shadow-lg" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-700 text-center mb-2">{user.name}</h1>
          <p className="text-slate-500 text-center mb-6">{user.email}</p>

          {user.bio && (
            <div className="text-center mb-6">
              <p className="text-slate-600 italic">&ldquo;{user.bio}&rdquo;</p>
            </div>
          )}

          {user.location && (
            <div className="text-center mb-6">
              <p className="text-slate-500">
                <span className="inline-block w-4 h-4 mr-2">📍</span>
                {user.location}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="backdrop-blur-lg bg-white/40 rounded-xl p-4 text-center border border-white/50 ">
              <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
              <p className="text-slate-700 font-medium text-lg">{user.recipeCount || 0}</p>
            </div>
            <div className="backdrop-blur-lg bg-white/40 rounded-xl p-4 text-center border border-white/50 ">
              <p className="text-slate-500 font-medium text-sm">Member Since</p>
              <p className="text-slate-700 font-medium text-lg">{user.joinDate || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl border border-white/50  overflow-hidden">
          <div className="grid grid-cols-4 py-4 px-6 border-b border-white/50">
            <p className="text-slate-700 font-medium text-sm col-span-2">Recipe</p>
            <p className="text-slate-700 font-medium text-sm">Category</p>
            <p className="text-slate-700 font-medium text-sm">Status</p>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-4 items-center py-4 px-6 backdrop-blur-lg bg-white/40 rounded-xl border border-white/50 hover:bg-white/50 transition-all duration-300">
              <div className="flex items-center gap-3 col-span-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-lg blur-sm"></div>
                  <Image src={CatDinner} alt="thumbnail" className="relative w-32 h-20 rounded-lg object-cover border border-white/50" />
                </div>
                <div>
                  <p className="text-slate-700 font-medium">Bakwan</p>
                  <p className="text-slate-500 text-xs">Chef Ilham</p>
                </div>
              </div>

              <div>
                <p className="text-slate-700">Gorengan</p>
              </div>

              <div>
                <span
                  className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full backdrop-blur-lg ${
                    status === "published" ? "bg-green-200/50 text-green-800 border border-green-300/50" : "bg-yellow-200/50 text-yellow-800 border border-yellow-300/50"
                  }`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
